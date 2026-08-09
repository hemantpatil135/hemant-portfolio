"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X, FileDown } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTo = useSmoothScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Track every section's visibility and highlight the most-visible one, so
    // the active link never flickers when two sections straddle the viewport.
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let best = "";
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -35% 0px" },
    );
    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => {
    scrollTo(href, -80);
    setMobileOpen(false);
  };

  // Real in-page anchors (crawlable + work without JS); intercept the click to
  // keep the Lenis smooth-scroll and fixed-header offset.
  const onNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    go(href);
  };

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      menu
        ? Array.from(
            menu.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])',
            ),
          )
        : [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[85] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-3 md:gap-4 rounded-full border px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "border-[var(--border)] bg-surface/70 shadow-soft backdrop-blur-2xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href="#hero"
            onClick={(e) => onNav(e, "#hero")}
            className="flex items-center gap-2.5 pl-1 text-left"
            aria-label="Hemant Patil, back to top"
          >
            <LogoMark size={36} />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="whitespace-nowrap text-sm font-bold tracking-tight text-ink">
                {profile.name}
              </span>
              <span className="whitespace-nowrap text-[11px] font-medium tracking-wide text-accent">
                Frontend Software Engineer
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => onNav(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block px-2.5 py-1.5 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #F97316, #FB923C)",
                          boxShadow: "0 0 8px 1px rgba(249,115,22,0.6)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommand}
              className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-muted transition hover:border-accent/40 hover:text-ink sm:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="font-mono">⌘K</span>
            </button>
            <a
              href={profile.resumePath}
              download
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-medium text-white shadow-glow transition hover:-translate-y-0.5 md:flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              Résumé
            </a>
            <button
              ref={toggleRef}
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[84] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-deep/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative mx-4 mt-24 flex flex-col gap-1 rounded-3xl border border-[var(--border)] bg-surface/90 p-4 shadow-soft"
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => onNav(e, item.href)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-base text-ink transition hover:bg-[var(--hover)]"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <a
                href={profile.resumePath}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-medium text-white"
              >
                <FileDown className="h-4 w-4" />
                Download Résumé
              </a>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
