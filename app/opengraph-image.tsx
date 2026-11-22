import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The real logo (reversed, with tagline), read once at build time.
const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/threadcore-logo-full-reversed.png")).toString("base64")}`;
const LOGO_RATIO = 1750 / 682;

/** Social share image. Replace with a designed image file (opengraph-image.png) when you have one. */
export default function OpengraphImage() {
  const width = 1020;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2459",
        }}
      >
        <img src={logo} width={width} height={Math.round(width / LOGO_RATIO)} alt="" />
      </div>
    ),
    size,
  );
}
