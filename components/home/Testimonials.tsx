import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/testimonials";

/** Customer testimonials. Renders only when lib/testimonials.ts has real entries. */
export function Testimonials({ standalone = false }: { standalone?: boolean }) {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-heading" className={standalone ? "py-16 sm:py-24" : "py-20 sm:py-28"}>
      <Container>
        <SectionHeading eyebrow="In their words" title="What customers *say*" headingId="testimonials-heading" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.company}-${t.name}`} className="reveal">
              <figure className="flex h-full flex-col rounded-brand border border-line bg-surface p-7">
                <blockquote className="flex-1 text-lg leading-relaxed text-body">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-muted">
                    {t.role ? `${t.role}, ` : ""}
                    {t.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
