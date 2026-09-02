"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Boxes,
  GraduationCap,
  Star,
  Trophy,
  TrendingUp,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";
import {
  achievements,
  education,
  languages,
  type Achievement,
  type EducationItem,
  type LanguageProficiency,
} from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const achievementIcons: Record<Achievement["icon"], LucideIcon> = {
  leadership: Award,
  delivery: Boxes,
  team: Users,
};

/** Hexagonal frame — the recurring node shape across the section. */
function Hex({
  size,
  active = false,
  tint,
  children,
}: {
  size: number;
  active?: boolean;
  tint?: string;
  children: React.ReactNode;
}) {
  const stroke = tint ?? (active ? "#F97316" : "var(--border-strong)");
  const fill = tint
    ? `${tint}1f`
    : active
      ? "rgba(249,115,22,0.14)"
      : "var(--card-2)";
  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points="50,3 91,26 91,74 50,97 9,74 9,26"
          fill={fill}
          stroke={stroke}
          strokeWidth={active ? 4 : 3}
          style={
            active
              ? { filter: "drop-shadow(0 0 10px rgba(249,115,22,0.55))" }
              : undefined
          }
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Small labelled section title with a leading icon. */
function PanelTitle({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </h3>
  );
}

function Pill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card-2)] px-3 py-1.5 text-xs">
      <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </span>
  );
}

/**
 * Decorative isometric wireframe skyline drawn behind each education card.
 *
 * All coordinates come from integer isometric math (even `U`, integer heights),
 * so server and client emit byte-identical SVG — no hydration mismatch, the way
 * `Math.cos`-based coordinates would cause.
 */
