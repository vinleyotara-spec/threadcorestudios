import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { siteConfig } from "@/lib/config";
import { whatsappMessages } from "@/lib/whatsapp";

export function CTASection({
  title = "Ready to make your *mark*?",
  text = "Tell us what you have in mind and we will come back with a quotation. No account needed.",
}: {
  title?: string;
  text?: string;
}) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-center sm:px-12 sm:py-24">
        {/* Decorative stitched ring */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-24 -top-24 size-80 opacity-30 sm:size-[26rem]"
        >
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="var(--brand-accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="22 16"
          />
        </svg>
        <h2 className="relative mx-auto max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-6xl">
          {parts.map((part, i) =>
            part.startsWith("*") ? (
              <em key={i} className="italic text-[#ff7a5c]">
                {part.slice(1, -1)}
              </em>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-white/70">{text}</p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.quoteCta.href} size="lg">
            {siteConfig.quoteCta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
          <WhatsAppLink
            message={whatsappMessages.quote()}
            variant="outline-light"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
