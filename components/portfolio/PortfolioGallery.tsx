"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { cn } from "@/lib/utils";
import type { PortfolioCategory, PortfolioProject } from "@/types";

export function PortfolioGallery({
  projects,
  categories,
}: {
  projects: PortfolioProject[];
  categories: PortfolioCategory[];
}) {
  const [active, setActive] = useState("all");
  const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? "Other";

  // Only offer filters that have at least one project (plus "All").
  const filters = categories.filter(
    (c) => c.id === "all" || projects.some((p) => p.category === c.id),
  );
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors",
              active === c.id
                ? "border-ink bg-ink text-white"
                : "border-ink/20 bg-surface text-ink hover:border-ink",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-12 rounded-brand border border-dashed border-line p-10 text-center text-muted">
          No projects in this category yet.
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {visible.map((project, i) => (
            <li key={project.id}>
              <PortfolioCard
                project={project}
                categoryLabel={labelFor(project.category)}
                priority={i < 3}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
