"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { buttonStyles } from "@/components/shared/Button";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Honeypot, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { validateContact } from "@/lib/validation";
import { whatsappMessages } from "@/lib/whatsapp";
import type { ApiResponse } from "@/types";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string; fallbackMessage: string };

const FIELD_ORDER = ["fullName", "email", "phone", "message"];

/**
 * Short contact form. Pass `interests` (e.g. the four service pillars) to add a "What do you need?"
 * choice, which is prefixed to the message so the studio sees it in the notification.
 */
export function ContactForm({ interests }: { interests?: string[] } = {}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, string> = {};
    for (const [key, value] of fd.entries()) {
      if (typeof value === "string") raw[key] = value;
    }
    const message = raw.interest ? `Interested in: ${raw.interest}\n\n${raw.message}` : raw.message;
    const fallbackMessage = [
      whatsappMessages.general(),
      message,
      raw.fullName ? `Name: ${raw.fullName}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = validateContact(raw);
    if (!result.ok) {
      const found = result.errors as Record<string, string>;
      setErrors(found);
      focusFirstError(found);
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, message, startedAt: startedAt.current }),
      });
      const data = (await res.json()) as ApiResponse;

      if (data.ok) {
        setStatus({ kind: "success", reference: data.reference });
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
        message: "We couldn't reach the server. Check your connection and try again, or message us on WhatsApp.",
        fallbackMessage,
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-[24px] border border-line bg-surface p-7 sm:p-10">
        <CircleCheck aria-hidden="true" className="size-10 text-emerald-700" />
        <h3 className="mt-5 font-display text-3xl tracking-tight text-ink">Message sent</h3>
        <p className="mt-3 leading-relaxed text-muted">
          Thanks for getting in touch. We will reply as soon as we can. Your reference is{" "}
          <span className="font-mono font-semibold text-ink">{status.reference}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className={buttonStyles("outline", "md", "mt-6")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

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
          t.name
        ) {
          clearError(t.name);
        }
      }}
      noValidate
      className="relative space-y-5"
    >
      <Honeypot />
      <TextField id="fullName" label="Your name" required autoComplete="name" error={errors.fullName} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          optional
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />
      </div>
      {interests && (
        <SelectField
          id="interest"
          label="What do you need?"
          optional
          placeholder="Choose one…"
          options={interests.map((i) => ({ value: i, label: i }))}
        />
      )}
      <TextAreaField
        id="message"
        label="Message"
        required
        rows={6}
        placeholder="How can we help?"
        error={errors.message}
      />

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

      <button type="submit" disabled={submitting} className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
        {submitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
