import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { solutions } from "@/lib/content";

/** Homepage section 3: "Our Solutions", three cards, each with a "Learn more" link. */
export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-heading" className="py-20 sm:py-28">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="How we can help"
            title="Our *solutions*"
            description="Choose the way that suits your order: a quick quote, a team or uniform order, or a custom project."
            headingId="solutions-heading"
          />
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {solutions.map((s) => (
            <li key={s.title} className="reveal">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-brand border border-line bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
                <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{s.text}</p>
                  <Link
                    href={s.href}
                    className="mt-5 inline-flex items-center gap-2 font-medium text-ink after:absolute after:inset-0 after:content-[''] hover:text-accent"
                  >
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
