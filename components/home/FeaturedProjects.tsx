import { ArrowRight } from "lucide-react";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFeaturedProjects, getPortfolioCategories } from "@/lib/portfolio";

export async function FeaturedProjects() {
  const [projects, categories] = await Promise.all([getFeaturedProjects(4), getPortfolioCategories()]);
  const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? "Other";

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured projects"
            title="A look at the *work*"
            description="A selection of the kind of printing, branding, embroidery and uniforms we produce."
          />
          <ButtonLink href="/portfolio" variant="outline" className="self-start sm:self-auto">
            See all our work
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        <ul className="reveal mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.id}>
              <PortfolioCard project={project} categoryLabel={labelFor(project.category)} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
