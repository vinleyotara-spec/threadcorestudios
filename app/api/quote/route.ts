import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";
import { siteConfig } from "@/lib/config";
import { sendNotification } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { ARTWORK_BUCKET, getSupabaseAdmin } from "@/lib/supabase";
import {
  ARTWORK_MAX_BYTES,
  sniffArtworkType,
  validateArtworkMeta,
  validateQuote,
} from "@/lib/validation";

const MAX_BODY_BYTES = ARTWORK_MAX_BYTES + 512 * 1024; // file + form fields
const MIN_FILL_MS = 2500; // humans don't complete this form in under 2.5 seconds

function reply(body: ApiResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  // 1. Size guard (cheap, before reading the body).
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return reply(
      { ok: false, error: "too_large", message: "That upload is too large. Please keep files under 4 MB." },
      413,
    );
  }

  // 2. Rate limit: 5 submissions per IP per hour.
  const limit = rateLimit(`quote:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return reply(
      {
        ok: false,
        error: "rate_limited",
        message: "You've sent several requests recently. Please wait a while before trying again, or message us on WhatsApp.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  // 3. Parse the multipart body.
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply({ ok: false, error: "bad_request", message: "We couldn't read that submission. Please try again." }, 400);
  }

  // 4. Bot traps: a hidden field real users never fill, and a minimum fill time.
  //    Pretend to succeed so bots don't learn anything.
  const honeypot = String(form.get("website") ?? "").trim();
  const startedAt = Number(form.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    return reply({ ok: true, reference: "RECEIVED" });
  }

  // 5. Validate the fields on the server.
  const raw: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") raw[key] = value;
  }
  const parsed = validateQuote(raw);
  if (!parsed.ok) {
    return reply(
      {
        ok: false,
        error: "validation",
        message: "Please check the highlighted fields.",
        errors: parsed.errors as Record<string, string>,
      },
      422,
    );
  }
  const quote = parsed.data;

  // 6. Validate the optional artwork file (declared type, size AND real bytes).
  const fileEntry = form.get("artwork");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;
  let fileBytes: Uint8Array | null = null;
  let fileExt: string | null = null;
  if (file) {
    const metaError = validateArtworkMeta(file);
    if (metaError) {
      return reply({ ok: false, error: "validation", message: metaError, errors: { artwork: metaError } }, 422);
    }
    fileBytes = new Uint8Array(await file.arrayBuffer());
    fileExt = sniffArtworkType(fileBytes);
    if (!fileExt) {
      const message = "That file doesn't look like a valid JPG, PNG, WebP or PDF.";
      return reply({ ok: false, error: "validation", message, errors: { artwork: message } }, 422);
    }
  }

  // 7. Storage must be configured to accept enquiries.
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[quote] Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    return reply(
      {
        ok: false,
        error: "not_configured",
        message: "Online requests aren't switched on yet. Please send your request on WhatsApp instead.",
      },
      503,
    );
  }

  // 8. Upload the artwork (private bucket) then save the enquiry.
  const enquiryId = crypto.randomUUID();
  let artworkPath: string | null = null;

  if (fileBytes && fileExt) {
    const yearMonth = new Date().toISOString().slice(0, 7);
    artworkPath = `${yearMonth}/${enquiryId}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from(ARTWORK_BUCKET)
      .upload(artworkPath, fileBytes, {
        contentType: file?.type,
        upsert: false,
      });
    if (uploadError) {
      console.error("[quote] artwork upload failed:", uploadError.message);
      return reply(
        {
          ok: false,
          error: "upload_failed",
          message: "We couldn't upload your file. Please try again, or send the request without it and share the artwork on WhatsApp.",
        },
        500,
      );
    }
  }

  const { error: insertError } = await supabase.from("enquiries").insert({
    id: enquiryId,
    full_name: quote.fullName,
    phone: quote.phone,
    email: quote.email || null,
    customer_type: quote.customerType,
    service_category: quote.serviceCategory,
    product: quote.product,
    quantity: quote.quantity,
    customisation_method: quote.customisationMethod,
    description: quote.description,
    delivery_date: quote.deliveryDate,
    artwork_url: artworkPath,
    status: "new",
  });

  if (insertError) {
    console.error("[quote] insert failed:", insertError.message);
    if (artworkPath) await supabase.storage.from(ARTWORK_BUCKET).remove([artworkPath]);
    return reply(
      {
        ok: false,
        error: "save_failed",
        message: "Something went wrong saving your request. Please try again, or message us on WhatsApp.",
      },
      500,
    );
  }

  const reference = enquiryId.slice(0, 8).toUpperCase();

  // 9. Best-effort email notification (never blocks or fails the submission).
  let artworkLink = "";
  if (artworkPath) {
    const { data } = await supabase.storage
      .from(ARTWORK_BUCKET)
      .createSignedUrl(artworkPath, 60 * 60 * 24 * 7);
    artworkLink = data?.signedUrl ?? "";
  }
  await sendNotification({
    subject: `New quote request ${reference}: ${quote.product} x${quote.quantity}`,
    replyTo: quote.email || undefined,
    lines: [
      `New quote request on ${siteConfig.name} (ref ${reference})`,
      "",
      `Name: ${quote.fullName}`,
      `Phone: ${quote.phone}`,
      `Email: ${quote.email || "not provided"}`,
      `Customer type: ${quote.customerType}`,
      `Category: ${quote.serviceCategory}`,
      `Product: ${quote.product}`,
      `Quantity: ${quote.quantity}`,
      `Method: ${quote.customisationMethod}`,
      `Needed by: ${quote.deliveryDate}`,
      "",
      "Project description:",
      quote.description,
      "",
      artworkLink ? `Artwork (link valid 7 days): ${artworkLink}` : "Artwork: none uploaded",
    ],
  });

  return reply({ ok: true, reference });
}
