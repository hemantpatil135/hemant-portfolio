import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/theme";
import { profile, experiences, education } from "@/lib/data";
import { Providers } from "@/components/providers/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0A09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s — Hemant Patil",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    // Open Graph image is generated dynamically by src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    // Ties the card back to the X profile listed in `sameAs` — same
    // disambiguation job, on a second surface.
    creator: "@hemant_patil135",
    site: "@hemant_patil135",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      // Let Google show a full-length snippet instead of truncating at ~160
      // chars, so the name query can surface the whole positioning line.
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set GOOGLE_SITE_VERIFICATION in the host's env to verify the domain in
  // Search Console — that is what lets you submit the sitemap and see which
  // queries actually surface the site.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    // PNG alongside the SVG: iOS Safari ignores SVG touch icons, and the raster
    // fallback covers browsers that don't take an SVG favicon either.
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

/**
 * Structured data, built for one job: winning the "Hemant Patil" name query.
 *
 * A name is an ambiguous entity — plenty of people share this one — so the
 * decisive signal is disambiguation, not keywords. `sameAs` is what tells Google
 * that this site, the LinkedIn profile, the GitHub account and the X handle are
 * all one person; it lets this domain inherit the authority of profiles that
 * already rank for the name. Every profile in `profile.links` is listed for
 * that reason, and each one should link back here for the link to be two-way.
 *
 * `ProfilePage` (with the Person as `mainEntity`) is the type Google documents
 * for exactly this page shape, and `alumniOf`/`worksFor` pin the person to real
 * organisations, which is what separates one Hemant Patil from another.
 */
const personId = `${siteConfig.url}/#person`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: siteConfig.name,
  jobTitle: profile.role,
  description: profile.summary,
  email: profile.email,
  telephone: profile.phone,
  url: siteConfig.url,
  // A photo strengthens the person entity; the OG route renders one on demand.
  image: `${siteConfig.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: experiences[0].company,
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.institution,
  })),
  knowsLanguage: ["English", "Hindi", "Gujarati"],
  sameAs: [
    profile.links.linkedin,
    profile.links.github,
    profile.links.twitter,
    profile.links.instagram,
    profile.links.facebook,
  ],
  knowsAbout: [
    "React.js",
    "TypeScript",
    "Redux Toolkit",
    "Frontend Architecture",
    "Next.js",
    "Web Performance",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en",
      mainEntity: { "@id": personId },
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    },
    person,
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Dark-only theme: force the dark class before paint and clear any
            previously-stored light preference. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(){try{var r=document.documentElement;r.classList.remove('light');r.classList.add('dark');localStorage.removeItem('hp-theme');}catch(e){}}();",
          }}
        />
      </head>
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
