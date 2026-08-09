"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Scroll-linked depth reveal for the mission cards: each slab starts lying back
 * in Z and hinges upright as it settles into view. Replaces `Reveal` in the
 * Experience column — it carries the same fade-in, so cards don't get two.
 *
 * Perspective lives on this wrapper rather than the shared card column, so each
 * slab pivots around its own centre instead of fanning away from one distant
 * origin. Hinged from the bottom edge so the settled position is the card's
 * real layout position and consecutive slabs never lean into each other.
 *
 * Transform-only by design: the career rail measures card positions from layout
 * offsets, which CSS transforms don't move. Driven by the page's own scroll —
 * Lenis already smooths it, so no extra spring here or it reads as lag.
 */
export function DepthSlab({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Top edge entering the viewport → card a third of the way up the screen.
    offset: ["start end", "start 35%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} style={reduced ? undefined : { perspective: 1200 }}>
      {reduced ? (
        children
      ) : (
        <motion.div style={{ rotateX, z, opacity, transformOrigin: "50% 100%" }}>
          {children}
        </motion.div>
      )}
    </div>
  );
}
