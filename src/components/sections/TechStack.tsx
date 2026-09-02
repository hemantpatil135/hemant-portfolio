"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Gem,
  ArrowUpRight,
  Orbit,
  MousePointerClick,
  Boxes,
  Database,
  Gauge,
  Cloud,
  ShieldCheck,
  PersonStanding,
  CheckCircle2,
  Folder,
  LayoutDashboard,
  Building2,
  BarChart3,
  Building,
  Palette,
  Network,
  Users,
  BookOpen,
  ShoppingCart,
  Globe,
  LayoutTemplate,
  CreditCard,
  FolderGit2,
  Component,
  type LucideIcon,
} from "lucide-react";
import {
  orbitTools,
  stackFeatures,
  engineeringStrengths,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { useHasWebGL } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

// Curated map of only the icons referenced by `usedIn` data — importing the
// full lucide `icons` object pulls the entire set into the bundle.
const USED_IN_ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  BarChart3,
  Building,
  Palette,
  Network,
  Users,
  BookOpen,
  ShoppingCart,
  Globe,
  LayoutTemplate,
  CreditCard,
  FolderGit2,
  Component,
};

// The orbital system is client-only and lazily loaded so the section's copy
// paints before any WebGL work begins.
const StackOrbit = dynamic(() => import("@/components/three/stack/StackOrbit"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted">
      <Orbit className="mr-2 h-5 w-5 animate-spin-slow text-accent" /> Loading orbit…
    </div>
  ),
});

const featureIcons: Record<string, LucideIcon> = {
  modern: Sparkles,
  performance: Zap,
  clean: Gem,
  learning: ArrowUpRight,
};

const strengthIcons: Record<string, LucideIcon> = {
  component: Boxes,
  state: Database,
  performance: Gauge,
  api: Cloud,
  testing: ShieldCheck,
  a11y: PersonStanding,
};

