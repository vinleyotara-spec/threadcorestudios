import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceGrid, categoryToCard } from "@/components/services/ServiceGrid";
import { getFeaturedCategories } from "@/lib/services";

export async function ServicesOverview() {
  const categories = await getFeaturedCategories();
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Everything your brand needs, *made well*"
            description="Start with printing and embroidery today. More ways to bring your brand to life are on the way."
          />
          <ButtonLink href="/services" variant="outline" className="self-start sm:self-auto">
            All services
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        <div className="reveal mt-12">
          <ServiceGrid cards={categories.map(categoryToCard)} />
        </div>
      </Container>
    </section>
  );
}
