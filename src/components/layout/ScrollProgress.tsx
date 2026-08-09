"use client";

import { useEffect, useRef } from "react";

/**
 * Slim orange scroll-progress bar fixed to the right edge of the viewport.
 * Fills from top to bottom as the user scrolls the page.
 * A soft glow blooms at the leading edge for depth.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, scrolled / max) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${pct})`;
      }
      if (dotRef.current) {
        dotRef.current.style.top = `${pct * 100}%`;
        dotRef.current.style.opacity = pct > 0.005 && pct < 0.998 ? "1" : "0";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-0 z-[90] h-full w-[3px]"
      style={{ background: "rgba(249,115,22,0.07)" }}
    >
      {/* Filled track */}
      <span
        ref={barRef}
        className="absolute inset-x-0 top-0 origin-top"
        style={{
          height: "100%",
          background:
            "linear-gradient(to bottom, #F97316 0%, #FB923C 60%, #FDBA74 100%)",
          transform: "scaleY(0)",
          willChange: "transform",
          boxShadow: "0 0 8px 1px rgba(249,115,22,0.35)",
        }}
      />
      {/* Leading glow dot */}
      <span
        ref={dotRef}
        className="absolute -left-[5px] h-[13px] w-[13px] -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,1) 0%, rgba(249,115,22,0.6) 45%, transparent 80%)",
          boxShadow:
            "0 0 12px 4px rgba(249,115,22,0.55), 0 0 4px 1px rgba(251,146,60,0.9)",
          top: "0%",
          willChange: "top",
        }}
      />
    </div>
  );
}
