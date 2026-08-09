"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Spider-Tech cursor: a glowing energy orb with a lagging ring that leaves a
 * short trail of light particles. Only active on fine-pointer, motion-OK
 * devices. The trail is drawn on a single canvas and the rAF loop idles when
 * no particles remain, so it costs nothing at rest.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    type Trail = { x: number; y: number; life: number };
    const parts: Trail[] = [];
    let raf = 0;
    let running = false;
    let lastSpawn = 0;

    const loop = () => {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= 0.045;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = "#FB923C";
        ctx.shadowColor = "rgba(249,115,22,0.9)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * p.life + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (parts.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // Not every mouse event carries an Element target (one dispatched on
      // window/document does not) — .closest() on those throws and would kill
      // this listener for the rest of the session.
      const el = e.target instanceof Element ? e.target : null;
      // Over a text field the native I-beam is restored (see globals.css), so
      // stand down rather than drawing two cursors on top of each other.
      const overText = !!el?.closest("input, textarea, [contenteditable='true']");
      setHidden(overText);
      setHovering(!overText && !!el?.closest("a, button, [data-cursor='hover']"));

      const now = performance.now();
      if (now - lastSpawn > 16) {
        lastSpawn = now;
        parts.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (parts.length > 40) parts.shift();
        if (!running) {
          running = true;
          raf = requestAnimationFrame(loop);
        }
      }
    };
    const leave = () => setHidden(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Particle trail */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[199] h-full w-full"
      />

      {/* Energy orb */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full bg-accent transition-all duration-200"
          style={{
            width: pressed ? 14 : hovering ? 7 : 9,
            height: pressed ? 14 : hovering ? 7 : 9,
            opacity: hidden ? 0 : 1,
            boxShadow: "0 0 10px 2px rgba(249,115,22,0.85), 0 0 20px 6px rgba(251,146,60,0.35)",
          }}
        />
      </motion.div>

      {/* Lagging ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full border transition-all duration-200"
          style={{
            // Contract on press — the reference calls for a visible response to
            // the click itself, not just to hover.
            width: (hovering ? 46 : 30) - (pressed ? 8 : 0),
            height: (hovering ? 46 : 30) - (pressed ? 8 : 0),
            opacity: hidden ? 0 : hovering ? 1 : 0.6,
            borderColor: "rgba(251,146,60,0.6)",
            backgroundColor: hovering ? "rgba(249,115,22,0.08)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
}
