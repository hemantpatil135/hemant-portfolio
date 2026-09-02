import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy information for the Hemant Patil portfolio and contact form.",
  alternates: { canonical: "/privacy" },
};

/** Exactly the fields the contact form collects (see components/sections/Contact). */
const fields = [
  { label: "Name", note: "Required" },
  { label: "Email address", note: "Required" },
  { label: "Phone number", note: "Optional" },
  { label: "Message", note: "Required" },
];

export default function PrivacyPage() {
  return (
    <>
      <AuroraBackground moonlight fixed />
      <SiteChrome />
      <main id="privacy" className="relative pb-20 pt-32 sm:pt-36">
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
            <span className="eyebrow">◇ Privacy</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              What happens to{" "}
              <span className="text-gradient-accent">your details</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-4 text-muted">
              This is a personal portfolio site. The only place it asks for
              information is the contact form, and that information is used only
              to reply to you.
            </p>
          </Reveal>

          <Reveal
            delay={4}
            as="section"
            aria-labelledby="contact-form"
            className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="contact-form"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <MessageSquare className="h-4 w-4" aria-hidden />
              Contact form
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The contact form may collect:
            </p>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              {fields.map(({ label, note }) => (
                <li
                  key={label}
                  className="flex items-baseline justify-between gap-3 bg-[var(--card-2)] p-4"
                >
                  <span className="text-sm font-semibold text-ink">{label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              This information is used to respond to your enquiry and to
              communicate about opportunities, projects, or collaborations. It is
              not sold or shared for advertising purposes.
            </p>
          </Reveal>

          <Reveal
            delay={5}
            as="section"
            aria-labelledby="delivery"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="delivery"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              How a message reaches me
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              When you submit the form, its contents are passed to a third-party
              form-delivery service —{" "}
              <a
                href="https://web3forms.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                Web3Forms
              </a>
              , or{" "}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                Resend
              </a>{" "}
              as a fallback — which emails the message to my inbox. Handling of
              that message in transit is governed by the relevant provider&rsquo;s
              own privacy policy.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This website has no database and stores no submissions of its own.
              Once a message arrives, it lives in my email inbox, where I keep it
              for as long as it is relevant to our conversation.
            </p>
          </Reveal>

          <Reveal
            delay={6}
            as="section"
            aria-labelledby="tracking"
            className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <h2
              id="tracking"
              className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-accent"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Analytics &amp; cookies
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              This site does not use analytics, advertising, or tracking cookies,
              and it does not build a profile of visitors. Standard technical logs
              may be kept by the hosting provider that serves the site, as is
              normal for any website.
            </p>
          </Reveal>

          <Reveal delay={7} className="mt-8 text-sm text-muted">
            <p>
              Want a message removed from my inbox, or have a privacy question?
              Email me at{" "}
              <a
                href={profile.links.email}
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                {profile.email}
              </a>
              . See also the{" "}
              <Link
                href="/copyright"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                copyright information
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
