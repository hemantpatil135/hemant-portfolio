"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Handwritten-style signature.
 *
 * The name is set in a script face (Snell Roundhand / Savoye on macOS, Segoe
 * Script on Windows, generic cursive elsewhere) so it reads as a real signature,
 * with a flourish underline that draws itself in when scrolled into view.
 */
export function Signature({
  name = "Hemant Patil",
  className,
}: {
  name?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-flex select-none flex-col items-end", className)}>
      <span
        className="text-4xl leading-none text-accent sm:text-5xl"
        style={{
          fontFamily:
            '"Snell Roundhand", "Savoye LET", "Segoe Script", "Brush Script MT", cursive',
          transform: "rotate(-4deg)",
        }}
      >
        {name}
      </span>
      <motion.svg
        viewBox="0 0 200 18"
        className="-mt-1 h-3 w-44 text-accent/70"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M2 11 C 46 3, 96 3, 138 8 S 190 13, 198 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.svg>
    </div>
  );
}
