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

export const siteConfig = {
  name: "Hemant Patil",
  title: "Hemant Patil — Software Engineer",
  description:
    "Premium interactive portfolio of Hemant Patil, a Frontend Software Engineer with 4.5+ years building scalable enterprise React & TypeScript applications for clients like American Express, Pearson, and Axis Bank.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hemant-patil.vercel.app",
  keywords: [
    "Hemant Patil",
    "Frontend Engineer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Redux Toolkit",
    "Frontend Software Engineer",
    "React portfolio",
    "Surat",
    "India",
  ],
} as const;
