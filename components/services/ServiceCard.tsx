import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonStyles } from "@/components/shared/Button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AvailabilityStatus } from "@/types";

/** Display data for a card. Built from a Service or ServiceCategory by ServiceGrid / ServicesOverview. */
export interface ServiceCardData {
  key: string;
  name: string;
  description: string;
  image: string;
  status: AvailabilityStatus;
  /** Where the card title links to. */
  href: string;
  /** Prefilled quote form link. */
  quoteHref: string;
  /** Full WhatsApp link with the prefilled message. */
  whatsappHref: string;
}

export function ServiceCard({
  card,
  priority = false,
}: {
  card: ServiceCardData;
  priority?: boolean;
}) {
  const comingSoon = card.status === "coming_soon";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-brand border border-line bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
        <Image
          src={card.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <StatusBadge status={card.status} className="absolute left-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
          {/* Stretched link: the whole card is clickable, the buttons below stay above it. */}
          <Link href={card.href} className="after:absolute after:inset-0 after:content-['']">
            {card.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{card.description}</p>

        <div className="relative z-10 mt-5 flex items-center gap-2">
          <Link href={card.quoteHref} className={buttonStyles(comingSoon ? "outline" : "primary", "md", "flex-1")}>
            {comingSoon ? "Ask about this" : "Request a quote"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            href={card.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${card.name} on WhatsApp`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
