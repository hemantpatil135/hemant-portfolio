"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// The Spider-Tech hero universe is client-only and lazily loaded so it never
// blocks first paint of the hero copy.
const HeroUniverse = dynamic(() => import("@/components/three/hero/HeroUniverse"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const scrollTo = useSmoothScroll();
  // Gate on a media query, NOT `hidden xl:block`: a CSS gate still mounts the
  // scene below xl, and a display:none <img> is still fetched — phones were
  // downloading the 1.1MB character art for an invisible element, plus running
  // its pointer-parallax listener and a dozen float animations.
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      {/* Spider-Tech hero universe — floating workstation, holographic panels,
          tech orbit and cyber-city energy network. Full-bleed behind the copy
          (which stays on z-10); xl+ only so it never crowds smaller screens. */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <HeroUniverse />
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-shell relative z-10"
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2">
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        <motion.p variants={item} className="mb-3 flex items-center gap-2 text-sm text-muted">
          <MapPin className="h-4 w-4" /> {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {profile.name.split(" ")[0]}{" "}
          <span className="text-gradient">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-4 text-xl font-medium text-ink/90 sm:text-2xl md:text-3xl"
        >
          {profile.role}
        </motion.h2>

        <motion.p variants={item} className="mt-5 max-w-xl text-balance text-base text-muted sm:text-lg">
          {profile.tagline} <span className="text-ink">{profile.yearsExperience} years</span> shipping
          enterprise React for clients like American Express, Pearson & Axis Bank.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            as="a"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#projects", -80);
            }}
          >
            View Projects
          </Button>
          <Button as="a" href={profile.resumePath} download variant="outline">
            <FileDown className="h-4 w-4" /> Download Résumé
          </Button>
          <Button
            as="a"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact", -80);
            }}
            variant="outline"
          >
            <Mail className="h-4 w-4" /> Contact
          </Button>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex items-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition hover:text-accent"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition hover:text-accent"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <div className="h-px w-16 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Scroll cue — centred on the viewport at the hero's bottom edge.
          The copy column never reaches the centre line at any width, and
          HeroUniverse keeps its bottom-left corner clear for this band (see the
          canvas layout there), so it collides with neither. */}
      <motion.button
        onClick={() => scrollTo("#about", -80)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-accent"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--border-strong)] p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </span>
        <ArrowDown className="h-3 w-3" />
      </motion.button>

    </section>
  );
}
