import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { valuePoints } from "@/lib/content";

/** Homepage section 2: "The Value of Our Solutions" (intro + feature list + Get started). */
export function ValueSection() {
  return (
    <section aria-labelledby="value-heading" className="bg-sunken py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why Threadcore"
            title="The value of our *solutions*"
            description="Threadcore Studios brings printing, branding, embroidery and made-to-order uniforms together in one studio, so your brand looks the same on a business card, a cap and a team uniform."
            headingId="value-heading"
          />
          <ButtonLink href="#get-started" size="lg" className="mt-8">
            Get started
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {valuePoints.map((point, i) => (
            <li key={point.title} className={`reveal ${i === valuePoints.length - 1 ? "sm:col-span-2" : ""}`}>
              <h3 className="flex items-start gap-3 font-display text-xl tracking-tight text-ink">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-orange text-ink">
                  <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                </span>
                {point.title}
              </h3>
              <p className="mt-2 pl-9 leading-relaxed text-muted">{point.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
