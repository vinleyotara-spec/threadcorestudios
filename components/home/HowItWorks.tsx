import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="How it works"
            title="From idea to *order* in five steps"
            description="A simple process, with no account to create and no pressure to commit."
          />
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="reveal relative">
              {/* Stitched connector between steps (desktop only) */}
              {i < howItWorks.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-16 right-0 top-[1.55rem] hidden border-t-2 border-dashed border-accent/40 lg:block"
                />
              )}
              <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-ink font-display text-xl text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
