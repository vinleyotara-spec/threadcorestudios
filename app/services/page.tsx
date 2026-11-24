import { ServiceAccordion, type AccordionSection } from "@/components/services/ServiceAccordion";
import { serviceToCard } from "@/components/services/ServiceGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { PageHeader } from "@/components/shared/PageHeader";
import { getCategories, getServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Printing, branding (apparel, roll-up banners, billboards), embroidery, made-to-order uniforms, promotional products, corporate gifts, packaging and signage. Request a quote for business cards, caps, T-shirts, corporate, healthcare, security and sports uniforms and more.",
  path: "/services",
});

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([getCategories(), getServices()]);

  // One expandable section per available category. Categories that are still
  // "coming soon" are grouped into a single "Future services" section; when one
  // becomes active it automatically gets its own section.
  const live = categories.filter((c) => c.status === "active" || c.standalone);
  const upcoming = categories.filter((c) => c.status === "coming_soon" && !c.standalone);

  const sections: AccordionSection[] = live.map((c) => ({
    id: c.slug,
    alsoIds: [c.slug],
    title: c.name,
    description: c.description,
    status: c.status,
    cards: services.filter((s) => s.category === c.slug).map(serviceToCard),
  }));

  if (upcoming.length > 0) {
    const slugs = upcoming.map((c) => c.slug);
    sections.push({
      id: "future-services",
      alsoIds: slugs,
      title: "Future services",
      description: "Where we are heading next. Tell us what you would like and help shape what we offer.",
      status: "coming_soon",
      cards: services.filter((s) => slugs.includes(s.category)).map(serviceToCard),
    });
  }

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we can *make for you*"
        description="Choose a category to see what is available. Every job is quoted individually, so tell us what you need and we will come back with a quotation."
      />
      <section className="py-10 sm:py-16">
        <Container>
          <ServiceAccordion sections={sections} />
        </Container>
      </section>
      <HowItWorks />
      <CTASection
        title="Not sure what you *need*?"
        text="Describe your idea and we will recommend the best way to produce it."
      />
    </>
  );
}
