import type { ReactNode } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Title block at the top of every inner page. Renders the page's <h1>. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <Container className="py-14 sm:py-20">
        <div className="enter">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl" />
        </div>
        {children && <div className="enter enter-2 mt-8">{children}</div>}
      </Container>
    </header>
  );
}
