import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { hero } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Hero imagery: swap these for real photography (see README, "Replacing placeholder images"). */
const tiles = [
  { src: "/images/placeholders/portfolio-tees.svg", label: "Printing", className: "row-span-2" },
  { src: "/images/placeholders/portfolio-caps.svg", label: "Embroidery", className: "" },
  { src: "/images/placeholders/portfolio-stationery.svg", label: "Branding", className: "" },
];

export function Hero() {
  const words = hero.headline.join(" ").split(" ");
  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <p className="enter text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="enter enter-1 mt-5 font-display text-[3.1rem] leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.25rem]">
            {words.map((word, i) => (
              <span key={i}>
                {word === hero.highlight ? (
                  <em className="italic text-accent">{word}</em>
                ) : (
                  word
                )}{" "}
              </span>
            ))}
          </h1>
          <p className="enter enter-2 mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {hero.text}
          </p>

          <div className="enter enter-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={siteConfig.quoteCta.href} size="lg">
              {siteConfig.quoteCta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore Our Services
            </ButtonLink>
          </div>
          <div className="enter enter-4 mt-5">
            <WhatsAppLink message={whatsappMessages.general()} variant="ghost" className="-ml-1 px-1">
              Prefer to chat? Message us on WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <div className="enter enter-2 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
          {tiles.map((tile, i) => (
            <div
              key={tile.src}
              // The tall tile stretches across both rows; the others set the row height.
              className={cn(
                "relative overflow-hidden rounded-brand bg-sunken",
                tile.className || "aspect-square",
              )}
            >
              <Image
                src={tile.src}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 28vw, 45vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Quiet ribbon under the hero */}
      <div className="border-y border-line bg-surface/60">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-sm text-muted">
          <p>Printing · Embroidery · Apparel branding</p>
          <Link href="/portfolio" className="font-medium text-ink underline-offset-4 hover:text-accent hover:underline">
            See our work →
          </Link>
        </Container>
      </div>
    </section>
  );
}
