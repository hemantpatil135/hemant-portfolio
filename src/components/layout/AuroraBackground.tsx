/**
 * Deep-space backdrop: starfield + a soft moonlight glow + gentle aurora blooms.
 * Pure CSS, GPU-friendly, and calmer than neon (soft blurs, low opacity).
 *
 * `fixed` pins it to the viewport so a single instance can sit behind the whole
 * page — the same atmosphere on every section, painted once. Left `absolute`
 * (the default) it fills its positioned parent instead.
 */
export function AuroraBackground({
  withGrid = true,
  moonlight = false,
  fixed = false,
}: {
  withGrid?: boolean;
  moonlight?: boolean;
  fixed?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none -z-10 overflow-hidden bg-deep ${
        fixed ? "fixed inset-0" : "absolute inset-0"
      }`}
    >
      {/* Subtle grid */}
      {withGrid && <div className="absolute inset-0 bg-grid bg-grid opacity-[0.35] mask-fade-b" />}

      {/* Starfield (two layers at different scales for depth) */}
      <div className="starfield absolute inset-0 opacity-70" />
      <div className="starfield absolute inset-0 scale-150 opacity-40 animate-pulse-glow" />

      {/* Soft moonlight glow behind the hero */}
      {moonlight && (
        <div className="absolute left-1/2 top-[-8rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,237,213,0.16)_0%,rgba(251,146,60,0.08)_40%,transparent_70%)] blur-2xl" />
      )}

      {/* Gentle aurora blooms — soft, low opacity */}
      <div className="absolute -left-1/4 top-[5%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-primary/[0.12] blur-[130px]" />
      <div className="absolute right-[-12%] top-[8%] h-[34rem] w-[34rem] animate-aurora rounded-full bg-accent/[0.10] blur-[130px] [animation-delay:-4s]" />
      <div className="absolute bottom-[-18%] left-1/3 h-[36rem] w-[36rem] animate-aurora rounded-full bg-purple/[0.08] blur-[140px] [animation-delay:-8s]" />

      {/* Vignette to keep edges deep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(var(--bg-rgb))_100%)]" />
    </div>
  );
}
