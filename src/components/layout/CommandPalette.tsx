"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  FileDown,
  ArrowRight,
} from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollTo = useSmoothScroll();

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: `Go to ${item.label}`,
      hint: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      action: () => scrollTo(item.href, -80),
    }));
    const actions: Command[] = [
      {
        id: "resume",
        label: "Download résumé",
        hint: "Action",
        icon: <FileDown className="h-4 w-4" />,
        action: () => window.open(profile.resumePath, "_blank"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Link",
        icon: <Github className="h-4 w-4" />,
        action: () => window.open(profile.links.github, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Link",
        icon: <Linkedin className="h-4 w-4" />,
        action: () => window.open(profile.links.linkedin, "_blank"),
      },
      {
        id: "twitter",
        label: "Open X (Twitter)",
        hint: "Link",
        icon: <Twitter className="h-4 w-4" />,
        action: () => window.open(profile.links.twitter, "_blank"),
      },
      {
        id: "instagram",
        label: "Open Instagram",
        hint: "Link",
        icon: <Instagram className="h-4 w-4" />,
        action: () => window.open(profile.links.instagram, "_blank"),
      },
      {
        id: "facebook",
        label: "Open Facebook",
        hint: "Link",
        icon: <Facebook className="h-4 w-4" />,
        action: () => window.open(profile.links.facebook, "_blank"),
      },
      {
        id: "email",
        label: "Send an email",
        hint: "Link",
        icon: <Mail className="h-4 w-4" />,
        action: () => window.open(profile.links.email, "_blank"),
      },
    ];
    return [...nav, ...actions];
  }, [scrollTo]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted option scrolled into view during keyboard nav.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (cmd: Command) => {
    cmd.action();
    onClose();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Tab") {
      // Trap focus inside the dialog — the input is the only focusable control.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-deep/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/90 shadow-soft backdrop-blur-2xl"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <Search className="h-4 w-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections and actions…"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-listbox"
                aria-autocomplete="list"
                aria-activedescendant={
                  filtered[active] ? `cmd-${filtered[active].id}` : undefined
                }
                aria-label="Search sections and actions"
                className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted">
                ESC
              </kbd>
            </div>
            <ul
              ref={listRef}
              id="command-listbox"
              role="listbox"
              aria-label="Commands"
              className="max-h-72 overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id} role="presentation">
                  <button
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={active === i}
                    data-active={active === i}
                    tabIndex={-1}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active === i ? "bg-[var(--hover-strong)] text-ink" : "text-muted hover:bg-[var(--hover)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-accent">{cmd.icon}</span>
                      {cmd.label}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted">
                      {cmd.hint}
                      {active === i && <CornerDownLeft className="h-3 w-3" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
