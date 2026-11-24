import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { listServices } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/portfolio", "/customers", "/about", "/contact", "/quote", "/faq"];
  const base = siteConfig.url.replace(/\/$/, "");

  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      priority: path === "" ? 1 : 0.8,
    })),
    ...listServices().map((s) => ({
      url: `${base}/services/${s.slug}`,
      priority: 0.6,
    })),
  ];
}
