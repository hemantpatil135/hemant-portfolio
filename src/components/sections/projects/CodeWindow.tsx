"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Floating "ship.ts" editor — a crisp DOM/glass panel matching the hero's IDE
 * aesthetic (macOS chrome, line-numbered gutter, syntax highlight, status bar).
 * The snippet types itself out on a continuous loop (type → hold → erase →
 * retype) with a blinking caret, so it always reads as a live editor.
 *
 * Content is a build-and-ship pipeline reflecting real strengths (reusable
 * architecture → code review → testing) — deliberately NOT the "4.5+ years"
 * bio the hero already carries, so nothing is repeated.
 */

type Tok = { t: string; c: string };

// Syntax palette, warm + on-theme.
const K = "text-[#FB923C]"; // keyword
const V = "text-[#FFE8CC]"; // identifier
const M = "text-[#FDBA74]"; // method
const F = "text-[#FCD34D]"; // function ref
const P = "text-muted"; // punctuation

const LINES: Tok[][] = [
  [
    { t: "const ", c: K },
    { t: "shipped", c: V },
    { t: " = ", c: P },
    { t: "features", c: V },
  ],
  [
    { t: "  .", c: P },
    { t: "map", c: M },
    { t: "(", c: P },
    { t: "architect", c: F },
    { t: ")", c: P },
  ],
  [
    { t: "  .", c: P },
    { t: "map", c: M },
    { t: "(", c: P },
    { t: "review", c: F },
    { t: ")", c: P },
  ],
  [
    { t: "  .", c: P },
    { t: "filter", c: M },
    { t: "(", c: P },
    { t: "tested", c: F },
    { t: ");", c: P },
  ],
];

const lineLen = (line: Tok[]) => line.reduce((a, t) => a + t.t.length, 0);

// Loop phases (ms).
const T_TYPE = 1800;
const HOLD = 1600;
const T_DEL = 900;
const GAP = 500;
const CYCLE = T_TYPE + HOLD + T_DEL + GAP;

export function CodeWindow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  // The type/erase loop sets state every frame, so it must not run while the
  // Projects section is off screen — otherwise it re-renders this tree ~60x a
  // second the whole time someone is reading the hero. Same gate CareerRail uses.
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // +1 per line break so the caret pauses briefly between lines.
  const total = useMemo(
    () => LINES.reduce((s, l) => s + lineLen(l), 0) + (LINES.length - 1),
    [],
  );

  // Start fully typed, not empty: if the observer never fires the panel still
  // reads as a finished editor rather than a blank box. The loop resets it to 0
  // and types up once it takes over, 200px before the panel is actually in view.
  const [n, setN] = useState(total);

  useEffect(() => {
    if (reduced) {
      setN(total);
      return;
    }
    if (!onScreen) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) % CYCLE;
      let chars: number;
      if (t < T_TYPE) chars = Math.round(total * (t / T_TYPE));
      else if (t < T_TYPE + HOLD) chars = total;
      else if (t < T_TYPE + HOLD + T_DEL)
        chars = Math.round(total * (1 - (t - T_TYPE - HOLD) / T_DEL));
      else chars = 0;
      // React bails out when the value is unchanged, so hold/gap frames are free.
      setN(chars);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, total, onScreen]);

  // Per-line visible-char budget + which line the caret sits on.
  let offset = 0;
  const rows = LINES.map((line) => {
    const len = lineLen(line);
    const budget = n - offset;
    offset += len + 1;
    return { line, len, shown: Math.max(0, Math.min(budget, len)), started: budget > 0 };
  });
  const caretLine = rows.reduce((acc, r, i) => (r.started ? i : acc), 0);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`} aria-hidden>
      {/* Ambient glow */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(249,115,22,0.28), transparent 70%)",
        }}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-primary/25 bg-[#0e0b09]/90 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9),0_0_40px_-16px_rgba(249,115,22,0.5)] backdrop-blur-xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FDBA74]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
            <span className="ml-2 font-mono text-[11px] text-white/55">ship.ts</span>
            <span className="ml-auto rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-accent">
              TS
            </span>
          </div>

          {/* Code body — fixed height so typing never shifts layout */}
          <div className="px-3.5 py-4 font-mono" style={{ minHeight: LINES.length * 24 + 8 }}>
            {rows.map((row, i) => {
              let remaining = row.shown;
              return (
                <div key={i} className="flex gap-3">
                  <span className="w-4 shrink-0 select-none text-right text-[11px] leading-6 text-muted/40 tabular-nums">
                    {i + 1}
                  </span>
                  <code className="text-[12.5px] leading-6">
                    {row.line.map((tok, ti) => {
                      if (remaining <= 0) return null;
                      const take = Math.min(tok.t.length, remaining);
                      remaining -= take;
                      return (
                        <span key={ti} className={tok.c}>
                          {tok.t.slice(0, take)}
                        </span>
                      );
                    })}
                    {i === caretLine && (
                      <span
                        className={`ml-[1px] inline-block h-[13px] w-[7px] translate-y-[2px] rounded-[1px] bg-accent align-middle ${reduced ? "" : "animate-pulse"}`}
                      />
                    )}
                  </code>
                </div>
              );
            })}
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-3 border-t border-white/[0.06] bg-white/[0.02] px-3.5 py-2 font-mono text-[10px] text-white/45">
            <span className="flex items-center gap-1.5 text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              shipped
            </span>
            <span>main</span>
            <span className="ml-auto">TypeScript · UTF-8</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
