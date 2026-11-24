import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonStyles } from "@/components/shared/Button";
import { IllustrationChip } from "@/components/shared/IllustrationChip";
import type { PortfolioProject } from "@/types";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function PortfolioCard({
  project,
  categoryLabel,
  priority = false,
}: {
  project: PortfolioProject;
  categoryLabel: string;
  priority?: boolean;
}) {
  const quoteHref = project.serviceSlug
    ? `/quote?service=${project.serviceSlug}`
    : "/quote";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-brand border border-line bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {project.isSample && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink">
            Sample
          </span>
        )}
        {project.isIllustration && <IllustrationChip label={project.imageLabel} />}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          {categoryLabel}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex items-center gap-2">
          <Link href={quoteHref} className={buttonStyles("outline", "md", "flex-1")}>
            Request similar
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            href={whatsappUrl(whatsappMessages.project(project.title))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${project.title} on WhatsApp`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
