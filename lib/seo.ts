import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

/**
 * Builds consistent per-page metadata (title, description, canonical, Open
 * Graph, Twitter). Next replaces nested objects such as `openGraph` rather than
 * merging them, so every page must supply the full set, which this does.
 * The default share image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
