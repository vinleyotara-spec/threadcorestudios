import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { clients } from "@/lib/clients";

/**
 * "Clients we have worked with" strip. Renders only when lib/clients.ts has
 * entries. A client shows as a logo only if one was supplied; otherwise as text.
 */
export function ClientLogos() {
  if (clients.length === 0) return null;
  return (
    <section aria-labelledby="clients-heading" className="border-b border-line bg-surface/60 py-10 sm:py-12">
      <Container>
        <h2 id="clients-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Clients we have worked with
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {clients.map((c) => {
            const inner = c.logo ? (
              <Image
                src={c.logo}
                alt={c.name}
                width={140}
                height={48}
                className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-display text-xl font-semibold tracking-tight text-ink/75 sm:text-2xl">{c.name}</span>
            );
            return (
              <li key={c.name}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
