"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useTravel } from "@/lib/travel";

/**
 * Phase 1b — the Spider-Tech "hero universe".
 *
 * A layered DOM/canvas composition (not a WebGL character scene): a floating
 * anti-gravity platform + live-coding MacBook, orbited by glassmorphic
 * holographic panels and neon tech artifacts, wired together by an orange
 * energy network over the cyber-city backdrop. Everything parallaxes to the
 * pointer and idle-floats. Real DOM keeps the UI text crisp; canvas + CSS keep
 * it 60fps. Designed for xl+ (gated by the parent) so it never crowds the copy.
 */

// ── Pointer parallax ──────────────────────────────────────────────
function usePointer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 });
  const ny = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });
  useEffect(() => {
    const h = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 2);
      y.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", h, { passive: true });
    return () => window.removeEventListener("pointermove", h);
  }, [x, y]);
  return { nx, ny };
}

/**
 * Positions an element by its TOP-LEFT in scene-space pixels (see SCENE_W/H),
 * parallax by depth + idle float.
 *
 * Scene space is a fixed design canvas, so the composition is laid out once and
 * every element keeps its clearance at every viewport — the canvas as a whole is
 * what scales. Parallax travel is capped at depth * 14px and float at ~14px, so
 * the ≥35px gaps built into the layout below survive the motion.
 *
 * NOTE: framer writes `transform` inline for x/y, so a Tailwind `-translate-*`
 * class here would be silently overridden — hence top-left, not centre.
 */
