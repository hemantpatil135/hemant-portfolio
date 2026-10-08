# Hemant Patil — Portfolio

Personal portfolio of **Hemant Patil**, Senior Frontend Engineer (React.js · TypeScript · Next.js). Built with Next.js 15, React 19, TypeScript, Tailwind CSS, React Three Fiber and Framer Motion, and deployed on Vercel. Every piece of content is sourced from the résumé — nothing is invented.

**Live:** [hemantpatil.vercel.app](https://hemantpatil.vercel.app)

![Hemant Patil Portfolio](public/favicon.svg)

---

## ✨ Highlights

- **Interactive 3D hero** — a floating workstation scene with holographic panels and an animated energy network (desktop only, lazy-loaded).
- **Tech-stack orbit** — an orbitable 3D solar system of the core stack; select a planet to see where each tool was used, plus a grouped "Full skill set" grid.
- **Impact in numbers** — résumé-backed metrics (approximate figures keep their `~`).
- **Experience timeline** — current role as a hero card, completed roles with expandable highlights and a promotion track for in-company progression.
- **Projects ("Mission Control")** — client work under NDA shown as representative previews with Overview / Challenge / Solution / Features / Impact tabs.
- **Cinematic motion** — Lenis smooth scroll, Framer Motion reveals, custom cursor, scroll progress, preloader; all respect `prefers-reduced-motion`.
- **Command palette** (`⌘K` / `Ctrl+K`) for navigation and quick links.
- **SEO** — dynamic Open Graph image, JSON-LD (`ProfilePage` + `Person`), canonical URL, sitemap, robots, web manifest.

---

## 🧱 Tech Stack

| Area      | Tools                                             |
| --------- | ------------------------------------------------- |
| Framework | Next.js 15 (App Router), React 19, TypeScript     |
| 3D        | React Three Fiber v9, Drei v10, Three.js          |
| Animation | Framer Motion, GSAP, Lenis (smooth scroll)        |
| Styling   | Tailwind CSS, custom design tokens (dark theme)   |
| Icons     | Lucide React                                      |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg                 # Logo mark
│   ├── logos/                      # Client / employer brand logos
│   └── Hemant_Patil_Resume.pdf     # Downloadable résumé
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, metadata, JSON-LD
│   │   ├── page.tsx                # Home — composes all sections
│   │   ├── globals.css             # Tailwind layers, theme, utilities
│   │   ├── api/contact/route.ts    # Contact form → email (Resend)
│   │   ├── copyright/, privacy/    # Legal pages
│   │   ├── not-found.tsx           # 404
│   │   ├── opengraph-image.tsx     # Dynamic OG image (edge)
│   │   ├── robots.ts, sitemap.ts   # robots.txt, sitemap.xml
│   │   └── manifest.ts             # Web manifest
│   ├── components/
│   │   ├── providers/              # Theme + Lenis smooth-scroll providers
│   │   ├── layout/                 # Navbar, Footer, CommandPalette, Cursor,
│   │   │                           # Preloader, ScrollProgress, BackToTop,
│   │   │                           # AuroraBackground, SiteChrome
│   │   ├── sections/               # Hero, About, TechStack, Experience,
│   │   │                           # Projects, Education, Contact
│   │   ├── three/                  # hero/ (HeroUniverse, CyberCity),
│   │   │                           # stack/ (StackOrbit)
│   │   └── ui/                     # Button, Badge, Reveal, SectionHeading,
│   │                               # Signature, TechIcon
│   ├── hooks/                      # useSmoothScroll, useMediaQuery, useMagnetic
│   ├── lib/
│   │   ├── data.ts                 # 🔑 Single source of truth (résumé content)
│   │   ├── theme.ts                # Color tokens + site/SEO config
│   │   └── utils.ts                # cn() and helpers
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

# 2. (optional) configure environment — see .env.example
cp .env.example .env.local

# 3. Run the dev server
npm run dev          # http://localhost:3000

# 4. Production build
npm run build        # builds to .next (what Vercel and `next start` expect)
npm run start

# Building while `npm run dev` is running? Use the isolated pair instead —
# it writes to .next-prod so it can't clobber the dev server's .next.
npm run build:local
npm run start:local

# Quality gates
npm run lint
npm run typecheck
```

### Environment variables

| Variable                           | Purpose                                                        |
| ---------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | Production origin for canonical, OG, sitemap and JSON-LD       |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form delivery via Web3Forms (option A)                 |
| `RESEND_API_KEY` / `CONTACT_FROM`  | Contact form delivery via Resend (option B)                    |
| `GOOGLE_SITE_VERIFICATION`         | Google Search Console verification token                       |

Without a contact key, the form shows a "reach me directly" message (email + WhatsApp).

---

## ☁️ Deploy to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
2. Add environment variables under **Settings → Environment Variables**, at minimum:
   - `NEXT_PUBLIC_SITE_URL` = `https://hemantpatil.vercel.app`
3. Deploy. Every push to `main` ships automatically.

---

## ⚡ Performance

- **Code-splitting:** 3D scenes are `dynamic()`-imported with `ssr: false`; the stack orbit only loads as its section approaches the viewport, and the hero scene only mounts on desktop.
- **Font optimization:** `next/font` self-hosts Inter, Geist & Geist Mono with `display: swap`.
- **Render loops pause off-screen** via `IntersectionObserver`.
- **Reduced motion:** smooth scroll, cursor and decorative animation disable under `prefers-reduced-motion`.
- **Static generation:** every page is prerendered except the edge-rendered OG image and the contact API.

---

## ♿ Accessibility

- Semantic landmarks, skip-to-content link, labelled controls and `aria-*` on interactive UI (tabs, expandable highlights, command palette).
- Keyboard support across navigation and the command palette (`⌘K`, arrows, `Enter`, `Esc`).
- Visible focus rings and alt text on all images.

---

## 📇 Contact

- **Email:** [patilhemantsing@gmail.com](mailto:patilhemantsing@gmail.com)
- **LinkedIn:** [linkedin.com/in/hemantpatil135](https://linkedin.com/in/hemantpatil135)
- **GitHub:** [github.com/hemantpatil135](https://github.com/hemantpatil135)
- **Portfolio:** [hemantpatil.vercel.app](https://hemantpatil.vercel.app)
