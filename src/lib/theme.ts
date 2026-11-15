/**
 * Central color tokens — mirrors tailwind.config.ts for use in JS/Three.js.
 * Theme: "Solar" — orange primary, light-orange accent, warm-rose emphasis.
 */
export const colors = {
  base: "#0C0A09",
  surface: "#181411",
  primary: "#F97316", // orange — brand
  accent: "#FB923C", // light orange — highlights/glow
  purple: "#FB7185", // warm rose (emphasis, used sparingly)
  success: "#10B981", // emerald
  star: "#FFE9D6", // warm starlight
  ink: "#F5F0EB",
  muted: "#A89E94",
} as const;

/**
 * Canonical origin, in order of trust.
 *
 * NEVER hardcode a fallback to a domain we don't own. The previous default was
 * `https://hemant-patil.vercel.app`, which is a live site belonging to a
 * DIFFERENT Hemant Patil. Any deploy missing NEXT_PUBLIC_SITE_URL would have
 * pointed canonical, sitemap, robots and every JSON-LD @id at his domain —
 * telling Google he is the canonical version of this page, and handing him the
 * ranking signals for the exact name query this site is trying to win.
 *
 * Vercel injects the real deployment host, so the fallback resolves to *this*
 * deployment instead. Localhost is the last resort for local dev.
 */
const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.NEXT_PUBLIC_VERCEL_URL;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const siteConfig = {
  name: "Hemant Patil",
  title: "Hemant Patil — Software Engineer | React.js, TypeScript & Next.js",
  description:
    "Hemant Patil is a frontend-focused Software Engineer building enterprise React.js, TypeScript and Next.js applications — frontend architecture, performance and delivery for American Express, Pearson, Axis Bank and YES Securities.",
  url: siteUrl,
  keywords: [
    "Hemant Patil",
    "Software Engineer",
    "Frontend Engineer",
    "React.js",
    "TypeScript",
    "Next.js",
    "Frontend Architecture",
    "Web Performance",
    "Pune",
    "India",
  ],
} as const;
