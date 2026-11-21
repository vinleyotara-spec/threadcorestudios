"use client";

import { useState, useSyncExternalStore } from "react";
import { Minus, Plus } from "lucide-react";
import { ServiceCard, type ServiceCardData } from "@/components/services/ServiceCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AvailabilityStatus } from "@/types";

export interface AccordionSection {
  id: string;
  /** Other anchor ids (category slugs) that should open this section, e.g. /services#embroidery. */
  alsoIds: string[];
  title: string;
  description: string;
  status: AvailabilityStatus;
  cards: ServiceCardData[];
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

type Override = { open: boolean; hash: string };

/**
 * Expandable service categories. The first is open by default; a URL like
 * /services#embroidery opens (and scrolls to) the matching section.
 */
export function ServiceAccordion({ sections }: { sections: AccordionSection[] }) {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [overrides, setOverrides] = useState<Record<string, Override>>({});

  const hashSection = sections.find((s) => s.id === hash || s.alsoIds.includes(hash));

  function isOpen(section: AccordionSection, index: number) {
    const override = overrides[section.id];
    // A manual toggle wins, until the URL hash changes.
    if (override && override.hash === hash) return override.open;
    if (hashSection) return hashSection.id === section.id;
    return index === 0;
  }

  function toggle(section: AccordionSection, index: number) {
    const open = isOpen(section, index);
    setOverrides((prev) => ({ ...prev, [section.id]: { open: !open, hash } }));
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {sections.map((section, index) => {
        const open = isOpen(section, index);
        const buttonId = `${section.id}-trigger`;
        const panelId = `${section.id}-panel`;
        return (
          <section key={section.id} id={section.id} aria-labelledby={buttonId}>
            {section.alsoIds
              .filter((id) => id !== section.id)
              .map((id) => (
                <span key={id} id={id} className="block" />
              ))}
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(section, index)}
                className="flex w-full items-center justify-between gap-4 py-7 text-left sm:py-9"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                      {section.title}
                    </span>
                    {section.status === "coming_soon" && <StatusBadge status="coming_soon" />}
                  </span>
                  <span className="mt-2 block max-w-2xl text-base font-normal leading-relaxed text-muted">
                    {section.description}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="hidden text-sm text-muted sm:inline">
                    {section.cards.length} {section.cards.length === 1 ? "service" : "services"}
                  </span>
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink">
                    {open ? (
                      <Minus aria-hidden="true" className="size-5" />
                    ) : (
                      <Plus aria-hidden="true" className="size-5" />
                    )}
                  </span>
                </span>
              </button>
            </h2>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open}
              inert={!open}
              className="accordion-panel"
            >
              <div>
                <ul className="grid gap-5 pb-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {section.cards.map((card) => (
                    <li key={card.key}>
                      <ServiceCard card={card} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
