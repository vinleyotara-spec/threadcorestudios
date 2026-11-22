import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Threadcore Studios lockup: the needle-and-thread "T" mark, the one-word "Threadcore"
 * wordmark and a small "STUDIOS" descriptor. The text is taken from
 * siteConfig.name, so a rename in lib/config.ts flows through.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const [word, ...rest] = siteConfig.name.split(" ");
  const descriptor = rest.join(" ");

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn("inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap", className)}
    >
      <LogoMark tone={tone} className="size-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.4rem] font-semibold tracking-[-0.02em]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          {word}
        </span>
        {descriptor && (
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.36em]",
              tone === "dark" ? "text-accent" : "text-white/70",
            )}
          >
            {descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
