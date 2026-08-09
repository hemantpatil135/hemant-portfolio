import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Beyond Tailwind's 2xl (1536px): ultrawide monitors and TVs.
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      colors: {
        // Core palette — "Lunar Deep Space".
        // Surfaces/text are theme-aware via CSS vars (see globals.css).
        // NOTE: named "deep" not "base" — a color key of `base` would make
        // Tailwind emit a `.text-base` COLOR utility that collides with the
        // built-in `.text-base` font-size (turning body text invisible).
        deep: "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "#F97316", // orange — brand
          foreground: "#FFF7ED",
        },
        accent: {
          DEFAULT: "#FB923C", // light orange — highlights/glow
          foreground: "#1C0A00",
        },
        // Key kept as `purple` so existing utilities (to-purple, shadow-glow-purple)
        // keep working — the value is now a warm rose used sparingly for emphasis.
        purple: {
          DEFAULT: "#FB7185", // warm rose
        },
        success: {
          DEFAULT: "#10B981", // emerald (semantic — kept)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-geist)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(249, 115, 22, 0.5)",
        "glow-accent": "0 0 48px -14px rgba(251, 146, 60, 0.5)",
        "glow-purple": "0 0 48px -14px rgba(251, 113, 133, 0.45)",
        soft: "0 8px 40px -12px rgba(10, 6, 2, 0.7)",
        neu: "8px 8px 24px rgba(0,0,0,0.55), -6px -6px 20px rgba(255,255,255,0.02)",
      },
      backgroundImage: {
        // Warm solar aurora — soft orange with a whisper of rose.
        "aurora":
          "radial-gradient(55% 55% at 50% 0%, rgba(255,237,213,0.10) 0%, transparent 55%), radial-gradient(50% 50% at 18% 15%, rgba(249,115,22,0.16) 0%, transparent 60%), radial-gradient(45% 45% at 85% 25%, rgba(251,146,60,0.12) 0%, transparent 60%), radial-gradient(50% 50% at 65% 90%, rgba(251,113,133,0.10) 0%, transparent 60%)",
        "grid":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -2%, 0) scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        aurora: "aurora-shift 14s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "spin-slow": "spin-slow 22s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