function Layer({
  nx,
  ny,
  cx,
  cy,
  depth,
  float = 10,
  delay = 0,
  dur = 7,
  z = 10,
  className,
  children,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  cx: number;
  cy: number;
  depth: number;
  float?: number;
  delay?: number;
  dur?: number;
  z?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const tx = useTransform(nx, (v) => v * depth * 14);
  const ty = useTransform(ny, (v) => v * depth * 14);
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ left: cx, top: cy, x: tx, y: ty, zIndex: z }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -float, 0] }}
        transition={reduced ? undefined : { duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ── Glass holographic panel chrome ────────────────────────────────
function Panel({
  title,
  accentDot = "#FB923C",
  width,
  children,
}: {
  title: string;
  accentDot?: string;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ width }}
      className="overflow-hidden rounded-xl border border-primary/20 bg-[#0e0b09]/85 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),0_0_30px_-12px_rgba(249,115,22,0.4)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentDot }} />
        <span className="text-[11px] font-medium text-white/80">{title}</span>
        <span className="ml-auto text-white/25">×</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const line = "font-mono text-[10.5px] leading-[1.7]";

// Mini inline chart used by a few panels.
function Spark({ w = 200, h = 44 }: { w?: number; h?: number }) {
  const pts = [30, 26, 34, 28, 40, 36, 48, 44, 56, 52, 66, 60];
  const max = 72;
  const step = w / (pts.length - 1);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${(h - (p / max) * h).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="url(#sp)" />
      <path d={d} fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Panel bodies ──────────────────────────────────────────────────
function VSCode() {
  return (
    <div className={cn(line, "text-white/80")}>
      <div className="text-white/30">{"// Building better experiences"}</div>
      <div><span className="text-primary">const</span> Dashboard = () =&gt; {"{"}</div>
      <div className="pl-3"><span className="text-primary">const</span> {"{ data }"} = useDashboard();</div>
      <div className="pl-3"><span className="text-primary">return</span> (</div>
      <div className="pl-6 text-[#FB7185]">&lt;div className=<span className="text-[#FDBA74]">&quot;grid&quot;</span>&gt;</div>
      <div className="pl-9 text-[#FDBA74]">&lt;StatsGrid data={"{data}"} /&gt;</div>
      <div className="pl-9 text-[#FDBA74]">&lt;RevenueChart /&gt;</div>
      <div className="pl-6 text-[#FB7185]">&lt;/div&gt;</div>
      <div className="pl-3">);</div>
      <div>{"}"};</div>
    </div>
  );
}

function Analytics() {
  // Real, résumé-derived impact figures — no invented business metrics.
  const stats = [
    ["Load time", "−40%", "faster"],
    ["API calls", "−55%", "fewer"],
    ["User roles", "7", "shipped"],
    ["Delivery", "95%", "on-time"],
  ];
  return (
    <div>
      <div className="mb-2 grid grid-cols-4 gap-2">
        {stats.map(([l, v, d]) => (
          <div key={l} className="rounded-md border border-white/5 bg-white/[0.02] p-1.5">
            <div className="text-[9px] text-white/55">{l}</div>
            <div className="text-[13px] font-bold text-white">{v}</div>
            <div className="text-[9px] font-semibold text-success">{d}</div>
          </div>
        ))}
      </div>
      <Spark w={280} h={56} />
    </div>
  );
}

function Terminal() {
  return (
    <div className={cn(line, "text-white/75")}>
      <div><span className="text-success">$</span> npm run dev</div>
      <div className="text-white/40">▲ ready in 1.2s</div>
      <div><span className="text-accent">localhost:3000</span></div>
      <div className="text-success">✓ compiled</div>
      <div className="text-white/40">○ building…</div>
      <div><span className="text-success">✓</span> 60 fps</div>
    </div>
  );
}

function GitHubActivity() {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-lg font-bold text-white">16</span>
        <span className="text-[10px] text-white/55">technologies</span>
      </div>
      <div className="grid grid-cols-[repeat(14,1fr)] gap-[3px]">
        {Array.from({ length: 42 }).map((_, i) => {
          const lvl = (i * 37) % 4;
          const bg = ["rgba(255,255,255,0.06)", "rgba(249,115,22,0.35)", "rgba(249,115,22,0.6)", "#FB923C"][lvl];
          return <span key={i} className="aspect-square rounded-[2px]" style={{ background: bg }} />;
        })}
      </div>
    </div>
  );
}

function APIRequests() {
  return (
    <div>
      <div className="mb-2 flex gap-2">
        {[["10+", "Features"], ["8+", "Modules"], ["7", "Roles"]].map(([v, l]) => (
          <div key={l} className="flex-1 rounded-md border border-white/5 bg-white/[0.02] p-1.5">
            <div className="text-[12px] font-bold text-white">{v}</div>
            <div className="text-[9px] text-white/55">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Spark w={140} h={44} />
        <div className="relative h-11 w-11 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#FB923C" strokeWidth="5" strokeDasharray="94 94" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-white">75%</span>
        </div>
      </div>
    </div>
  );
}

// ── Tech chip (glass artifact) ────────────────────────────────────
function BrandIcon({ id }: { id: string }) {
  const c = { className: "h-7 w-7", viewBox: "0 0 24 24", fill: "none" } as const;
  switch (id) {
    case "react":
      return (
        <svg {...c} stroke="#FB923C" strokeWidth={1.3}>
          <circle cx="12" cy="12" r="1.8" fill="#FB923C" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...c} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#FB923C" opacity="0.18" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FDBA74" fontFamily="sans-serif">TS</text>
        </svg>
      );
    case "redux":
      return (
        <svg {...c} stroke="#FB923C" strokeWidth={1.4} strokeLinecap="round">
          <path d="M8.6 15.2c-2.1-1-3.4-2.6-3.4-4.6C5.2 8 7.3 6.4 10 6.4" />
          <path d="M14 7.7c2.2.6 3.8 2.2 3.8 4.3 0 2.3-2.1 3.9-4.9 3.9" />
          <path d="M11.8 18.6c-2.1 0-3.9-.9-4.8-2.3" />
          <circle cx="15" cy="6.9" r="1.6" fill="#FB923C" stroke="none" />
          <circle cx="6.4" cy="15.8" r="1.6" fill="#FB923C" stroke="none" />
          <circle cx="12" cy="18.8" r="1.6" fill="#FB923C" stroke="none" />
        </svg>
      );
    case "tailwind":
      return (
        <svg {...c} fill="#FB923C">
          <path d="M12 6.2c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.75.2 1.28.73 1.87 1.33C13.33 11 14.45 12 16.5 12c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.75-.2-1.28-.73-1.87-1.33C15.17 7.2 14.05 6.2 12 6.2z" />
          <path d="M6.5 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.75.2 1.28.73 1.87 1.33C7.83 16.8 8.95 17.8 11 17.8c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.75-.2-1.28-.73-1.87-1.33C9.67 13 8.55 12 6.5 12z" />
        </svg>
      );
    case "javascript":
      return (
        <svg {...c} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#FB923C" opacity="0.18" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FDBA74" fontFamily="sans-serif">JS</text>
        </svg>
      );
    case "github":
      return (
        <svg {...c} fill="#FDBA74">
          <path d="M12 .8C5.6.8.5 5.9.5 12.3c0 5.1 3.3 9.4 7.9 11 .6.1.8-.25.8-.56v-2c-3.2.7-3.9-1.36-3.9-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.81.55 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.9 18.4.8 12 .8z" />
        </svg>
      );
    default:
      return null;
  }
}

function TechChip({ id, label }: { id: string; label: string }) {
  return (
    <div className="group relative flex flex-col items-center gap-1.5" data-cursor="hover">
      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/25 bg-[#141010]/80 shadow-[0_0_24px_-6px_rgba(249,115,22,0.5)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(120%_90%_at_30%_15%,rgba(255,255,255,0.12),transparent_55%)]" />
        <BrandIcon id={id} />
      </div>
      <span className="text-[10px] font-medium text-white/60">{label}</span>
    </div>
  );
}

// ── The Spider-Tech engineer on the anti-gravity platform ─────────
// The figure sits right-of-centre inside the transparent frame, so the glow is
// biased right to sit under the platform.
function Character() {
  // The figure occupies the right ~56% / lower ~77% of the transparent frame,
  // so we crop to that content box (via an oversized, offset image) to make the
  // figure itself the centred focal element.
  const BOX_W = 500;
  const BOX_H = 470;
  // Rendered width of the uncropped art. The source is 2448×1632 (3:2), so a
  // plain <img> shipped 2.6x more pixels than it painted, as raw PNG. next/image
  // serves it AVIF/WebP at this size instead — same crop, a fraction of the bytes.
  const IMG_W = 940;
  const IMG_H = Math.round((IMG_W * 1632) / 2448);
  return (
    <div className="relative" style={{ width: BOX_W }}>
      {/* Platform under-glow */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-24 w-64 -translate-x-1/2 rounded-[50%] bg-primary/45 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-40 -translate-x-1/2 rounded-[50%] bg-accent/45 blur-xl" />
      <div style={{ width: BOX_W, height: BOX_H, overflow: "hidden" }} className="relative">
        <Image
          src="/hero-character.png"
          alt="Spider-Tech engineer coding on a floating anti-gravity platform"
          width={IMG_W}
          height={IMG_H}
          sizes={`${IMG_W}px`}
          priority
          draggable={false}
          style={{ width: IMG_W, maxWidth: "none", marginLeft: -378, marginTop: -122 }}
          className="select-none drop-shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}

/**
 * Fixed design canvas. Every box below is authored against these dimensions with
 * ≥25px clearance, so the composition never self-collides; only the canvas
 * scales between breakpoints.
 *
 * The character carves the canvas into the four gutters the panels live in: top
 * strip, left column, right column, bottom strip.
 *
 * `h` is each panel's rendered height AT THE LARGEST ROOT FONT SIZE (the 21px TV
 * bump in globals.css — panel padding is rem-based, so the boxes grow ~20% there
 * while their pixel `width` does not). Laying out against the worst case means
 * every gap can only widen at smaller root sizes, never close.
 */
const SCENE_W = 1010;
const SCENE_H = 890;
const CHAR = { x: 255, y: 290, w: 500, h: 470 };

/** Push the canvas below the floating navbar — mirrors the hero's own pt-28.
 *  Applied pre-scale, but the canvas scales about its centre, so the clearance
 *  holds at every breakpoint. */
const NAV_CLEARANCE = 36;

/**
 * The left column deliberately stops by y≈715. The hero's scroll cue is centred
 * on the viewport, and near 1920px — where the canvas is widest relative to the
 * screen — that centre line lands around x 20–80 / y 840+ in canvas space, which
 * is inside this column's x range. Ending the column high leaves that corner
 * empty at every width rather than clipping the cue.
 */
const CHIPS = [
  // top strip
  { id: "typescript", label: "TypeScript", cx: 120, cy: 20 },
  { id: "react", label: "React", cx: 600, cy: 30 },
  { id: "javascript", label: "JavaScript", cx: 800, cy: 55 },
  // right column
  { id: "tailwind", label: "Tailwind CSS", cx: 810, cy: 660 },
  // bottom strip
  { id: "redux", label: "Redux Toolkit", cx: 300, cy: 785 },
  { id: "github", label: "GitHub", cx: 480, cy: 790 },
];

const PANELS = [
  { title: "Impact Overview", width: 280, h: 231, cx: 260, cy: 20, depth: 0.9, dur: 9, delay: 0.5, Body: Analytics },
  { title: "VS Code", width: 230, h: 301, cx: 0, cy: 170, depth: 1.4, dur: 8, delay: 0, Body: VSCode },
  { title: "Shipped", width: 220, h: 205, cx: 0, cy: 510, depth: 1.1, dur: 9.5, delay: 0.8, Body: APIRequests },
  { title: "Terminal", width: 175, h: 194, cx: 800, cy: 200, depth: 1.6, dur: 7.5, delay: 1, Body: Terminal },
  { title: "GitHub Activity", width: 190, h: 165, cx: 800, cy: 440, depth: 1.2, dur: 8.5, delay: 0.3, Body: GitHubActivity },
];

export default function HeroUniverse() {
  const { nx, ny } = usePointer();
  const travel = useTravel();

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        // Lean the whole scene into the cable pull, then settle.
        transform: travel.traveling
          ? `perspective(1400px) rotateX(${travel.dir * 1.4}deg) scale(1.025)`
          : "perspective(1400px) rotateX(0deg) scale(1)",
        transformOrigin: "center 40%",
        transition: `transform ${travel.traveling ? 0.45 : 0.9}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Cyber-city energy network now renders once as a global backdrop
          (see app/page.tsx) so it sits behind every section, not just the hero. */}

      {/* The scene is a fixed design canvas pinned to the viewport's right edge
          (full-bleed, outside the copy's shell) and scaled as one piece per
          breakpoint — so panels never drift into each other or into the copy. */}
      <div
        className="absolute right-0 top-1/2 origin-right scale-[0.6] 2xl:scale-[0.78] 3xl:scale-100 4xl:scale-[1.2]"
        style={{ width: SCENE_W, height: SCENE_H, marginTop: -SCENE_H / 2 + NAV_CLEARANCE }}
      >
        {/* Energy connectors from the platform to each panel */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
          style={{ zIndex: 5 }}
        >
          {PANELS.map((p) => (
            <line
              key={p.title}
              x1={CHAR.x + CHAR.w / 2}
              y1={CHAR.y + CHAR.h / 2}
              x2={p.cx + p.width / 2}
              y2={p.cy + p.h / 2}
              stroke="rgba(249,115,22,0.18)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          ))}
        </svg>

        {/* Holographic panels */}
        {PANELS.map(({ title, width, cx, cy, depth, dur, delay, Body }) => (
          <Layer key={title} nx={nx} ny={ny} cx={cx} cy={cy} depth={depth} dur={dur} delay={delay} z={12}>
            <Panel title={title} width={width}><Body /></Panel>
          </Layer>
        ))}

        {/* Tech chips */}
        {CHIPS.map((chip, i) => (
          <Layer key={chip.id} nx={nx} ny={ny} cx={chip.cx} cy={chip.cy} depth={1.5} float={12} dur={6 + i * 0.4} delay={i * 0.3} z={14}>
            <TechChip id={chip.id} label={chip.label} />
          </Layer>
        ))}

        {/* The engineer on the anti-gravity platform (focal point) */}
        <Layer nx={nx} ny={ny} cx={CHAR.x} cy={CHAR.y} depth={0.5} float={14} dur={6.5} z={13}>
          <Character />
        </Layer>
      </div>
    </div>
  );
}
