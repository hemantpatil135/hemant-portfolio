"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  magnetic?: boolean;
  as?: "button" | "a";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

// This transition IS the magnetic easing — useMagnetic only writes the target
// transform, so `transform` must stay in the list. The overshoot curve gives the
// elastic settle the motion reference calls for on this interaction.
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform focus-visible:outline-accent disabled:opacity-50";

const variants: Record<Variant, string> = {
  // No hover:-translate here — useMagnetic owns this element's transform and
  // folds the hover lift into its spring (a class would be overridden anyway).
  primary:
    "bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:shadow-glow-accent",
  outline:
    "border border-[var(--border-strong)] bg-[var(--card)] text-ink backdrop-blur-xl hover:border-accent/50 hover:shadow-glow-accent",
  ghost: "text-muted hover:text-ink",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", magnetic = true, className, children, as = "button", ...props },
  forwardedRef,
) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement & HTMLAnchorElement>(
    magnetic ? 0.25 : 0,
  );

  // Attach both the internal magnetic ref and any ref the consumer forwarded.
  const setRef = (node: (HTMLButtonElement & HTMLAnchorElement) | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
        </span>
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (as === "a") {
    return (
      <a
        ref={setRef}
        className={classes}
        onMouseMove={magnetic ? onMouseMove : undefined}
        onMouseLeave={magnetic ? onMouseLeave : undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={setRef}
      className={classes}
      onMouseMove={magnetic ? onMouseMove : undefined}
      onMouseLeave={magnetic ? onMouseLeave : undefined}
      {...props}
    >
      {content}
    </button>
  );
});
