"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * The career spine: a gently waving line of embers running past each role.
 *
 * The curve is a function of y, so a node at any height can be placed exactly on
 * it — that's what keeps the DOM year markers aligned with the drawn path as the
 * cards above them change height.
 */
export const RAIL_WIDTH = 96;
const AMPLITUDE = 16;
const PERIOD = 300;

export function railX(y: number): number {
  return RAIL_WIDTH / 2 + Math.sin(y / PERIOD) * AMPLITUDE;
}

interface Ember {
  y: number;
  speed: number;
  size: number;
  alpha: number;
}

export function CareerRail({ height }: { height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || height <= 0) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = RAIL_WIDTH * dpr;
    canvas.height = height * dpr;

    // Deterministic spread so the trail looks seeded, not random per mount.
    const embers: Ember[] = Array.from({ length: 34 }, (_, i) => ({
      y: (i / 34) * height,
      speed: 12 + ((i * 37) % 26),
      size: 0.7 + ((i * 13) % 10) / 7,
      alpha: 0.35 + ((i * 7) % 10) / 16,
    }));

    const drawTrail = () => {
      ctx.beginPath();
      for (let y = 0; y <= height; y += 4) {
        const x = railX(y);
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(249,115,22,0.15)");
      grad.addColorStop(0.12, "rgba(251,146,60,0.85)");
      grad.addColorStop(0.75, "rgba(249,115,22,0.5)");
      grad.addColorStop(1, "rgba(249,115,22,0.05)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = "rgba(251,146,60,0.9)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawEmbers = () => {
      embers.forEach((e) => {
        const x = railX(e.y);
        ctx.beginPath();
        ctx.arc(x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,186,116,${e.alpha})`;
        ctx.shadowColor = "rgba(251,146,60,0.95)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, RAIL_WIDTH, height);
      drawTrail();
      drawEmbers();
    };

    if (reduced) {
      render();
      return;
    }

    // Embers drift upward like sparks off a fuse; pause when off screen.
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      embers.forEach((e) => {
        e.y -= e.speed * dt;
        if (e.y < -6) e.y = height + 6;
      });
      render();
      if (visible) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(canvas);

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [height, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0"
      style={{ width: RAIL_WIDTH, height }}
    />
  );
}
