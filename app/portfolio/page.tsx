import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { PageHeader } from "@/components/shared/PageHeader";
import { getPortfolioCategories, getPortfolioProjects } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Browse printing, embroidery and apparel branding projects, and request something similar for your own brand.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([getPortfolioProjects(), getPortfolioCategories()]);
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Projects we're *proud* of"
        description="Browse by category. See something you like? Request something similar and we will quote it for you."
      />
      <section className="py-10 sm:py-14">
        <Container>
          <PortfolioGallery projects={projects} categories={categories} />
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            Items tagged <strong className="font-medium text-ink">Sample</strong> or{" "}
            <strong className="font-medium text-ink">Illustration</strong> show the kind of work we do. They are not
            specific client jobs, and every order is made to your own specification.
          </p>
        </Container>
      </section>
      <CTASection title="Have a project in *mind*?" />
    </>
  );
}
