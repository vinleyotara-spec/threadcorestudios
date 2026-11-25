import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { hero } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Hero imagery: photos of real work. The first tile is cropped tall (1:2), the others square. */
const tiles = [
  { src: "/images/work/hero-printing.jpg", label: "Printing", className: "row-span-2" },
  { src: "/images/work/hero-branding.jpg", label: "Branding", className: "" },
  { src: "/images/work/hero-embroidery.jpg", label: "Embroidery", className: "" },
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

          <div className="enter enter-3 mt-9">
            <ButtonLink href="#get-started" size="lg">
              Get started
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
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

    </section>
  );
}
