"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Globe,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { clients, experiences, profile, type Experience as Role } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { CareerRail, RAIL_WIDTH, railX } from "./experience/CareerRail";
import { DepthSlab } from "./experience/DepthSlab";

/** Left gutter of the rail column, holding the year labels. */
const LABEL_WIDTH = 84;

const metricIcons: Record<string, LucideIcon> = {
  rocket: Rocket,
  zap: Zap,
  trend: TrendingUp,
  check: CheckCircle2,
  boxes: Boxes,
  gauge: Gauge,
  shield: ShieldCheck,
  users: Users,
  globe: Globe,
};

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

/** "Jun 2025" → Date, or null for anything that isn't a month-year token. */
function parseMonth(token: string): Date | null {
  const m = token.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  return month < 0 ? null : new Date(Number(m[2]), month, 1);
}

/** Splits on a spaced dash so the en dash in the data is handled either way. */
function parsePeriod(period: string) {
  const [rawStart, rawEnd = ""] = period.split(/\s[–—-]\s/);
  return { start: parseMonth(rawStart), end: parseMonth(rawEnd) };
}

/** Inclusive of both end months: Feb–May 2025 reads as 4 mo, not 3. */
function formatDuration(start: Date, end: Date): string {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  if (months < 1) return "";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (!years) return `${rest} mo`;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

/**
 * Distance from the document top in LAYOUT space. Deliberately not
 * getBoundingClientRect: the cards carry a scroll-linked 3D transform, and a
 * rect would report the tilted position, so the rail nodes would sit wherever
 * each card happened to be tilted when the observer last fired. offsetTop is
 * unaffected by transforms, so the rail always tracks the settled position.
 */
function layoutTop(el: HTMLElement): number {
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    y += node.offsetTop;
  }
  return y;
}

/** Company logo on a fixed plate, or the company initial when there's no asset. */
function RoleLogo({ role, size = 56 }: { role: Role; size?: number }) {
  if (!role.logo) {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 to-purple/25 font-bold text-accent"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {role.company.charAt(0)}
      </span>
    );
  }
  const light = role.logoPlate === "light";
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-2xl border",
        light ? "border-black/10 bg-white" : "border-white/15 bg-[#0d1120]",
      )}
      style={{ width: size, height: size }}
    >
      <span className="relative block h-1/2 w-3/4">
        <Image
          src={role.logo}
          alt={`${role.company} logo`}
          fill
          // SVGs must bypass the optimizer (it rejects them without
          // dangerouslyAllowSVG); the PNG logos should NOT — they were being
          // served at full resolution into a 56px box.
          unoptimized={role.logo.endsWith(".svg")}
          sizes="56px"
          className="object-contain"
        />
      </span>
    </span>
  );
}

function MetricTile({
  metric,
  compact = false,
}: {
  metric: NonNullable<Role["metrics"]>[number];
  compact?: boolean;
}) {
  const Icon = metricIcons[metric.icon] ?? Sparkles;
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card-2)]",
        compact ? "p-3" : "p-4",
      )}
    >
      <Icon className={cn("text-accent", compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden />
      <p
        className={cn(
          "break-words font-bold tabular-nums leading-none text-ink",
          compact ? "text-lg" : "text-2xl",
        )}
      >
        {metric.value}
      </p>
      <p className="hyphens-auto break-words text-[11px] leading-snug text-muted">{metric.label}</p>
    </div>
  );
}

function StackRow({ stack }: { stack: string[] }) {
  const shown = stack.slice(0, 5);
  const rest = stack.length - shown.length;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <Badge key={s}>{s}</Badge>
      ))}
      {rest > 0 && <Badge>+{rest}</Badge>}
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
        active
          ? "border-success/40 bg-success/10 text-success"
          : "border-[var(--border-strong)] bg-[var(--hover)] text-muted",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "animate-pulse bg-success" : "bg-muted",
        )}
      />
      {active ? "Active" : "Completed"}
    </span>
  );
}

