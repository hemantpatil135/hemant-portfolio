import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ScrollText, Shield } from "lucide-react";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Copyright",
  description:
    "Copyright and intellectual property information for the Hemant Patil portfolio.",
  alternates: { canonical: "/copyright" },
};

/** Copyright application record — one authored row per line item. */
const application = [
  { label: "Title", value: "Hemant Patil Portfolio" },
  { label: "Class of Work", value: "Computer Software" },
  { label: "Diary No.", value: "SW-41468/2026-CO" },
  { label: "Filing Date", value: "02 September 2026" },
];

export default function CopyrightPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <AuroraBackground moonlight fixed />
      <SiteChrome />
      <main id="copyright" className="relative pb-20 pt-32 sm:pt-36">
        <div className="section-shell max-w-3xl">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
              Back to home
            </Link>
          </Reveal>

          <Reveal delay={1} className="mt-8">
            <span className="eyebrow">◇ Legal</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Copyright &amp;{" "}
              <span className="text-gradient-accent">ownership</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-4 text-muted">
              © {year} {profile.name}. All rights reserved.
            </p>
          </Reveal>

          <Reveal
            delay={4}
            as="section"
            aria-labelledby="materials"
            className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="materials"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <ScrollText className="h-4 w-4" aria-hidden />
              Original materials
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The original source code, design, visual elements, written content,
              and other original materials created for this website are protected
              by applicable copyright law.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Unauthorized copying, reproduction, modification, distribution, or
              commercial use of these materials is not permitted without prior
              written permission, except as permitted by applicable law.
            </p>
          </Reveal>

          <Reveal
            delay={5}
            as="section"
            aria-labelledby="registration"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="registration"
              className="text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              Copyright registration application
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A copyright registration application has been filed with the
              Copyright Office, Government of India. The application is currently
              pending — registration has not been granted.
            </p>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              {application.map(({ label, value }) => (
                <div key={label} className="bg-[var(--card-2)] p-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={6}
            as="section"
            aria-labelledby="client-work"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="client-work"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Client work &amp; confidentiality
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Some projects shown on this website were developed as part of
              professional engagements and may be subject to confidentiality
              obligations or NDAs. The intellectual property in that work belongs
              to the respective clients.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Project descriptions and visuals are representative and do not
              disclose confidential source code, proprietary information,
              credentials, internal systems, or non-public client materials. The
              real UIs ship behind client authentication.
            </p>
          </Reveal>

          <Reveal
            delay={7}
            as="section"
            aria-labelledby="trademarks"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="trademarks"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <Shield className="h-4 w-4" aria-hidden />
              Trademarks
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Company names, trademarks, logos, and product names mentioned on
              this website belong to their respective owners and are used for
              identification and professional portfolio purposes.
            </p>
          </Reveal>

          <Reveal delay={8} className="mt-8 text-sm text-muted">
            <p>
              Questions about permissions or reuse? Reach me at{" "}
              <a
                href={profile.links.email}
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                {profile.email}
              </a>
              . See also the{" "}
              <Link
                href="/privacy"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                privacy information
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
