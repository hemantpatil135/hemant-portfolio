"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { CommandPalette } from "./CommandPalette";
import { BackToTop } from "./BackToTop";

/** Holds shared UI state (command palette) and renders global chrome. */
export function SiteChrome() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <BackToTop />
    </>
  );
}
