"use client";

import { Github, Linkedin, Mail, Twitter, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { profile, navItems } from "@/lib/data";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const scrollTo = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] py-16">
      <div className="section-shell grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 text-lg font-bold"
            aria-label="Hemant Patil, back to top"
          >
            <LogoMark size={36} />
            {profile.name}
          </button>
          <p className="mt-4 max-w-sm text-sm text-muted">
            {profile.role} — {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: profile.links.github, icon: Github, label: "GitHub" },
              { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.links.twitter, icon: Twitter, label: "X (Twitter)" },
              { href: profile.links.instagram, icon: Instagram, label: "Instagram" },
              { href: profile.links.facebook, icon: Facebook, label: "Facebook" },
              { href: profile.links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-muted transition hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Navigate</h3>
          <ul className="space-y-2 text-sm">
            {navItems.slice(0, 5).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href, -80);
                  }}
                  className="-my-1 inline-block py-1 text-muted transition hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={profile.links.email} className="group -my-1 inline-flex items-center gap-1 py-1 text-muted transition hover:text-ink">
                {profile.email}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </a>
            </li>
            <li className="text-muted">{profile.location}</li>
            <li className="text-muted">{profile.phone}</li>
          </ul>
        </div>
      </div>

      <div className="section-shell mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-muted sm:flex-row">
        <p>© {year} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
