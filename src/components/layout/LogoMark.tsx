"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * "HP" circle monogram logo.
 *
 * A glowing circular plate with orange energy border, rotating arc sweep,
 * and the "HP" monogram inside. On hover: energy pulse ring, particle burst,
 * glow lift, and a micro scale.
 */

const BURST = [0, 1, 2, 3, 4, 5];

const markV: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};
const glowV: Variants = {
  rest: { opacity: 0.25, scale: 0.9 },
  hover: { opacity: 0.85, scale: 1.15, transition: { duration: 0.3 } },
};
const pulseV: Variants = {
  rest: { opacity: 0, scale: 0.7 },
  hover: {
    opacity: [0.55, 0],
    scale: [0.7, 1.9],
    transition: { duration: 0.9, ease: "easeOut", repeat: Infinity },
  },
};
const particleV: Variants = {
  rest: { opacity: 0, x: 0, y: 0, scale: 0 },
  hover: (i: number) => {
    const a = (i / BURST.length) * Math.PI * 2;
    return {
      opacity: [1, 0],
      scale: [1, 0],
      x: Math.cos(a) * 22,
      y: Math.sin(a) * 22,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        repeat: Infinity,
        delay: i * 0.04,
      },
    };
  },
};

export function LogoMark({
  size = 34,
  className,
  interactive = true,
}: {
  size?: number;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial="rest"
      animate="rest"
      whileHover={interactive ? "hover" : undefined}
      style={{ width: size, height: size }}
      className={cn("relative grid shrink-0 place-items-center", className)}
    >
      {/* Outer glowing circle ring — pulses */}
      <motion.span className="pointer-events-none absolute" />

      {/* Soft radial glow */}
      <motion.span
        variants={glowV}
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.55),transparent_70%)] blur-[6px]"
      />
      {/* Energy pulse ring */}
      <motion.span
        variants={pulseV}
        className="pointer-events-none absolute inset-0 rounded-full border border-primary"
      />
      {/* Particle burst */}
      {BURST.map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={particleV}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent"
          style={{ boxShadow: "0 0 6px rgba(251,146,60,0.9)" }}
        />
      ))}

      {/* Circle monogram — replaces hexagon */}
      <motion.svg
        variants={markV}
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        className="relative"
        style={{ filter: "drop-shadow(0 0 5px rgba(249,115,22,0.55))" }}
      >
        <defs>
          <linearGradient
            id="hp-stroke"
            x1="6"
            y1="6"
            x2="42"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="55%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <radialGradient id="hp-fill" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.22)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.03)" />
          </radialGradient>
        </defs>

        {/* Outer circle plate */}
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="url(#hp-fill)"
          stroke="url(#hp-stroke)"
          strokeWidth="2"
        />
        {/* Inner circle accent ring */}
        <circle
          cx="24"
          cy="24"
          r="14.5"
          fill="none"
          stroke="url(#hp-stroke)"
          strokeWidth="0.7"
          opacity="0.28"
        />
        {/* Four cardinal accent dots */}
        {(
          [
            [24, 4],
            [44, 24],
            [24, 44],
            [4, 24],
          ] as const
        ).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.3" fill="#FDBA74" />
        ))}

        {/* HP monogram */}
        <text
          x="24"
          y="24.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-geist), var(--font-inter), system-ui, sans-serif"
          fontWeight={800}
          fontSize="14"
          letterSpacing="0.2"
        >
          <tspan fill="#F8F4EF">H</tspan>
          <tspan fill="#FB923C">P</tspan>
        </text>
      </motion.svg>
    </motion.div>
  );
}
