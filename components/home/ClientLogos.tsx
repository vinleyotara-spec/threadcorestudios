import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { clients, type Client } from "@/lib/clients";

function ClientItem({ c }: { c: Client }) {
  const inner = c.logo ? (
    // A fixed box so wide and tall logos sit evenly. Logos keep their own colours (never
    // recoloured). `mix-blend-multiply` hides white backgrounds on JPG logos.
    <span className="relative block h-12 w-32 sm:h-14 sm:w-40">
      <Image src={c.logo} alt={c.name} fill sizes="160px" className="object-contain mix-blend-multiply" />
    </span>
  ) : (
    <span className="font-display block whitespace-nowrap text-xl font-semibold tracking-tight text-ink/75 sm:text-2xl">
      {c.name}
    </span>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
      {inner}
    </a>
  ) : (
    inner
  );
}

/**
 * "Our customers" billboard: the logos scroll continuously and never stand still.
 * Reads from lib/clients.ts and renders only when that list has entries.
 *
 * The list is repeated four times per group so the strip fills even a 4K screen, and
 * the group is duplicated for a seamless loop. Only the first set is exposed to screen
 * readers; every repeat is aria-hidden. With reduced motion, one static set shows.
 */
export function ClientLogos() {
  if (clients.length === 0) return null;
  const set = (hidden: boolean, key: string) =>
    clients.map((c) => (
      <li
        key={`${key}-${c.name}`}
        aria-hidden={hidden ? true : undefined}
        className={hidden ? "marquee-repeat shrink-0" : "shrink-0"}
      >
        <ClientItem c={c} />
      </li>
    ));

  return (
    <section aria-labelledby="clients-heading" className="border-b border-line bg-surface/60 py-10 sm:py-12">
      <Container>
        <h2 id="clients-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Our customers
        </h2>
      </Container>
      <ClientMarquee>
        <ul className="marquee-group">
          {set(false, "a")}
          {set(true, "b")}
          {set(true, "c")}
          {set(true, "d")}
        </ul>
        <ul className="marquee-group marquee-dup" aria-hidden="true">
          {set(true, "e")}
          {set(true, "f")}
          {set(true, "g")}
          {set(true, "h")}
        </ul>
      </ClientMarquee>
    </section>
  );
}
