# Hemant Patil — 3D Developer Portfolio

A premium, interactive 3D portfolio for **Hemant Patil**, Frontend Software Engineer. Built with Next.js 15, React 19, React Three Fiber, Framer Motion and Tailwind CSS. Every piece of content is sourced from the résumé — nothing is invented.

![Hemant Patil Portfolio](public/favicon.svg)

---

## ✨ Highlights

- **Interactive 3D hero** — a morphing crystal, orbiting nodes, a pointer-tracking light and a particle starfield (React Three Fiber + drei).
- **Skill Galaxy** — every skill floats in an orbitable 3D space; click a node to reveal how it was used.
- **Cinematic motion** — Lenis smooth scroll, Framer Motion reveals, magnetic buttons, animated counters, custom cursor, scroll progress, page preloader.
- **Command palette** (`⌘K` / `Ctrl+K`) for instant navigation and actions.
- **Dark / light theme**, back-to-top, animated project modals, accessible contact form.
- **Production-grade SEO** — dynamic Open Graph image, JSON-LD Person schema, sitemap, robots, web manifest.
- **Accessible & responsive** — semantic HTML, keyboard navigation, focus rings, `prefers-reduced-motion` support, mobile → desktop layouts.

---

## 🧱 Tech Stack

| Area | Tools |
| ---- | ----- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| 3D | React Three Fiber v9, Drei v10, Three.js |
| Animation | Framer Motion, GSAP, Lenis (smooth scroll) |
| Styling | Tailwind CSS, custom design tokens |
| Icons | Lucide React |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg                 # Glassy gradient crystal mark
│   ├── logos/                      # Client brand logos (project cards)
│   └── Hemant_Patil_Resume.pdf     # Downloadable résumé
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, metadata, JSON-LD
│   │   ├── page.tsx                # Home — composes all sections
│   │   ├── globals.css             # Tailwind layers, theme, utilities
│   │   ├── not-found.tsx           # Animated 404
│   │   ├── opengraph-image.tsx     # Dynamic OG image (edge)
│   │   ├── robots.ts               # robots.txt
│   │   ├── sitemap.ts              # sitemap.xml
│   │   └── manifest.ts             # PWA web manifest
│   ├── components/
│   │   ├── providers/              # Theme + Lenis smooth-scroll providers
│   │   ├── layout/                 # Navbar, Footer, CommandPalette, Cursor,
│   │   │                           # Preloader, ScrollProgress, BackToTop,
│   │   │                           # ThemeToggle, AuroraBackground, SiteChrome
│   │   ├── sections/               # Hero, About, TechStack, Experience,
│   │   │                           # Projects, SkillsGalaxy, Statistics,
│   │   │                           # Education, Contact
│   │   ├── three/                  # HeroScene, SkillGalaxy, Particles (R3F)
│   │   └── ui/                     # Button, Badge, Reveal, TiltCard,
│   │                               # SectionHeading, TechIcon
│   ├── hooks/                      # useSmoothScroll, useMediaQuery, useMagnetic
│   ├── lib/
│   │   ├── data.ts                 # 🔑 Single source of truth (résumé content)
│   │   ├── theme.ts                # Color tokens + site config
│   │   └── utils.ts                # cn(), clamp(), mapRange()
│   └── types/                      # Global type declarations
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

> **Edit content in one place:** [`src/lib/data.ts`](src/lib/data.ts). Components never hardcode résumé text.

---

## 🚀 Getting Started

**Requirements:** Node.js ≥ 18.18

```bash
# 1. Install dependencies
npm install

# 2. (optional) configure environment
cp .env.example .env.local
#   NEXT_PUBLIC_SITE_URL        — your production URL (SEO/OG/sitemap)
#   NEXT_PUBLIC_CONTACT_ENDPOINT — Formspree/API endpoint for the contact form
#                                  (falls back to a mailto: link if unset)

# 3. Run the dev server
npm run dev          # http://localhost:3000

# 4. Production build
npm run build         # builds to .next (what Vercel and `next start` expect)
npm run start

# Building while `npm run dev` is running? Use the isolated pair instead —
# it writes to .next-prod so it can't clobber the dev server's .next.
npm run build:local
npm run start:local

# Quality gates
npm run lint
npm run typecheck
```

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. Import the project at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js (no config needed).
3. Add environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` (optional)
4. Deploy. Every push to `main` ships automatically.

Or via CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

---

## 🖇️ Wiring up the contact form

Without configuration the form opens the visitor's mail client (pre-filled). To collect submissions instead, create a free [Formspree](https://formspree.io) form and set:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

The form POSTs `{ name, email, message }` as JSON and shows loading / success / error states.

---

## ⚡ Performance Optimizations

- **Code-splitting:** 3D scenes are `dynamic()`-imported with `ssr: false` — they never block first paint (main route ≈ 173 kB First Load JS; Three.js lives in its own async chunk).
- **Font optimization:** `next/font` self-hosts Inter, Geist & Geist Mono with `display: swap`.
- **`optimizePackageImports`** for `lucide-react` and `framer-motion` (tree-shaken).
- **GPU-friendly effects:** aurora/particles use transforms & blurs; `dpr={[1, 2]}` caps device pixel ratio on the canvas.
- **Reduced motion:** Lenis, the custom cursor and tilt/magnetic effects all disable under `prefers-reduced-motion`.
- **Static generation:** every route is statically prerendered except the edge-rendered OG image.

---

## ♿ Accessibility

- Semantic landmarks, skip-to-content link, labelled controls and `aria-*` on interactive UI.
- Full keyboard support: nav, command palette (`⌘K`, arrows, `Enter`, `Esc`), modals (`Esc` + focus lock via scroll lock).
- Visible focus rings, respect for reduced-motion, and 4.5:1-minded contrast on the dark theme.

---

## 🔮 Future Improvements

- Add a lightweight CMS (or MDX) layer so content edits don't require a redeploy.
- Real project screenshots / short screen-capture loops in the modals.
- Postprocessing bloom on the 3D scenes (guarded behind a perf check).
- Playwright + axe-core for automated visual & a11y regression tests.
- Blog / writing section with RSS.

---

## 📇 Contact

- **Email:** patilhemantsing@gmail.com
- **LinkedIn:** [linkedin.com/in/hemant-patil](https://linkedin.com/in/hemantpatil333)
- **GitHub:** [github.com/hemant-patil](https://github.com/hemantpatil135)

---
