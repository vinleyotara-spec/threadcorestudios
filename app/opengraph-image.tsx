import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { LOGO_NEEDLE, LOGO_STITCHES, LOGO_THREAD, LOGO_THREAD_WIDTH, LOGO_VIEWBOX } from "@/lib/logo-geometry";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share image. Replace with a designed image file (opengraph-image.png) when you have one. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#161513",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="92" height="92" viewBox={LOGO_VIEWBOX}>
            <g fill="none" stroke="#ff6a47" strokeWidth={LOGO_THREAD_WIDTH} strokeLinecap="round">
              <path d={LOGO_THREAD} />
              <path d={LOGO_STITCHES} />
            </g>
            <path d={LOGO_NEEDLE} fill="#ffffff" fillRule="evenodd" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing: -2 }}>
            <span>Bring Your</span>
            <span style={{ color: "#ff7a5c", marginLeft: 26 }}>Ideas</span>
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing: -2 }}>to Life.</div>
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)" }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
