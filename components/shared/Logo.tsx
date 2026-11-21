import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Temporary wordmark: a stitched ring mark plus the business name from
 * lib/config.ts. Replace the <svg> (or swap in an <Image>) when a real logo exists.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn("inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap", className)}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="var(--brand-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 4.2"
        />
        <circle cx="16" cy="16" r="5.5" fill={tone === "dark" ? "var(--ink)" : "#fff"} />
      </svg>
      <span
        className={cn(
          "font-display text-[1.15rem] font-semibold leading-none tracking-tight",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