export function TechStack() {
  const [activeId, setActiveId] = useState(orbitTools[0].id);
  const [isPaused, setIsPaused] = useState(false);
  // Starts true so the system is already drawing before the observer's first
  // callback, rather than showing an empty stage on the way in.
  const [inView, setInView] = useState(true);
  // three + fiber + drei + postprocessing is by far the heaviest chunk on the
  // page, and this section sits well below the fold. Latch on first approach so
  // it is never part of the initial page load; the 600px margin gives it time
  // to download and warm up before the stage is actually on screen.
  const [approached, setApproached] = useState(false);
  const hasWebGL = useHasWebGL();
  const allTools = orbitTools;
  const active = allTools.find((t) => t.id === activeId) ?? allTools[0];
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // The render loop only runs while the stage is on screen.
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setApproached(true);
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through all tools every 3 seconds
  useEffect(() => {
    if (isPaused || !inView) return;
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = allTools.findIndex((t) => t.id === prev);
        return allTools[(idx + 1) % allTools.length].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, inView, allTools]);

  // User interaction pauses auto-cycle for 4s then resumes
  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 4000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section id="stack" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background starfield */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 starfield opacity-60"
      />
      {/* Subtle ambient orange bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="section-shell relative">
        {/* minmax(0,…) on every track: the stage's aspect-ratio gives it a wide
            intrinsic width, which an `auto` column would grow to and overflow. */}
        <div className="grid items-start gap-8 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          {/* ──────────── LEFT: intro + value props ──────────── */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="eyebrow">◇ Tech Stack</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                My tech universe <br />
                built for <span className="text-gradient-accent">
                  scale
                </span>{" "}
                <br />&{" "}
                <span className="text-gradient-accent">performance.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                A connected ecosystem of technologies and tools I use to build
                fast, scalable, and user-centric applications.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <ul className="flex flex-col gap-4">
                {stackFeatures.map((f) => {
                  const Icon = featureIcons[f.icon];
                  return (
                    <li key={f.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {f.title}
                        </p>
                        <p className="text-xs text-muted">{f.sub}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* ──────────── RIGHT: the orbital system + Tool in Focus ──────────── */}
          <Reveal delay={1}>
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 0 0 1px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 48px -12px rgba(0,0,0,0.6)",
              }}
            >
              <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                {/* The system itself */}
                <div
                  ref={stageRef}
                  className="relative aspect-[1/0.72] min-h-[360px] w-full sm:min-h-[440px] lg:min-h-[500px]"
                  style={{
                    background:
                      "radial-gradient(ellipse 62% 52% at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 72%)",
                  }}
                >
                  {hasWebGL && approached ? (
                    <>
                      <StackOrbit
                        activeId={activeId}
                        onSelect={handleSelect}
                        paused={!inView}
                      />
                      <div className="pointer-events-none mt-10 absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--border)] bg-black/40 px-4 py-2 text-xs text-muted backdrop-blur">
                        <MousePointerClick className="h-3.5 w-3.5" /> Drag to
                        orbit · hover a planet
                      </div>
                    </>
                  ) : (
                    // Not yet approached, or WebGL unavailable (disabled/
                    // blocklisted): a static, tappable
                    // constellation of the same tools drives the "Tool in Focus"
                    // panel — no 3D context, no throw.
                    <div className="absolute inset-0 grid place-items-center p-6">
                      <div className="flex max-w-md flex-wrap justify-center gap-3">
                        {allTools.map((tool) => (
                          <button
                            key={tool.id}
                            type="button"
                            onClick={() => handleSelect(tool.id)}
                            aria-pressed={tool.id === activeId}
                            className={cn(
                              "grid h-14 w-14 place-items-center rounded-2xl border transition-colors",
                              tool.id === activeId
                                ? "border-primary/60 bg-primary/10"
                                : "border-[var(--border)] bg-[var(--card-2)] hover:border-accent/40",
                            )}
                            style={{ color: tool.color }}
                            title={tool.name}
                          >
                            <TechIcon name={tool.icon} className="h-6 w-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tool in Focus */}
                <div className="flex flex-col gap-5 border-t border-[var(--border)] p-6 lg:border-l lg:border-t-0">
              <span
                className="text-xs font-bold uppercase tracking-[0.22em]"
                style={{ color: "#FB923C" }}
              >
                Tool in Focus
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex flex-col gap-5"
                >
                  {/* Tool header */}
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{
                        border: `1px solid ${active.color}44`,
                        background: `${active.color}14`,
                        color: active.color,
                        boxShadow: `0 0 28px -6px ${active.color}88`,
                      }}
                    >
                      <TechIcon name={active.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-ink">
                        {active.name}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#FB923C" }}
                      >
                        {active.role}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-ink/85">
                    {active.description}
                  </p>

                  {/* Expertise Areas */}
                  <div className="flex flex-col gap-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#FB923C" }}
                    >
                      Expertise Areas
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {active.uses.map((u) => (
                        <li key={u} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          <span className="text-sm text-muted">{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Used In */}
                  {active.usedIn && active.usedIn.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "#FB923C" }}
                      >
                        Used In
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {active.usedIn.map((item, i) => {
                          const DynamicIcon =
                            USED_IN_ICONS[item.icon] ?? Folder;
                          return (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2 text-center"
                              style={{
                                background: "rgba(255,255,255,0.03)",
                                borderColor: "rgba(255,255,255,0.08)",
                              }}
                            >
                              <DynamicIcon className="h-4 w-4 text-muted" />
                              <span className="text-[10px] leading-tight text-muted">
                                {item.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ──────────── Engineering Strengths ──────────── */}
        <Reveal>
          <div
            className="mt-16 rounded-3xl p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <p
              className="mb-6 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color: "#FB923C" }}
            >
              Engineering Strengths
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {engineeringStrengths.map((s, idx) => {
                const Icon = strengthIcons[s.icon];
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex flex-col gap-3 rounded-2xl p-4 transition-all duration-300 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(249,115,22,0.35)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 24px -8px rgba(249,115,22,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        border: "1px solid rgba(249,115,22,0.25)",
                        color: "#FB923C",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold leading-tight text-ink">
                      {s.title}
                    </p>
                    <p className="text-xs leading-snug text-muted">{s.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
