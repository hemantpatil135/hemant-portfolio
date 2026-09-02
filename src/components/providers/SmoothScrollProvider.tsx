"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Wraps the app in Lenis smooth scrolling and exposes the instance globally so
 * anchor navigation and the "back to top" control can drive scroll positions.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollTo = useSmoothScroll();

  // Honour a #section link followed from another route (e.g. the nav on
  // /copyright): the preloader overlay swallows the browser's own hash scroll,
  // so re-apply it once the ~1.9s intro has cleared.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !document.querySelector(hash)) return;
    const id = window.setTimeout(() => scrollTo(hash, -80), 2000);
    return () => window.clearTimeout(id);
  }, [scrollTo]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose for programmatic scrolling (see useSmoothScroll).
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
