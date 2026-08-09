"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Spider-Tech cyber-city energy network.
 *
 * A canvas of drifting nodes joined by thin orange "web" threads, with light
 * pulses that travel the links — the connective tissue of the hero universe.
 * Pure 2D canvas so it stays 60fps; the rAF loop is skipped for reduced-motion.
 * Rendered full-bleed and low-opacity so the hero copy stays readable on top.
 */
export function CyberCity({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      // Fall back to the viewport: as a replaced element a full-bleed <canvas>
      // can report clientWidth/Height of 0 before first layout.
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.min(64, Math.round((w * h) / 22000));
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));
    // Light pulses travelling between random node pairs.
    const pulses = Array.from({ length: 10 }, () => ({
      a: (Math.random() * COUNT) | 0,
      b: (Math.random() * COUNT) | 0,
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
    }));

    const LINK = 150;
    let raf = 0;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Threads between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(249,115,22,${0.14 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(251,146,60,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Travelling pulses
      ctx.shadowColor = "rgba(249,115,22,0.9)";
      ctx.shadowBlur = 8;
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.a = (Math.random() * COUNT) | 0;
          p.b = (Math.random() * COUNT) | 0;
        }
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "#FDBA74";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    // Always paint one static frame; only loop when motion is allowed.
    draw();
    if (reduced) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
