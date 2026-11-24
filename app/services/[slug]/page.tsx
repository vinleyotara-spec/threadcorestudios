import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Download } from "lucide-react";
import { ServiceGrid, serviceToCard } from "@/components/services/ServiceGrid";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { IllustrationChip } from "@/components/shared/IllustrationChip";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { getCategoryBySlug, getRelatedServices, getServiceBySlug, listServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/whatsapp";

export function generateStaticParams() {
  return listServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

const defaultChecklist = [
  "The quantity you need",
  "Sizes, colours and finish",
  "Your logo or artwork, if you have it",
  "The date you need your order by",
];

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [category, related] = await Promise.all([
    getCategoryBySlug(service.category),
    getRelatedServices(service, 3),
  ]);
  const comingSoon = service.status === "coming_soon";
  const checklist = category?.requestChecklist ?? defaultChecklist;

  return (
    <>
      <Container className="pb-16 pt-8 sm:pb-24 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {category && (
              <>
                <li>
                  <Link href={`/services#${category.slug}`} className="hover:text-accent">
                    {category.name}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li aria-current="page" className="text-ink">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="enter">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-sunken lg:aspect-square">
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {service.imageIsIllustration && <IllustrationChip label={service.imageLabel} />}
            </div>
            {service.imageIsIllustration && (
              <p className="mt-3 text-sm text-muted">
                Illustrative image. Every order is made to your own specification: colours, sizes, fabric and branding.
              </p>
            )}
          </div>

          <div className="enter enter-1 lg:py-6">
            <div className="flex items-center gap-3">
              {category && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{category.name}</p>
              )}
              <StatusBadge status={service.status} className="bg-sunken" />
            </div>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {service.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{service.description}</p>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              What to include in your request
            </h2>
            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {category?.resources?.map((r) => (
              <a
                key={r.href}
                href={r.href}
                download
                className="mt-8 flex items-start gap-3 rounded-brand border border-line bg-surface p-4 transition-colors hover:border-ink"
              >
                <Download aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>
                  <span className="block font-medium text-ink">{r.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{r.description}</span>
                </span>
              </a>
            ))}

            <p className="mt-8 text-sm text-muted">
              Pricing is by quotation, based on your quantity, design and finish.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/quote?service=${service.slug}`} size="lg">
                {comingSoon ? "Ask about this" : "Request a quote"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <WhatsAppLink message={whatsappMessages.service(service.name)} size="lg" />
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line bg-sunken py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              More in {category?.name ?? "this category"}
            </h2>
            <div className="mt-8">
              <ServiceGrid cards={related.map(serviceToCard)} />
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
