"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Lock, Zap } from "lucide-react";
import { projects, type IconName, type Project } from "@/lib/data";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

/**
 * Stack label → TechIcon key. Only the technologies that actually appear in
 * `projects[].stack` need an entry; anything unmapped falls back to a chip
 * without an icon rather than rendering a wrong one.
 */
const TECH_ICONS: Record<string, IconName> = {
  "React.js": "react",
  TypeScript: "typescript",
  "Redux Toolkit": "redux",
  "Redux Saga": "redux",
  "Styled Components": "styled",
  "Next.js": "next",
  "Tailwind CSS": "tailwind",
  Jest: "jest",
};

const TABS = [
  "Overview",
  "Challenge",
  "Solution",
  "Features",
  "Impact",
] as const;
type Tab = (typeof TABS)[number];

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]",
        active
          ? "border-success/40 bg-success/10 text-success"
          : "border-[var(--border-strong)] bg-[var(--hover)] text-muted",
      )}
    >
      {active && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
      )}
      {active ? "Active" : "Completed"}
    </span>
  );
}

function LogoPlate({ project, size }: { project: Project; size: number }) {
  const light = project.logoPlate === "light";
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
          src={project.logo}
          alt={`${project.client} logo`}
          fill
          unoptimized={project.logo.endsWith(".svg")}
          sizes="56px"
          className="object-contain"
        />
      </span>
    </span>
  );
}

/**
 * Stylised mission preview.
 *
 * Deliberately an abstraction, not a screenshot: this is enterprise client work
 * under NDA, so the panel evokes a product surface — accent-lit deep field, the
 * brand mark on a floating glass plate — instead of showing real client screens.
 */
function MissionPreview({ project }: { project: Project }) {
  const plateLight = project.logoPlate === "light";
  return (
    <div className="perspective relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border)]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 110% at 20% 0%, ${project.accent}30, transparent 55%), radial-gradient(100% 100% at 100% 100%, ${project.accent}1f, transparent 55%), #070B16`,
        }}
      />
      <div className="starfield absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: project.accent, opacity: 0.45 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "relative flex h-[54%] w-[46%] items-center justify-center overflow-hidden rounded-2xl border shadow-soft [transform:rotateX(10deg)]",
            plateLight ? "border-black/5" : "border-white/10",
          )}
          style={{
            background: plateLight
              ? "linear-gradient(160deg, #ffffff, #e9eef6)"
              : "linear-gradient(160deg, #101a30, #070c18)",
          }}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
          <div className="relative h-[42%] w-[74%]">
            <Image
              src={project.logo}
              alt=""
              fill
              unoptimized={project.logo.endsWith(".svg")}
              sizes="240px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
        {project.personal
          ? "Personal project — open the live site"
          : "Representative view — client UI under NDA"}
      </span>
    </div>
  );
}

export function MissionArchive({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");
  const project = projects[selected];

  // Overview is the entry point for every mission; keeping the previous tab
  // across a switch strands the reader mid-detail on unfamiliar work.
  useEffect(() => setTab("Overview"), [selected]);

  // `metric` is one authored string, sometimes carrying two facts separated by
  // a middot. Split rather than invent a fixed set of metric tiles.
  const metrics = project.metric
    .split("·")
    .map((m) => m.trim())
    .filter(Boolean);

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[236px_minmax(0,1fr)]">
        {/* ── Archive list ── */}
        <aside className="flex flex-col border-b border-[var(--border)] p-4 lg:border-b-0 lg:border-r">
          <p className="flex items-center gap-2 px-1 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Mission archive
          </p>

          <ul className="flex flex-col gap-2">
            {projects.map((p, i) => {
              const isCurrent = i === selected;
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-2xl border p-2.5 text-left transition-colors",
                      isCurrent
                        ? "border-primary/50 bg-primary/[0.07]"
                        : "border-[var(--border)] bg-[var(--card-2)] hover:border-accent/30",
                    )}
                  >
                    <LogoPlate project={p} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {p.status === "active" ? "Active" : "Completed"}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-bold leading-tight">
                        {p.client}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {p.title}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isCurrent ? "text-accent" : "text-muted",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 hidden lg:block">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10">
                  <Lock className="h-3.5 w-3.5 text-accent" aria-hidden />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                  Client work · under NDA
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Previews are representative — the real UIs ship behind client
                auth. Happy to walk through the details in an interview.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Detail ── */}
        <div className="min-w-0 p-5 sm:p-6">
          {/* Keyed remount rather than AnimatePresence: `mode="wait"` gates the
              new content on the old one's exit animation finishing, so a stalled
              or interrupted transition leaves the panel showing the wrong
              mission. Correct content must never depend on an animation. */}
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Mission {String(selected + 1).padStart(2, "0")}
              </p>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-primary/15 px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-primary/25"
                >
                  Live project
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </div>

            <div className="mt-3 flex items-start gap-4">
              <LogoPlate project={project} size={52} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl font-bold leading-tight">
                    {project.client}
                  </h3>
                  <StatusPill active={project.status === "active"} />
                </div>
                <p className="text-sm font-semibold text-accent">
                  {project.title}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
              {project.summary}
            </p>

            <div className="mt-5">
              <MissionPreview project={project} />
            </div>

            {/* ── Tabs ──
                Scrollable on narrow widths so five labels never wrap or clip. */}
            <div
              role="tablist"
              aria-label="Mission detail"
              className="mt-6 flex gap-1 overflow-x-auto border-b border-[var(--border)]"
            >
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  id={`mission-tab-${t}`}
                  aria-selected={tab === t}
                  aria-controls={`mission-panel-${t}`}
                  onClick={() => setTab(t)}
                  className={cn(
                    "-mb-px whitespace-nowrap border-b-2 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                    tab === t
                      ? "border-accent text-accent"
                      : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={`mission-panel-${tab}`}
              aria-labelledby={`mission-tab-${tab}`}
              className="min-h-[92px] pt-4"
            >
              {tab === "Overview" && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    Tech stack
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {project.stack.map((s) => {
                      const icon = TECH_ICONS[s];
                      return (
                        <div
                          key={s}
                          className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-3 text-center"
                        >
                          {icon && <TechIcon name={icon} className="h-6 w-6" />}
                          <span className="text-[10px] leading-tight text-muted">
                            {s}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {tab === "Challenge" && (
                <p className="border-l-2 border-accent/60 pl-3.5 text-sm leading-relaxed text-ink/90">
                  {project.challenge}
                </p>
              )}

              {tab === "Solution" && (
                <p className="border-l-2 border-accent/60 pl-3.5 text-sm leading-relaxed text-ink/90">
                  {project.solution}
                </p>
              )}

              {tab === "Features" && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-ink/90"
                    >
                      <Zap
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {tab === "Impact" && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-ink/90">
                    {project.impact}
                  </p>
                  {metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2.5">
                      {metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--card-2)] px-3.5 py-2 font-mono text-xs font-bold text-accent"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
