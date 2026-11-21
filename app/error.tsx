"use client";

import { useEffect } from "react";
import { Container } from "@/components/shared/Container";
import { buttonStyles } from "@/components/shared/Button";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-28 text-center sm:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Something went wrong</p>
      <h1 className="mx-auto mt-5 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
        We hit a snag
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-muted">
        Something went wrong on our side. Please try again, or message us and we will help.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => retry()} className={buttonStyles("primary", "lg")}>
          Try again
        </button>
        <WhatsAppLink size="lg" />
      </div>
    </Container>
  );
}
