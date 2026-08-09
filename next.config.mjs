/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep `next build` output in its own dir so a production build can never
  // clobber the running dev server's `.next` (the cause of the CSS 404 /
  // unstyled-page bug). Overridden per-command via NEXT_DIST_DIR in the scripts.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // No remotePatterns on purpose: every image is local (/logos, /hero-character).
    // A wildcard host would let anyone resize arbitrary remote images through
    // this domain's /_next/image endpoint, on this project's optimization quota.
  },
  // three.js ships untranspiled ESM in a few sub-paths; transpile to be safe across bundlers.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
