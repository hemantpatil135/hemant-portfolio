import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Hemant Patil",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0C0A09",
    theme_color: "#0C0A09",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      // The mark is a circle inside generous padding, so it survives Android's
      // maskable crop without a separate composition.
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
