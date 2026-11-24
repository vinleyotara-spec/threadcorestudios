import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { clients, type Client } from "@/lib/clients";

export function ClientItem({ c }: { c: Client }) {
  // Every customer sits on its own white card, so logos keep their true colours on a clean
  // surface (brands usually require this) while the band behind can be any colour.
  const card = "flex h-20 items-center justify-center rounded-2xl bg-white px-6 shadow-sm shadow-black/20 sm:h-24";
  const inner = c.logo ? (
    // A fixed box so wide and tall logos sit evenly. `mix-blend-multiply` hides white JPG backgrounds.
    <span className={`${card} w-44 sm:w-52`}>
      <span className="relative block h-12 w-32 sm:h-14 sm:w-40">
        <Image src={c.logo} alt={c.alt ?? c.name} fill sizes="160px" className="object-contain mix-blend-multiply" />
      </span>
    </span>
  ) : (
    <span className={`${card} font-display whitespace-nowrap text-xl font-semibold tracking-tight text-ink sm:text-2xl`}>
      {c.name}
    </span>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl">
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
    <section aria-labelledby="clients-heading" className="bg-ink py-12 sm:py-14">
      <Container>
        <h2 id="clients-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
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
      <p className="mt-8 text-center">
        <Link href="/customers" className="text-sm font-medium text-white underline underline-offset-4 hover:text-orange">
          Learn more about our customers
        </Link>
      </p>
    </section>
  );
}
