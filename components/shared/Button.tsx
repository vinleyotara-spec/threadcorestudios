import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-orange text-ink hover:bg-orange-hover",
  dark: "bg-ink text-white hover:bg-black",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-light":
    "border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Internal navigation button (client-side routing). */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/** External link button (opens in a new tab), e.g. WhatsApp. */
export function ExternalButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"a">, "className" | "children">) {
  return (
    <a
      className={buttonStyles(variant, size, className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
