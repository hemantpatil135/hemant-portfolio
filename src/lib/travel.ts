"use client";

import { useSyncExternalStore } from "react";

/**
 * Spider-Tech "energy-cable" travel bus.
 *
 * A tiny external store that broadcasts when the viewport is being *pulled*
 * through the network (programmatic section navigation). The energy-thread
 * overlay and the hero react to it. Kept out of React state so imperative
 * animation code (rAF/canvas) can read it every frame without re-renders.
 */
export interface TravelState {
  traveling: boolean;
  /** 1 = pulling down the page, -1 = pulling up. */
  dir: 1 | -1;
  targetId: string | null;
  /** Travel distance in px — drives effect intensity. */
  distance: number;
  startedAt: number;
  /** Planned duration in ms. */
  duration: number;
  /**
   * Phase boundaries (ms from startedAt), so the visual overlay stays perfectly
   * frame-synced to the GSAP physics timeline that drives the actual scroll.
   *   0 ────── throwMs ────── pullEndMs ────── duration
   *   throw+impact   pull (section drags)   overshoot+settle (release)
   */
  throwMs: number;
  pullEndMs: number;
}

const INITIAL: TravelState = {
  traveling: false,
  dir: 1,
  targetId: null,
  distance: 0,
  startedAt: 0,
  duration: 0,
  throwMs: 200,
  pullEndMs: 200,
};

let state: TravelState = INITIAL;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribeTravel(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
export const getTravel = () => state;

export function beginTravel(p: {
  dir: 1 | -1;
  targetId: string | null;
  distance: number;
  duration: number;
  throwMs: number;
  pullEndMs: number;
}) {
  state = {
    traveling: true,
    dir: p.dir,
    targetId: p.targetId,
    distance: p.distance,
    startedAt: performance.now(),
    duration: p.duration,
    throwMs: p.throwMs,
    pullEndMs: p.pullEndMs,
  };
  emit();
}

export function endTravel() {
  if (!state.traveling) return;
  state = { ...state, traveling: false, targetId: null };
  emit();
}

/** React binding for components that want to re-render on travel changes. */
export function useTravel(): TravelState {
  return useSyncExternalStore(subscribeTravel, getTravel, getTravel);
}

/**
 * "Cable-pull" easing — fast acceleration, then a slight overshoot and settle,
 * like tension releasing in a stretched web cable (easeOutBack, tuned soft so
 * it reads as premium rather than nauseating). Returns values that briefly
 * exceed 1 mid-curve, producing the visual overshoot when fed to Lenis.
 */
export function easeCablePull(t: number): number {
  const c1 = 0.85; // overshoot strength (higher = more bounce)
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
