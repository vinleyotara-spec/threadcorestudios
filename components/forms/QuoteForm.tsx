"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle, Paperclip, X } from "lucide-react";
import { buttonStyles } from "@/components/shared/Button";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import {
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { listServices, listServicesForCategory, serviceCategories } from "@/lib/services";
import {
  ARTWORK_ACCEPT,
  ARTWORK_HELP,
  CUSTOMER_TYPES,
  CUSTOMISATION_METHODS,
  OTHER_PRODUCT,
  validateArtworkMeta,
  validateQuote,
} from "@/lib/validation";
import { formatBytes, todayISO, cn } from "@/lib/utils";
import { whatsappMessages } from "@/lib/whatsapp";
import type { ApiResponse } from "@/types";

/** Field ids in on-screen order (used to focus the first invalid field). */
const FIELD_ORDER = [
  "fullName",
  "phone",
  "email",
  "customerType",
  "serviceCategory",
  "product",
  "quantity",
  "customisationMethod",
  "description",
  "deliveryDate",
  "artwork",
];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string; summary: Record<string, string> }
  | { kind: "error"; message: string; fallbackMessage: string };

/** Reads ?service=<slug> or ?category=<slug> to prefill the form. */
export function QuoteForm() {
  const params = useSearchParams();
  const service = params.get("service") ?? "";
  const category = params.get("category") ?? "";
  // Re-mount when the prefill changes so the initial values are applied again.
  return <QuoteFormInner key={`${service}|${category}`} serviceSlug={service} categorySlug={category} />;
}

