import { cn } from "@/lib/utils";

/**
 * Consistent section title block. Wrap a word in the `title` with *asterisks*
 * to render it in the italic accent style, e.g. "Work we're *proud* of".
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  headingId,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  /** Optional id on the heading (for aria-labelledby on the section). */
  headingId?: string;
  className?: string;
}) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.18em]",
            tone === "dark" ? "text-accent" : "text-white/70",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={headingId}
        className={cn(
          "font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {parts.map((part, i) =>
          part.startsWith("*") ? (
            <em key={i} className={cn("italic", tone === "dark" ? "text-accent" : "text-orange")}>
              {part.slice(1, -1)}
            </em>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-muted" : "text-white/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
