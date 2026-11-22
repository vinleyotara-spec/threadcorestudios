import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { getCategoryBySlug, getServices } from "@/lib/services";
import { whatsappMessages } from "@/lib/whatsapp";

/** Slug of the category this section showcases (see lib/services.ts). */
const CATEGORY_SLUG = "apparel-manufacturing";

/**
 * Homepage showcase for made-to-order uniforms and apparel. Everything shown
 * comes from the category and its services in lib/services.ts, so adding a
 * sector (e.g. "Hospitality uniforms") means adding one service there.
 */
export async function ApparelManufacturing() {
  const [category, allServices] = await Promise.all([getCategoryBySlug(CATEGORY_SLUG), getServices()]);
  if (!category) return null;
  const items = allServices.filter((s) => s.category === CATEGORY_SLUG);
  if (items.length === 0) return null;

  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <div className="reveal grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <SectionHeading
            tone="light"
            eyebrow="Uniforms & apparel manufacturing"
            title="Uniforms made *to order*"
            description={category.description}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <ButtonLink href={`/quote?category=${category.slug}`} size="lg">
              Request a quote
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <WhatsAppLink
              message={whatsappMessages.service(category.name)}
              variant="outline-light"
              size="lg"
            />
          </div>
        </div>

        <ul className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/services/${item.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-brand bg-white/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {item.status === "coming_soon" && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-strong">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-3 flex items-center justify-between gap-2 font-display text-xl leading-tight tracking-tight text-white">
                  {item.name}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 -translate-x-1 text-white/40 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </h3>
              </Link>
            </li>
          ))}

          {/* Closing tile, so the grid always completes and nobody's sector is left out */}
          <li>
            <Link
              href={`/quote?category=${category.slug}`}
              className="flex aspect-square flex-col justify-between rounded-brand border border-dashed border-white/30 p-5 text-white transition-colors hover:border-white hover:bg-white/5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Something else?</span>
              <span className="font-display text-2xl leading-tight tracking-tight">
                Tell us what your team needs
                <ArrowRight aria-hidden="true" className="ml-2 inline size-5 text-[#ff7a5c]" />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