function QuoteFormInner({
  serviceSlug,
  categorySlug,
}: {
  serviceSlug: string;
  categorySlug: string;
}) {
  const prefilledService = listServices().find((s) => s.slug === serviceSlug);
  const [category, setCategory] = useState(
    prefilledService?.category ??
      (serviceCategories.some((c) => c.slug === categorySlug) ? categorySlug : ""),
  );
  const [product, setProduct] = useState(prefilledService?.name ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [file, setFile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);

  // Browser-only values (kept out of render so the page can be prerendered).
  useEffect(() => {
    startedAt.current = Date.now();
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

  const productOptions = [
    ...listServicesForCategory(category).map((s) => ({
      value: s.name,
      label: s.status === "coming_soon" ? `${s.name} (coming soon, ask us)` : s.name,
    })),
    { value: OTHER_PRODUCT, label: OTHER_PRODUCT },
  ];

  function clearError(name: string) {
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = FIELD_ORDER.find((id) => errs[id]);
    if (!first || !formRef.current) return;
    const el =
      first === "customerType"
        ? formRef.current.querySelector<HTMLElement>('input[name="customerType"]')
        : formRef.current.querySelector<HTMLElement>(`#${first}`);
    el?.focus();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    clearError("artwork");
    if (!picked) return setFile(null);
    const problem = validateArtworkMeta(picked);
    if (problem) {
      setErrors((prev) => ({ ...prev, artwork: problem }));
      e.target.value = "";
      return setFile(null);
    }
    setFile(picked);
  }

  function removeFile() {
    if (fileRef.current) fileRef.current.value = "";
    setFile(null);
    clearError("artwork");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, string> = {};
    for (const [key, value] of fd.entries()) {
      if (typeof value === "string") raw[key] = value;
    }

    const fallbackMessage = whatsappMessages.quoteDetails({
      fullName: raw.fullName,
      phone: raw.phone,
      customerType: raw.customerType,
      product: raw.product,
      quantity: raw.quantity,
      customisationMethod: raw.customisationMethod,
      deliveryDate: raw.deliveryDate,
      description: raw.description,
    });

    // 1. Instant client-side validation (the server validates again).
    const result = validateQuote(raw);
    const found: Record<string, string> = result.ok ? {} : { ...(result.errors as Record<string, string>) };
    const artwork = fd.get("artwork");
    const hasFile = artwork instanceof File && artwork.size > 0;
    if (hasFile) {
      const fileProblem = validateArtworkMeta(artwork);
      if (fileProblem) found.artwork = fileProblem;
    }
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstError(found);
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });

    if (!hasFile) fd.delete("artwork");
    fd.set("startedAt", String(startedAt.current));

    // 2. Send to the server.
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = (await res.json()) as ApiResponse;

      if (data.ok) {
        setStatus({
          kind: "success",
          reference: data.reference,
          summary: {
            fullName: raw.fullName,
            product: raw.product,
            quantity: raw.quantity,
            deliveryDate: raw.deliveryDate,
          },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (data.error === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        focusFirstError(data.errors);
        return;
      }
      setStatus({ kind: "error", message: data.message, fallbackMessage });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Check your connection and try again, or send your request on WhatsApp.",
        fallbackMessage,
      });
    }
  }

  // ---- Confirmation screen ------------------------------------------------
  if (status.kind === "success") {
    const { summary, reference } = status;
    const firstName = summary.fullName.split(" ")[0];
    return (
      <div role="status" className="rounded-[24px] border border-line bg-surface p-7 sm:p-12">
        <CircleCheck aria-hidden="true" className="size-12 text-emerald-700" />
        <h2 className="mt-6 font-display text-4xl tracking-tight text-ink">
          Thank you, {firstName}. Your request is in.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          We have received your quote request and will get back to you with a quotation. Keep your reference
          handy if you contact us.
        </p>

        <dl className="mt-8 grid max-w-xl gap-x-8 gap-y-4 rounded-brand bg-sunken p-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Reference</dt>
            <dd className="mt-1 font-mono text-base font-semibold tracking-wider text-ink">{reference}</dd>
          </div>
          <div>
            <dt className="text-muted">Product</dt>
            <dd className="mt-1 text-base font-medium text-ink">{summary.product}</dd>
          </div>
          <div>
            <dt className="text-muted">Quantity</dt>
            <dd className="mt-1 text-base font-medium text-ink">{summary.quantity}</dd>
          </div>
          <div>
            <dt className="text-muted">Needed by</dt>
            <dd className="mt-1 text-base font-medium text-ink">{summary.deliveryDate}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink
            variant="dark"
            size="lg"
            message={whatsappMessages.enquiry({
              reference,
              fullName: summary.fullName,
              product: summary.product,
              quantity: summary.quantity,
              deliveryDate: summary.deliveryDate,
            })}
          >
            Message us on WhatsApp
          </WhatsAppLink>
          <Link href="/" className={buttonStyles("outline", "lg")}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorCount = Object.keys(errors).length;

  // ---- The form -----------------------------------------------------------
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={(e) => {
        const t = e.target;
        if (
          (t instanceof HTMLInputElement ||
            t instanceof HTMLSelectElement ||
            t instanceof HTMLTextAreaElement) &&
          t.name &&
          t.name !== "artwork" // the file input manages its own error (see onFileChange)
        ) {
          clearError(t.name);
        }
      }}
      noValidate
      className="relative space-y-12"
      aria-describedby={errorCount ? "form-summary" : undefined}
    >
      <Honeypot />

      {errorCount > 0 && (
        <div
          id="form-summary"
          role="alert"
          className="flex items-start gap-3 rounded-brand border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below and
            try again.
          </p>
        </div>
      )}

      {/* About you */}
      <section aria-labelledby="about-you" className="space-y-5">
        <h2 id="about-you" className="font-display text-2xl tracking-tight text-ink">
          About you
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="fullName" label="Full name" required autoComplete="name" error={errors.fullName} />
          <TextField
            id="phone"
            label="Phone number"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+1 555 123 4567"
            error={errors.phone}
          />
          <TextField
            id="email"
            label="Email address"
            type="email"
            optional
            autoComplete="email"
            error={errors.email}
            className="sm:col-span-2"
          />
        </div>

        <fieldset aria-describedby={errors.customerType ? "customerType-error" : undefined}>
          <legend className="mb-2 text-sm font-medium text-ink">
            I am ordering as <span aria-hidden="true" className="text-accent">*</span>
          </legend>
          <div className="flex gap-3">
            {CUSTOMER_TYPES.map((t, i) => (
              <label key={t.value} className="relative flex-1 sm:flex-none">
                <input
                  type="radio"
                  name="customerType"
                  value={t.value}
                  defaultChecked={i === 0}
                  required
                  className="peer sr-only"
                />
                <span className="flex h-12 min-w-36 cursor-pointer items-center justify-center rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
          {errors.customerType && (
            <p id="customerType-error" role="alert" className="mt-2 text-sm font-medium text-red-700">
              {errors.customerType}
            </p>
          )}
        </fieldset>
      </section>

      {/* Your project */}
      <section aria-labelledby="your-project" className="space-y-5">
        <h2 id="your-project" className="font-display text-2xl tracking-tight text-ink">
          Your project
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="serviceCategory"
            label="Service category"
            required
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setProduct("");
              clearError("product");
            }}
            options={serviceCategories.map((c) => ({
              value: c.slug,
              label: c.status === "coming_soon" ? `${c.name} (coming soon)` : c.name,
            }))}
            error={errors.serviceCategory}
          />
          <SelectField
            id="product"
            label="Product required"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            disabled={!category}
            placeholder={category ? "Select a product…" : "Choose a category first"}
            options={productOptions}
            error={errors.product}
          />
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            required
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="e.g. 50"
            error={errors.quantity}
          />
          <SelectField
            id="customisationMethod"
            label="Preferred customisation method"
            required
            options={CUSTOMISATION_METHODS.map((m) => ({ value: m, label: m }))}
            error={errors.customisationMethod}
            hint="Not sure? Choose “Not sure” and we will recommend one."
          />
        </div>
        <TextAreaField
          id="description"
          label="Describe your project"
          required
          rows={5}
          placeholder="What do you want made? Mention sizes, colours, placement, garment type or anything else that helps."
          error={errors.description}
        />
        <TextField
          id="deliveryDate"
          ref={dateRef} // its `min` is set in an effect so the page can be prerendered
          label="Date you need it by"
          type="date"
          required
          error={errors.deliveryDate}
          className="sm:max-w-xs"
        />
      </section>

      {/* Artwork */}
      <section aria-labelledby="artwork-heading" className="space-y-4">
        <h2 id="artwork-heading" className="font-display text-2xl tracking-tight text-ink">
          Artwork or reference <span className="text-base font-normal text-muted">(optional)</span>
        </h2>
        <div>
          <input
            ref={fileRef}
            id="artwork"
            name="artwork"
            type="file"
            accept={ARTWORK_ACCEPT}
            onChange={onFileChange}
            aria-invalid={errors.artwork ? true : undefined}
            aria-describedby={errors.artwork ? "artwork-error" : "artwork-hint"}
            className={cn(
              "block w-full cursor-pointer rounded-xl border border-dashed border-ink/30 bg-surface p-4 text-sm text-body file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-ink aria-[invalid=true]:border-red-700",
            )}
          />
          <p id="artwork-hint" className="mt-2 text-sm text-muted">
            {ARTWORK_HELP}. A logo, sketch or reference photo is ideal.
          </p>
          {errors.artwork && (
            <p id="artwork-error" role="alert" className="mt-2 text-sm font-medium text-red-700">
              {errors.artwork}
            </p>
          )}
          {file && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-sunken py-1.5 pl-3 pr-1.5 text-sm text-ink">
              <Paperclip aria-hidden="true" className="size-4" />
              <span className="max-w-56 truncate">{file.name}</span>
              <span className="text-muted">({formatBytes(file.size)})</span>
              <button
                type="button"
                onClick={removeFile}
                aria-label="Remove file"
                className="inline-flex size-7 items-center justify-center rounded-full hover:bg-line"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </p>
          )}
        </div>
      </section>

      {status.kind === "error" && (
        <div role="alert" className="rounded-brand border border-red-300 bg-red-50 p-5 text-red-900">
          <div className="flex items-start gap-3">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p className="text-sm leading-relaxed">{status.message}</p>
          </div>
          <WhatsAppLink message={status.fallbackMessage} variant="dark" className="mt-4">
            Send this on WhatsApp instead
          </WhatsAppLink>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
              Sending…
            </>
          ) : (
            "Request my quote"
          )}
        </button>
        <p className="text-sm text-muted">No account needed. Prices are provided by quotation.</p>
      </div>
    </form>
  );
}
