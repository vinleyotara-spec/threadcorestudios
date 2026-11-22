import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { clients } from "@/lib/clients";

/** "Trusted by" strip. Renders only when lib/clients.ts has real, approved entries. */
export function ClientLogos() {
  if (clients.length === 0) return null;
  return (
    <section aria-labelledby="clients-heading" className="border-b border-line bg-surface/60 py-10">
      <Container>
        <h2 id="clients-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Brands we have worked with
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((c) => {
            const img = (
              <Image
                src={c.logo}
                alt={c.name}
                width={140}
                height={48}
                className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            );
            return (
              <li key={c.name}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
