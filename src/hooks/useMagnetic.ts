"use client";

import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/** Max px the element may be pulled from rest — keeps it inside its own hit box. */
const MAX_PULL = 10;
/** Baseline lift while hovered, folded into the same transform as the pull. */
const LIFT = 2;

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/**
 * Magnetic hover — the element eases toward the cursor while the pointer is
 * over it, then eases back on exit.
 *
 * Easing is the consumer's CSS `transition` on `transform` (see Button), not a
 * JS spring: one interpolator, no double-easing. The consumer must therefore
 * keep `transform` in its transition list.
 *
 * Two things this has to get right:
 *   - the pull is clamped, so the element never leaves its own hit box and
 *     can't oscillate in and out from under the pointer;
 *   - the rest centre subtracts the offset we already applied, because
 *     getBoundingClientRect() includes our own transform. Measuring it raw
 *     feeds the output back into the input and settles at
 *     strength/(1+strength) — 0.2 for a requested 0.25.
 *
 * The hover lift lives here rather than in a `hover:-translate-y-*` class:
 * this hook owns the element's transform, so such a class would be silently
 * overridden.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  const offset = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (reduced || !strength || !el) return;
      const r = el.getBoundingClientRect();
      const restX = r.left + r.width / 2 - offset.current.x;
      const restY = r.top + r.height / 2 - offset.current.y;
      const x = clamp((e.clientX - restX) * strength, MAX_PULL);
      const y = clamp((e.clientY - restY) * strength, MAX_PULL) - LIFT;
      offset.current = { x, y };
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [reduced, strength],
  );

  const onMouseLeave = useCallback(() => {
    offset.current = { x: 0, y: 0 };
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
