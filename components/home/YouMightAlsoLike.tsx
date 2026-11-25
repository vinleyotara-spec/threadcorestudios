import Link from "next/link";
import { ArrowRight, FileText, Images, LayoutGrid, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const tiles: Array<{ icon: LucideIcon; title: string; text: string; href: string }> = [
  { icon: Images, title: "Our Work", text: "Browse photos of branded and embroidered work.", href: "/portfolio" },
  { icon: LayoutGrid, title: "Products & Services", text: "See everything we make, by category.", href: "/services" },
  { icon: FileText, title: "Request a Quote", text: "Send the details of your order and get a quotation.", href: "/quote" },
];

/** Homepage section 6: "You might also like", three tiles. */
export function YouMightAlsoLike() {
  return (
    <section aria-labelledby="also-heading" className="py-20 sm:py-28">
      <Container>
        <div className="reveal">
          <SectionHeading title="You might also *like*" headingId="also-heading" />
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {tiles.map(({ icon: Icon, title, text, href }) => (
            <li key={title} className="reveal">
              <Link
                href={href}
                className="group flex h-full flex-col rounded-brand border border-line bg-surface p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-sunken text-accent">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-ink group-hover:text-accent">
                  Explore
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