function WireBuilding({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  const U = 16; // even, so U/2 stays integer
  const HZ = 8; // per-level height
  const ox = 80;
  const oy = 100;
  const pt = (x: number, y: number, z: number) =>
    `${ox + (x - y) * U},${oy + (x + y) * (U / 2) - z * HZ}`;

  const boxes = [
    { x: 0, y: 0, w: 2, d: 2, h: 11 }, // tall back tower
    { x: 2, y: 0, w: 2, d: 2, h: 6 }, // right tower
    { x: 0, y: 2, w: 2, d: 2, h: 4 }, // front block
  ];

  return (
    <svg viewBox="0 0 160 180" className={className} aria-hidden>
      {boxes.map((b, bi) => {
        const { x, y, w, d, h } = b;
        const top = [
          pt(x, y, h),
          pt(x + w, y, h),
          pt(x + w, y + d, h),
          pt(x, y + d, h),
        ].join(" ");
        const verticals: [number, number][] = [
          [x + w, y],
          [x + w, y + d],
          [x, y + d],
        ];
        // Floor lines every two levels, traced across the two visible faces.
        const floors = Array.from(
          { length: Math.floor((h - 1) / 2) },
          (_, k) => (k + 1) * 2,
        );
        const apex = pt(x + w, y + d, h)
          .split(",")
          .map(Number);
        return (
          <g
            key={bi}
            stroke={color}
            strokeWidth="1"
            fill="none"
            strokeLinejoin="round"
          >
            <polygon points={top} opacity="0.85" />
            {verticals.map(([cx, cy], ci) => (
              <polyline
                key={`v${ci}`}
                points={`${pt(cx, cy, h)} ${pt(cx, cy, 0)}`}
              />
            ))}
            {floors.map((z) => (
              <polyline
                key={`f${z}`}
                points={`${pt(x + w, y, z)} ${pt(x + w, y + d, z)} ${pt(x, y + d, z)}`}
                opacity="0.5"
              />
            ))}
            <circle
              cx={apex[0]}
              cy={apex[1]}
              r="1.8"
              fill="#FDBA74"
              stroke="none"
            />
          </g>
        );
      })}
    </svg>
  );
}

function EduCard({ edu, active }: { edu: EducationItem; active: boolean }) {
  return (
    <div className="relative flex items-start gap-4">
      <Hex size={52} active={active}>
        <GraduationCap
          className={cn("h-6 w-6", active ? "text-accent" : "text-muted")}
          aria-hidden
        />
      </Hex>
      <div
        className={cn(
          "relative min-w-0 flex-1 overflow-hidden rounded-2xl border p-5 transition-colors",
          active
            ? "border-primary/40 bg-primary/[0.05]"
            : "border-[var(--border)] bg-[var(--card)] hover:border-accent/25",
        )}
      >
        <WireBuilding
          color={active ? "#F97316" : "#64748B"}
          className={cn(
            "pointer-events-none absolute -right-6 top-1/2 hidden h-[150px] w-[133px] -translate-y-1/2 sm:block",
            active ? "opacity-45" : "opacity-25",
          )}
        />
        <div className="relative z-10">
          <p className="font-mono text-xs font-semibold text-accent">
            {edu.period}
          </p>
          <h4 className="mt-1 text-lg font-bold leading-tight">{edu.degree}</h4>
          <p className="text-sm text-muted">{edu.institution}</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <Pill icon={TrendingUp} label="CGPA:" value={edu.cgpa} />
            <Pill
              icon={Star}
              label="Specialization:"
              value={edu.specialization}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LangBadge({ lang }: { lang: LanguageProficiency }) {
  const proficiencyLevel = lang.level === "Native" ? 100 : 85;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col gap-2.5 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--card-2)] p-2.5 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/10">
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl blur-xl"
            style={{ backgroundColor: lang.tint }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          />
        )}

        <div className="relative flex items-center gap-2.5">
          <Hex size={40} tint={lang.tint}>
            <span
              className="text-sm font-bold transition-transform duration-300 group-hover:scale-110"
              style={{ color: lang.tint }}
              lang={lang.name === "English" ? "en" : undefined}
            >
              {lang.glyph}
            </span>
          </Hex>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {lang.name}
            </p>
            <p className="text-[11px] text-muted">{lang.level}</p>
          </div>
        </div>

        {/* Proficiency bar */}
        <motion.div
          className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--card-2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full rounded-full transition-all"
            style={{ backgroundColor: lang.tint }}
            initial={{ width: 0 }}
            animate={{ width: `${proficiencyLevel}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Renders the achievement text with its standout fact emphasised. */
function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-semibold text-accent">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

function AchievementRow({ ach, index }: { ach: Achievement; index: number }) {
  const Icon = achievementIcons[ach.icon];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Hex size={52} active>
        <motion.span
          className="font-mono text-sm font-bold text-accent"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </Hex>
      <motion.div
        className="flex flex-1 items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--card-2)] p-5 backdrop-blur-sm transition-all duration-300"
        animate={{
          y: isHovered ? -2 : 0,
          boxShadow: isHovered
            ? "0 12px 24px rgba(249, 115, 22, 0.15)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderColor: isHovered ? "rgba(249, 115, 22, 0.4)" : "var(--border)",
        }}
      >
        <p className="text-sm leading-relaxed text-ink/90">
          <Highlighted text={ach.text} highlight={ach.highlight} />
        </p>
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            className="mt-0.5 h-7 w-7 shrink-0 text-accent transition-colors duration-300"
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Education & Recognition"
          title="Foundations & achievements"
          description="Formal computer-science education paired with a proven record of leadership and delivery."
        />

        <div className="mt-14 flex flex-col gap-6">
          {/* ── Left: education journey ── */}
          <div className="grid gap-6 [&>*]:min-w-0 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--card-2)] p-6 backdrop-blur-xl sm:p-7">
              <PanelTitle icon={GraduationCap}>Education Journey</PanelTitle>
              <div className="relative mt-6 flex flex-col gap-5">
                {/* Enhanced timeline spine */}
                <div className="absolute bottom-8 left-[26px] top-8 w-px overflow-hidden">
                  <motion.div
                    className="h-full w-full bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Timeline dots */}
                {education.map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute left-[14px] h-6 w-6"
                    style={{ top: `calc(${i * 100}% + 8px)` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                ))}

                {education.map((edu, i) => (
                  <EduCard key={edu.degree} edu={edu} active={i === 0} />
                ))}
              </div>
            </Reveal>

            {/* ── Right: achievements ── */}
            <Reveal
              delay={1}
              className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-xl sm:p-6"
            >
              <PanelTitle icon={Trophy}>Achievements</PanelTitle>
              <div className="relative mt-5 flex flex-col gap-3">
                <span className="absolute bottom-6 left-[26px] top-6 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
                {achievements.map((ach, i) => (
                  <AchievementRow key={ach.highlight} ach={ach} index={i} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