export function Experience() {
  const [open, setOpen] = useState<number | null>(null);

  // "Present" resolves after mount: the page is statically generated, so a
  // build-time duration would go stale and mismatch on hydration.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  // The rail is drawn to the measured height of the card column, with a node at
  // each card's logo, so the spine stays aligned when cards expand or reflow.
  const columnRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextAnchorRef = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState<{ height: number; nodes: number[]; next: number }>({
    height: 0,
    nodes: [],
    next: 0,
  });

  const measure = useCallback(() => {
    const column = columnRef.current;
    if (!column) return;
    const top = layoutTop(column);
    const centreOf = (el: HTMLElement) => layoutTop(el) - top + el.offsetHeight / 2;

    const nodes = anchorRefs.current
      .filter((el): el is HTMLDivElement => Boolean(el))
      .map(centreOf);
    const next = nextAnchorRef.current ? centreOf(nextAnchorRef.current) : 0;

    // Measure to the last card's bottom, NOT the column's own height: both grid
    // items stretch to the row, so sizing the rail from the column height makes
    // the rail grow the row, which regrows the rail — an unbounded feedback loop.
    const last = column.lastElementChild as HTMLElement | null;
    const height = last ? layoutTop(last) - top + last.offsetHeight : 0;

    setRail((prev) =>
      Math.abs(prev.height - height) < 1 &&
      prev.next === next &&
      prev.nodes.length === nodes.length &&
      prev.nodes.every((n, i) => Math.abs(n - nodes[i]) < 1)
        ? prev
        : { height, nodes, next },
    );
  }, []);

  // useEffect, not useLayoutEffect: this component is server-rendered, and the
  // rail simply isn't drawn until the first measurement lands.
  useEffect(() => {
    measure();
    const column = columnRef.current;
    if (!column) return;
    const observer = new ResizeObserver(measure);
    observer.observe(column);
    return () => observer.disconnect();
  }, [measure, open]);

  return (
    <section id="experience" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="A track record of shipping in production"
          description="From hands-on React builds to leading delivery — across enterprise platforms and international clients."
        />

        <div
          className="mt-14 lg:grid lg:gap-8"
          style={{ gridTemplateColumns: `${LABEL_WIDTH + RAIL_WIDTH}px minmax(0,1fr)` }}
        >
          {/* ── Career rail (desktop only; the cards carry their own order on mobile) ── */}
          {/* self-start so this column never stretches the row and re-enters the
              measurement it depends on */}
          <div className="relative hidden self-start lg:block">
            {/* Out of flow: in flow it would push the rail down, and every node
                is positioned relative to the card column's top. */}
            <div className="absolute bottom-full left-0 mb-6 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Career timeline
              </p>
              <p className="mt-1.5 text-xs leading-snug text-muted">
                How the last four years unfolded.
              </p>
            </div>

            <div className="relative" style={{ height: rail.height }}>
              {/* Year labels occupy the left of the column; the spine sits to
                  their right so nothing spills outside the grid track. */}
              {rail.nodes.map((y, i) => {
                const role = experiences[i];
                if (!role) return null;
                const { start } = parsePeriod(role.period);
                return (
                  <div
                    key={`label-${role.company}`}
                    className="absolute left-0 -translate-y-1/2 text-right"
                    style={{ top: y, width: LABEL_WIDTH - 12 }}
                  >
                    <p className="font-mono text-lg font-bold leading-none text-accent">
                      {start?.getFullYear() ?? ""}
                    </p>
                    <p className="mt-1 font-mono text-[10px] leading-tight text-muted">
                      {role.period}
                    </p>
                  </div>
                );
              })}

              <div
                className="absolute top-0"
                style={{ left: LABEL_WIDTH, width: RAIL_WIDTH, height: rail.height }}
              >
                <CareerRail height={rail.height} />

                {rail.nodes.map((y, i) => {
                  const role = experiences[i];
                  if (!role) return null;
                  return (
                    <span
                      key={role.company}
                      aria-hidden
                      className="absolute grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center"
                      style={{ top: y, left: railX(y) }}
                    >
                      <span className="absolute inset-0 rounded-full bg-accent/25 blur-[6px]" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(251,146,60,0.8)]" />
                    </span>
                  );
                })}

                {/* The open end of the timeline */}
                {rail.next > 0 && (
                  <span
                    aria-hidden
                    className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-dashed border-accent/60 bg-deep text-[11px] font-bold text-accent"
                    style={{ top: rail.next, left: railX(rail.next) }}
                  >
                    ?
                  </span>
                )}
              </div>

              {rail.next > 0 && (
                <div
                  className="absolute left-0 -translate-y-1/2 text-right"
                  style={{ top: rail.next, width: LABEL_WIDTH - 12 }}
                >
                  <p className="font-mono text-sm font-bold leading-none text-accent">NEXT</p>
                  <p className="mt-1 font-mono text-[10px] leading-tight text-muted">
                    Your mission?
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Mission cards ── */}
          <div ref={columnRef} className="flex flex-col gap-6">
            {experiences.map((role, i) => {
              const { start, end } = parsePeriod(role.period);
              const active = !end;
              const until = end ?? now;
              const duration = start && until ? formatDuration(start, until) : "";
              const isOpen = open === i;
              const panelId = `role-panel-${i}`;
              const named = role.clientNames
                ? clients.filter((c) => role.clientNames?.includes(c.name))
                : [];
              const [summary, ...responsibilities] = role.highlights;

              /* ── Current mission: the hero card ── */
              if (active) {
                return (
                  <DepthSlab key={role.company}>
                    <article
                      className="relative overflow-hidden rounded-3xl border border-primary/40 p-6 sm:p-7"
                      style={{
                        background:
                          "linear-gradient(150deg, rgba(249,115,22,0.09), rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.015))",
                        boxShadow:
                          "0 0 0 1px rgba(249,115,22,0.12), 0 0 60px -20px rgba(249,115,22,0.5)",
                      }}
                    >
                      <div
                        className="mb-5 flex flex-wrap items-center justify-between gap-3"
                      >
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          Current mission
                        </p>
                        <StatusPill active />
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                        <div className="flex flex-col gap-4">
                          <div
                            ref={(el) => {
                              anchorRefs.current[i] = el;
                            }}
                            className="flex items-start gap-4"
                          >
                            <RoleLogo role={role} size={56} />
                            <div className="min-w-0">
                              <h3 className="text-xl font-bold leading-tight">{role.company}</h3>
                              <p className="text-sm font-semibold text-accent">{role.role}</p>
                              <p className="mt-1.5 font-mono text-xs text-muted">
                                {role.period}
                                {duration && ` · ${duration}`}
                              </p>
                            </div>
                          </div>

                          <StackRow stack={role.stack} />
                          <p className="text-sm leading-relaxed text-ink/85">{summary}</p>

                          {role.metrics && (
                            // 2×2 from lg: a single row leaves this column much
                            // shorter than the responsibilities beside it.
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                              {role.metrics.map((m) => (
                                <MetricTile key={m.label} metric={m} />
                              ))}
                            </div>
                          )}
                        </div>

                        <aside className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-5">
                          {role.products && (
                            <div>
                              <p className="border-l-2 border-accent pl-2 text-xs font-bold uppercase tracking-wider text-ink">
                                Products built
                              </p>
                              <ul className="mt-2.5 flex flex-col gap-1.5">
                                {role.products.map((p) => (
                                  <li
                                    key={p}
                                    className="flex items-center gap-2 text-sm text-muted"
                                  >
                                    <Layers className="h-3.5 w-3.5 shrink-0 text-accent/70" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <p className="border-l-2 border-accent pl-2 text-xs font-bold uppercase tracking-wider text-ink">
                              Key responsibilities
                            </p>
                            <ul className="mt-2.5 flex flex-col gap-2">
                              {responsibilities.map((h) => (
                                <li key={h} className="flex gap-2 text-xs leading-relaxed text-muted">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href="#projects"
                            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--hover)] px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent"
                          >
                            View case study
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </aside>
                      </div>
                    </article>
                  </DepthSlab>
                );
              }

              /* ── Completed missions ── */
              return (
                <DepthSlab key={role.company}>
                  <article
                    className={cn(
                      "rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl transition-colors duration-300",
                      isOpen ? "border-accent/40" : "hover:border-accent/25",
                    )}
                  >
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                      <div className="flex flex-col gap-3">
                        <div
                          ref={(el) => {
                            anchorRefs.current[i] = el;
                          }}
                          className="flex items-start gap-4"
                        >
                          <RoleLogo role={role} size={52} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold leading-tight">{role.company}</h3>
                              <StatusPill active={false} />
                            </div>
                            <p className="text-sm font-semibold text-accent">{role.role}</p>
                            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                              <span>
                                {role.period}
                                {duration && ` · ${duration}`}
                              </span>
                              {role.project && (
                                <span className="flex items-center gap-1.5">
                                  <Layers className="h-3.5 w-3.5" /> {role.project}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <StackRow stack={role.stack} />
                        <p className="text-sm leading-relaxed text-muted">{summary}</p>

                        {named.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                              Clients
                            </span>
                            {named.map((c) => (
                              <span
                                key={c.name}
                                title={c.name}
                                className={cn(
                                  "relative flex h-8 w-20 items-center justify-center overflow-hidden rounded-lg border",
                                  c.plate === "light"
                                    ? "border-black/10 bg-white"
                                    : "border-white/15 bg-[#0d1120]",
                                )}
                              >
                                <span className="relative block h-1/2 w-4/5">
                                  <Image
                                    src={c.logo}
                                    alt={c.name}
                                    fill
                                    unoptimized={c.logo.endsWith(".svg")}
                                    sizes="80px"
                                    className="object-contain"
                                  />
                                </span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {role.metrics && (
                        // 3-up only from sm: at 320–375 three columns leave each tile
                        // ~64px wide, wrapping the labels into a narrow stack.
                        <div className="grid grid-cols-2 gap-2.5 self-start sm:grid-cols-3">
                          {role.metrics.map((m) => (
                            <MetricTile key={m.label} metric={m} compact />
                          ))}
                        </div>
                      )}
                    </div>

                    {responsibilities.length > 0 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          // Only while open: the panel unmounts when collapsed, and
                          // aria-controls must not point at a missing id.
                          aria-controls={isOpen ? panelId : undefined}
                          className="-mb-2 mt-3 flex items-center gap-1.5 rounded-full py-2 text-xs font-semibold text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                            aria-hidden
                          />
                          {isOpen
                            ? "Hide details"
                            : `${responsibilities.length} more highlight${responsibilities.length > 1 ? "s" : ""}`}
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.ul
                              id={panelId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              {responsibilities.map((h) => (
                                <li key={h} className="flex gap-2.5 pt-2.5 text-sm text-muted">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </article>
                </DepthSlab>
              );
            })}

            {/* ── Next mission ── */}
            <DepthSlab>
              <article className="relative overflow-hidden rounded-3xl border border-primary/30 p-6 sm:p-7">
                {/* Deep-field backdrop, built from gradients so it ships no image */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 130% at 88% 50%, rgba(249,115,22,0.3), transparent 55%), radial-gradient(80% 90% at 95% 45%, rgba(251,113,133,0.22), transparent 60%), rgba(255,255,255,0.02)",
                  }}
                />
                <div aria-hidden className="starfield absolute inset-0 opacity-50" />

                <div
                  ref={nextAnchorRef}
                  className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="max-w-md">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Next mission
                    </p>
                    <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                      What&rsquo;s <span className="text-gradient-accent">next?</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Open to frontend roles where deep React work meets real
                      product impact.
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-primary/15 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-primary/25"
                    >
                      Start the conversation
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <p className="text-xs text-muted">
                      Usually replies within a day
                    </p>
                  </div>
                </div>
              </article>
            </DepthSlab>
          </div>
        </div>
      </div>
    </section>
  );
}
