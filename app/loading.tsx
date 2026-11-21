import { Container } from "@/components/shared/Container";

/** Shown briefly while a page streams in. */
export default function Loading() {
  return (
    <Container className="py-20" aria-busy="true">
      <div className="space-y-5" role="status">
        <span className="sr-only">Loading…</span>
        <div className="h-4 w-32 animate-pulse rounded-full bg-sunken" />
        <div className="h-14 w-full max-w-xl animate-pulse rounded-xl bg-sunken" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded-full bg-sunken" />
        <div className="grid gap-5 pt-8 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-brand bg-sunken" />
          ))}
        </div>
      </div>
    </Container>
  );
}
