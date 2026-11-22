import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Threadcore Studios lockup: the mark, the one-word "Threadcore" wordmark (Poppins
 * ExtraBold, as in the logo) and a small orange "STUDIOS". The text comes from
 * siteConfig.name, so a rename in lib/config.ts flows through.
 * The outlined vector logo files for print are in /public/brand.
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
      <LogoMark tone={tone} className="size-[3.4rem] shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-logo text-[1.6rem] font-extrabold tracking-[-0.03em]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          {word}
        </span>
        {descriptor && (
          <span className="font-logo mt-1.5 flex items-center gap-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.5em] text-orange">
            <span aria-hidden="true" className="h-px flex-1 bg-orange" />
            {descriptor}
            <span aria-hidden="true" className="h-px flex-1 bg-orange" />
          </span>
        )}
      </span>
    </Link>
  );
}
