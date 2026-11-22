import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name.split(" ")[0],
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#0a2459",
    icons: [
      { src: "/brand/threadcore-profile.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
