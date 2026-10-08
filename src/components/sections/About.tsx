"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  Globe,
  Code2,
  Users,
  GraduationCap,
  Gauge,
  Zap,
  ShieldCheck,
  CalendarCheck,
  BarChart3,
  MapPin,
  BadgeCheck,
  Sparkles,
  Route,
  Share2,
  Landmark,
  ArrowRight,
  Quote,
  type LucideIcon,
} from "lucide-react";
import {
  about,
  aboutHighlights,
  impact,
  journey,
  clients,
  profile,
  type IconName,
  type ImpactStat,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { Signature } from "@/components/ui/Signature";
import { LogoMark } from "@/components/layout/LogoMark";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const highlightIcons: Record<string, LucideIcon> = {
  rocket: Rocket,
  building: Building2,
  clients: Globe,
  code: Code2,
  team: Users,
};

const impactIcons: Record<ImpactStat["icon"], LucideIcon> = {
  experience: Rocket,
  students: GraduationCap,
  universities: Landmark,
  speed: Gauge,
  api: Zap,
  testing: ShieldCheck,
  team: Users,
  delivery: CalendarCheck,
};

/** Small uppercase block heading with a leading icon. */
function BlockHeading({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <Icon className="h-4 w-4" />
      {children}
    </h3>
  );
}

// Tech-stack "network" — a React hub with six satellites, arranged hexagonally.
interface TechNode {
  name: IconName;
  label: string;
}
const TECH_HUB: TechNode = { name: "react", label: "React" };
const TECH_SATELLITES: TechNode[] = [
  { name: "typescript", label: "TypeScript" },
  { name: "redux", label: "Redux Toolkit" },
  { name: "tailwind", label: "Tailwind CSS" },
  { name: "next", label: "Next.js" },
  { name: "mui", label: "Material UI" },
  { name: "javascript", label: "JavaScript" },
];
// Hexagonal layout (percent of container), starting at the top.
const SAT_POS = TECH_SATELLITES.map((_, i) => {
  const a = (-90 + i * 60) * (Math.PI / 180);
  return { x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 34 };
});

export function About() {
  const scrollTo = useSmoothScroll();

  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.5fr] lg:gap-12">
          {/* ─────────────── LEFT: identity + character ─────────────── */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow">About Me</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Who is behind
                <br />
                the <span className="text-gradient-accent">mask?</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {about.intro}
              </p>
            </Reveal>

            {/* Identity card */}
            <Reveal delay={3}>
              <dl className="glass flex flex-col gap-4 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Currently at</dt>
                  <dd className="flex items-center gap-2">
                    <span className="flex h-6 items-center rounded-md bg-white/90 px-1.5">
                      <Image
                        src="/logos/interstride.svg"
                        alt="Interstride"
                        width={64}
                        height={16}
                        unoptimized
                        className="h-4 w-auto"
                      />
                    </span>
                  </dd>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Based in</dt>
                  <dd className="flex items-center gap-1.5 text-sm font-medium text-ink">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Pune, India
                  </dd>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Available for</dt>
                  <dd className="flex items-center gap-1.5 text-sm font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> New Opportunities
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* Identity core — original themed visual (no reused hero art) */}
            <Reveal delay={4}>
              <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(249,115,22,0.2),transparent_62%)]"
                />
                {/* status chips */}
                <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> ONLINE
                </span>
                <span className="absolute right-4 top-4 z-10 font-mono text-[10px] tracking-wider text-muted">
                  HP-01
                </span>

                {/* orbit rings + hex core */}
                <div className="relative flex h-52 w-52 items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_28s_linear_infinite]"
                  >
                    <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(251,146,60,0.9)]" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-7 rounded-full border border-dashed border-accent/25 animate-[spin_22s_linear_infinite_reverse]"
                  >
                    <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
                    <span className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-14 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.28),transparent_70%)] blur-md"
                  />
                  <LogoMark size={76} interactive={false} className="relative z-10" />
                </div>

                {/* identity label */}
                <div className="mt-5 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Identity Core
                  </p>
                  <p className="mt-1 text-lg font-bold text-ink">{profile.name}</p>
                  <p className="text-xs text-accent">{profile.role}</p>
                </div>

                {/* terminal chip */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[var(--border)] bg-deep/70 px-3 py-2 font-mono text-[11px] backdrop-blur-md">
                  <span className="text-success">$</span> <span className="text-muted">whoami</span>{" "}
                  <span className="text-ink/50">→</span>{" "}
                  <span className="text-accent">frontend-engineer</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─────────────── RIGHT: story, journey, stack, impact ─────────────── */}
          <div className="flex flex-col gap-10">
            {/* My Story */}
            <Reveal>
              <div className="flex flex-col gap-5">
                <BlockHeading icon={Sparkles}>My Story</BlockHeading>
                <p className="max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">
                  {about.story}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {aboutHighlights.map((h) => {
                    const Icon = highlightIcons[h.icon];
                    return (
                      <motion.div
                        key={h.title}
                        whileHover={{ y: -4 }}
                        className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 backdrop-blur-xl transition-colors hover:border-accent/40"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        {h.value && (
                          <span className="text-2xl font-bold text-ink">{h.value}</span>
                        )}
                        <span className="text-sm font-semibold leading-tight text-ink">
                          {h.title}
                        </span>
                        <span className="text-[11px] leading-snug text-muted">{h.sub}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Impact in numbers — resume-backed figures only */}
            <Reveal>
              <div className="flex flex-col gap-5">
                <BlockHeading icon={BarChart3}>Impact in numbers</BlockHeading>
                <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] [gap:1px] sm:grid-cols-4">
                  {impact.map((s) => {
                    const Icon = impactIcons[s.icon];
                    return (
                      <div key={s.label} className="flex flex-col gap-1.5 bg-deep/90 p-4">
                        <Icon className="h-4 w-4 text-accent" aria-hidden />
                        {/* dt before dd for valid markup; the label is shown under the value. */}
                        <dt className="order-last text-[11px] leading-snug text-muted">{s.label}</dt>
                        <dd className="text-2xl font-bold tabular-nums leading-none text-ink">
                          {s.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </Reveal>

            {/* Career Journey */}
            <Reveal>
              <div className="flex flex-col gap-6">
                <BlockHeading icon={Route}>Career Journey</BlockHeading>
                <div className="relative grid gap-8 sm:grid-cols-4 sm:gap-4">
                  {/* connecting rail */}
                  <div className="absolute left-1.5 right-0 top-2 hidden h-px bg-gradient-to-r from-primary/60 via-accent/40 to-primary/10 sm:block" />
                  {journey.map((m) => (
                    <div key={m.year} className="relative pl-5 sm:pl-0">
                      {/* vertical rail on mobile */}
                      <span className="absolute bottom-0 left-1.5 top-4 w-px bg-[var(--border)] sm:hidden" />
                      <span className="absolute left-0 top-1 block h-3.5 w-3.5 rounded-full border-2 border-primary bg-deep shadow-[0_0_12px_-2px_rgba(249,115,22,0.9)] sm:top-[1px]" />
                      <p className="mt-0 text-sm font-bold text-accent sm:mt-6">{m.year}</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{m.role}</p>
                      <p className="text-[11px] font-medium text-muted">{m.org}</p>
                      <p className="mt-1.5 text-xs leading-snug text-muted">{m.blurb}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tech network + Impact */}
            <div className="grid gap-8 xl:grid-cols-2">
              {/* Tech Stack Network */}
              <Reveal>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card-2)] p-5">
                  <BlockHeading icon={Share2}>Tech Stack Network</BlockHeading>
                  <div className="relative mx-auto h-[300px] w-full max-w-sm">
                    {/* connecting lines */}
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden
                    >
                      {SAT_POS.map((p, i) => (
                        <line
                          key={i}
                          x1="50"
                          y1="50"
                          x2={p.x}
                          y2={p.y}
                          stroke="rgba(249,115,22,0.35)"
                          strokeWidth="0.5"
                          strokeDasharray="1.5 2"
                        />
                      ))}
                    </svg>
                    {/* central hub */}
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-deep text-accent shadow-[0_0_30px_-6px_rgba(249,115,22,0.8)]">
                        <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" />
                        <TechIcon name={TECH_HUB.name} className="h-8 w-8" />
                      </span>
                      <span className="mt-1 text-[11px] font-semibold text-ink">
                        {TECH_HUB.label}
                      </span>
                    </div>
                    {/* satellites */}
                    {TECH_SATELLITES.map((node, i) => (
                      <div
                        key={node.label}
                        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                        style={{ left: `${SAT_POS[i].x}%`, top: `${SAT_POS[i].y}%` }}
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-strong)] text-accent backdrop-blur-md transition-colors hover:border-accent/50">
                          <TechIcon name={node.name} className="h-5 w-5" />
                        </span>
                        <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted">
                          {node.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("#stack", -80)}
                    className="mx-auto mt-1 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium text-ink transition hover:border-accent/40 hover:text-accent"
                  >
                    Explore My Stack <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Reveal>

              {/* What I focus on */}
              <Reveal delay={1}>
                <div className="flex h-full flex-col gap-4">
                  <BlockHeading icon={Sparkles}>What I focus on</BlockHeading>
                  <ul className="flex flex-1 flex-col justify-center gap-2.5">
                    {about.focus.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 backdrop-blur-xl"
                      >
                        <BadgeCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span className="text-sm font-medium text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Enterprise Clients */}
            <Reveal>
              <div className="flex flex-col gap-4">
                <BlockHeading icon={Landmark}>Enterprise Clients</BlockHeading>
                <div className="flex flex-wrap items-center gap-3">
                  {clients.map((c) => (
                    <div
                      key={c.name}
                      className={`flex h-16 flex-1 items-center justify-center rounded-2xl border border-[var(--border)] px-5 ${
                        c.plate === "light" ? "bg-white/90" : "bg-[var(--card-strong)]"
                      }`}
                      style={{ minWidth: 130 }}
                    >
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={120}
                        height={32}
                        unoptimized={c.logo.endsWith(".svg")}
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ─────────────── Quote bar ─────────────── */}
        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-accent/20 bg-accent/[0.05] p-7 sm:p-9">
            <Quote className="absolute -left-2 -top-3 h-20 w-20 text-accent/10" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-ink sm:text-xl">
                I care less about code that merely works, and more about code
                that{" "}
                <span className="text-gradient-accent font-semibold">
                  stays fast, stays readable, and holds up
                </span>{" "}
                as the product grows.
              </p>
              <Signature className="shrink-0 self-end" />
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
              <BadgeCheck className="h-3.5 w-3.5 text-success" /> {profile.role}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
