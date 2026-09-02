"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

/** Resolve a scroll target (selector or absolute Y) to an absolute Y position. */
function resolveTargetY(target: string | number, offset: number): number | null {
  if (typeof target === "number") return target + offset;
  const el = document.querySelector(target);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY + offset;
}

/** Premium ease — quick start, long smooth glide out. */
const easeOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Smooth scroll hook using Lenis.
 * Falls back to native smooth scroll under reduced-motion / no-Lenis.
 */
export function useSmoothScroll() {
  return useCallback((target: string | number, offset = 0) => {
    if (typeof window === "undefined") return;
    const lenis = window.__lenis;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const raw = resolveTargetY(target, offset);
    if (raw == null) {
      // The shared nav/footer/palette links point at homepage sections, which
      // don't exist on standalone routes (/copyright, /privacy). Send the
      // browser home to the anchor instead of silently doing nothing.
      if (typeof target === "string" && target.startsWith("#")) {
        window.location.href = `/${target}`;
      }
      return;
    }

    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const toY = Math.max(0, Math.min(maxY, raw));
    const fromY = window.scrollY;
    const distance = Math.abs(toY - fromY);
    if (distance < 4) return;

    if (!lenis || reduced) {
      window.scrollTo({ top: toY, behavior: reduced ? "auto" : "smooth" });
      return;
    }

    // Short hops ~0.7s, cross-page ~1.3s — feels responsive but weighted.
    const duration = Math.min(1.3, Math.max(0.7, 0.5 + distance / 3500));

    lenis.scrollTo(toY, {
      duration,
      easing: easeOut,
    });
  }, []);
}

/**
 * Resolve a homepage-section anchor for the current route: `#about` on the
 * homepage, `/#about` on a standalone route (/copyright, /privacy) so the link
 * is still correct when opened in a new tab or followed without JS.
 */
export function useSectionHref() {
  const pathname = usePathname();
  return useCallback(
    (href: string) => (pathname === "/" ? href : `/${href}`),
    [pathname],
  );
}
