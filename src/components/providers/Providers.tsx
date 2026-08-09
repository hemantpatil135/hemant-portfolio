"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* reducedMotion="user" makes every Framer Motion component honor the OS
          setting — transform/layout animations are dropped, opacity/color kept.
          Pairs with the global CSS reduced-motion rule that covers CSS animations. */}
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
