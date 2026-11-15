"use client";

import { projects, stats } from "@/lib/data";
import { CodeWindow } from "./CodeWindow";

/** Reads a headline number straight from `stats` so this panel can't drift from it. */
function statValue(label: string): string {
  const s = stats.find((x) => x.label === label);
  return s ? `${s.prefix ?? ""}${s.value}${s.suffix}` : "—";
}

/** Segmented meter — 14 notches, filled to `percent`. */
function Meter({ percent }: { percent: number }) {
  const filled = Math.round((percent / 100) * 14);
  return (
    <div className="flex gap-[3px]" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className={
            i < filled
              ? "h-2.5 flex-1 rounded-[2px] bg-gradient-to-b from-accent to-primary shadow-[0_0_6px_rgba(251,146,60,0.6)]"
              : "h-2.5 flex-1 rounded-[2px] bg-[var(--hover)]"
          }
        />
      ))}
    </div>
  );
}

function StatusRow({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
        <p className="font-mono text-xs font-bold text-accent">{value}</p>
      </div>
      <div className="mt-1.5">
        <Meter percent={percent} />
      </div>
    </div>
  );
}

export function MissionHeader() {
  return (
    <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.62fr)]">
      {/* ── Title + intro ── */}
      <div>
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-6 bg-accent" />
          Projects
        </p>
        <h2 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl">
          Mission <span className="text-gradient-accent">Control</span>
        </h2>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
          Real client platforms — architected, built, and shipped end-to-end.
          Explore the missions below.
        </p>
      </div>

      {/* ── Code window (hidden on small screens: decorative only) ── */}
      <div className="hidden lg:block">
        <CodeWindow className="mx-auto max-w-[320px]" />
      </div>

      {/* ── System status ── */}
      <aside className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          System status
        </p>
        <p className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-success">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          All systems operational
        </p>

        <div className="mt-5 flex flex-col gap-4 border-t border-[var(--border)] pt-4">
          <StatusRow
            label="On-time delivery"
            value={statValue("On-time Delivery")}
            percent={95}
          />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Latest mission
            </p>
            <p className="mt-1.5 font-mono text-xs font-bold text-accent">
              {(projects.find((p) => p.status === "active") ?? projects[0])?.client ?? "—"}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
