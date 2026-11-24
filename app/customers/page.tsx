import { ClientItem } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { PageHeader } from "@/components/shared/PageHeader";
import { clients } from "@/lib/clients";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Customers",
  description: "The businesses Threadcore Studios has worked with, and what customers say about working with us.",
  path: "/customers",
});

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title="Businesses we've *worked with*"
        description="From local firms to well-known brands, these are some of the customers we have made printing, branding, embroidery and uniforms for."
      />
      {clients.length > 0 && (
        <section aria-label="Customer logos" className="bg-ink py-14 sm:py-20">
          <Container>
            <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              {clients.map((c) => (
                <li key={c.name}>
                  <ClientItem c={c} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <Testimonials standalone />
      <CTASection title="Want to be our next *customer*?" />
    </>
  );
}
