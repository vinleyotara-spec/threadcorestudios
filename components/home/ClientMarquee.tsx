"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Scrolling "billboard" wrapper for the customer logos. The motion is pure CSS
 * (see .marquee in globals.css). It pauses on hover and keyboard focus, has a
 * visible Pause button (people must be able to stop moving content), and stands
 * still for anyone whose device asks for reduced motion.
 */
export function ClientMarquee({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="marquee relative mt-6" data-paused={paused}>
      <div className="marquee-viewport overflow-hidden">
        <div className="marquee-track">{children}</div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play the moving customer logos" : "Pause the moving customer logos"}
        className="marquee-control absolute -top-10 right-5 inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:border-white hover:bg-white/20 sm:right-8"
      >
        {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );
}
