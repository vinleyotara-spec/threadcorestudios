import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <Container className="py-28 text-center sm:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="mx-auto mt-5 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
        This page has come <em className="italic text-accent">unstitched</em>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-muted">
        We couldn&apos;t find the page you were looking for. It may have moved, or the link may be wrong.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/services" variant="outline" size="lg">
          Browse services
        </ButtonLink>
      </div>
    </Container>
  );
}
