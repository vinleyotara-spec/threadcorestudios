import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";
import { siteConfig } from "@/lib/config";
import { sendNotification } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateContact } from "@/lib/validation";

const MIN_FILL_MS = 2000;

function reply(body: ApiResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 32 * 1024) {
    return reply({ ok: false, error: "too_large", message: "That message is too long." }, 413);
  }

  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return reply(
      {
        ok: false,
        error: "rate_limited",
        message: "You've sent several messages recently. Please wait a while before trying again, or message us on WhatsApp.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return reply({ ok: false, error: "bad_request", message: "We couldn't read that message. Please try again." }, 400);
  }

  // Bot traps (see /api/quote). Pretend to succeed.
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) return reply({ ok: true, reference: "RECEIVED" });

  const parsed = validateContact(body);
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
  const msg = parsed.data;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[contact] Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    return reply(
      {
        ok: false,
        error: "not_configured",
        message: "The contact form isn't switched on yet. Please message us on WhatsApp instead.",
      },
      503,
    );
  }

  const id = crypto.randomUUID();
  const { error } = await supabase.from("contact_messages").insert({
    id,
    full_name: msg.fullName,
    email: msg.email,
    phone: msg.phone || null,
    message: msg.message,
    status: "new",
  });
  if (error) {
    console.error("[contact] insert failed:", error.message);
    return reply(
      {
        ok: false,
        error: "save_failed",
        message: "Something went wrong sending your message. Please try again, or message us on WhatsApp.",
      },
      500,
    );
  }

  const reference = id.slice(0, 8).toUpperCase();
  await sendNotification({
    subject: `New message ${reference} from ${msg.fullName}`,
    replyTo: msg.email,
    lines: [
      `New contact message on ${siteConfig.name} (ref ${reference})`,
      "",
      `Name: ${msg.fullName}`,
      `Email: ${msg.email}`,
      `Phone: ${msg.phone || "not provided"}`,
      "",
      msg.message,
    ],
  });

  return reply({ ok: true, reference });
}
