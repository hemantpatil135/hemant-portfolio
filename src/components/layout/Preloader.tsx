"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Cinematic Spider-Tech intro loader.
 *
 * Black screen → glowing particles drift in → they fly to form the "HP"
 * monogram while thin energy threads weave a web between neighbours → a final
 * energy burst → fade to the site. Rendered on a single canvas (2D) so it stays
 * 60fps and adds no 3D weight. Kept short (≈1.9s) so it never delays the hero's
 * Largest Contentful Paint, with a wall-clock fallback and a reduced-motion /
 * hidden-tab fast path so it can never trap the user.
 */

const DUR = 1900;
const SETTLE_START = 150;
const SETTLE_SPAN = 1050; // per-particle travel window (plus stagger)
const HOLD_END = 1450;

interface P {
  sx: number; sy: number; // start
  tx: number; ty: number; // target (glyph)
  delay: number;
}

export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Nothing to watch if backgrounded or motion-reduced — reveal immediately.
    if (reduced || (typeof document !== "undefined" && document.hidden)) {
      setDone(true);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      setDone(true);
      return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // ── Sample the "HP" glyph into target points ──────────────────
    const off = document.createElement("canvas");
    const OW = 1400;
    const OH = 200;
    off.width = OW;
    off.height = OH;
    const octx = off.getContext("2d")!;
    octx.fillStyle = "#fff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.font = "900 118px Inter, system-ui, sans-serif";
    octx.fillText("HEMANT PATIL", OW / 2, OH / 2 + 4);
    const img = octx.getImageData(0, 0, OW, OH).data;

    const logoW = Math.min(1100, W * 0.9);
    const scale = logoW / OW;
    const originX = W / 2 - (OW * scale) / 2;
    const originY = H / 2 - (OH * scale) / 2;

    const particles: P[] = [];
    const gap = 8;
    for (let y = 0; y < OH; y += gap) {
      for (let x = 0; x < OW; x += gap) {
        if (img[(y * OW + x) * 4 + 3] > 128) {
          const tx = originX + x * scale;
          const ty = originY + y * scale;
          const ang = Math.random() * Math.PI * 2;
          const r = Math.max(W, H) * (0.4 + Math.random() * 0.5);
          particles.push({
            sx: W / 2 + Math.cos(ang) * r,
            sy: H / 2 + Math.sin(ang) * r,
            tx,
            ty,
            delay: (x / OW) * 450, // assemble left → right
          });
        }
      }
    }

    // Precompute a stable web of edges between nearby glyph points.
    const edges: Array<[number, number]> = [];
    const R2 = 24 * 24;
    for (let i = 0; i < particles.length; i++) {
      let found = 0;
      for (let j = i + 1; j < particles.length && found < 2; j++) {
        const dx = particles[i].tx - particles[j].tx;
        const dy = particles[i].ty - particles[j].ty;
        if (dx * dx + dy * dy < R2) {
          edges.push([i, j]);
          found++;
        }
      }
    }

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const start = performance.now();
    let raf = 0;

    const cur = (p: P, t: number) => {
      const local = Math.min(1, Math.max(0, (t - SETTLE_START - p.delay) / SETTLE_SPAN));
      const k = easeOut(local);
      return {
        x: p.sx + (p.tx - p.sx) * k,
        y: p.sy + (p.ty - p.sy) * k,
        k,
      };
    };

    const frame = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);

      // Web threads (fade in as points settle, gentle flicker on hold)
      const webAlpha = Math.min(1, Math.max(0, (t - SETTLE_START - 400) / 900));
      if (webAlpha > 0) {
        ctx.lineWidth = 1;
        for (let e = 0; e < edges.length; e++) {
          const a = cur(particles[edges[e][0]], t);
          const b = cur(particles[edges[e][1]], t);
          const flick = t > HOLD_END - 200 ? 0.5 + 0.5 * Math.sin(t / 90 + e) : 1;
          ctx.strokeStyle = `rgba(249,115,22,${0.22 * webAlpha * flick})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Burst scale in the final beat
      const burst = t > HOLD_END ? 1 + easeOut((t - HOLD_END) / (DUR - HOLD_END)) * 0.25 : 1;
      const cx = W / 2;
      const cy = H / 2;

      ctx.shadowColor = "rgba(251,146,60,0.9)";
      for (let i = 0; i < particles.length; i++) {
        const c = cur(particles[i], t);
        const x = cx + (c.x - cx) * burst;
        const y = cy + (c.y - cy) * burst;
        const appear = Math.min(1, t / 400);
        ctx.shadowBlur = 6 + c.k * 4;
        ctx.fillStyle = c.k > 0.98 ? "#FDBA74" : "#FB923C";
        ctx.globalAlpha = appear * (t > HOLD_END ? 1 - (t - HOLD_END) / (DUR - HOLD_END) * 0.15 : 1);
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (t < DUR) raf = requestAnimationFrame(frame);
      else setDone(true);
    };
    raf = requestAnimationFrame(frame);

    // Wall-clock safety net (rAF is throttled on hidden tabs).
    const fallback = setTimeout(() => setDone(true), DUR + 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0705]"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          {/* The name is drawn as particles; expose it to assistive tech since
              it exists only as pixels on the canvas. */}
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Hemant Patil"
            className="absolute inset-0 h-full w-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0], transition: { duration: 3.1, times: [0, 0.2, 0.8, 1] } }}
            className="absolute bottom-16 font-mono text-[11px] uppercase tracking-[0.5em] text-primary/70"
          >
            Frontend Software Engineer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
