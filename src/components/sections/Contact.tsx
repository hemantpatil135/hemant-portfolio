"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  User,
  PenLine,
  Rocket,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hexagonal icon frame — the section's recurring node shape. */
function Hex({
  size = 48,
  icon: Icon,
  outline = false,
}: {
  size?: number;
  icon: LucideIcon;
  outline?: boolean;
}) {
  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points="50,3 91,26 91,74 50,97 9,74 9,26"
          fill={outline ? "var(--card-2)" : "rgba(249,115,22,0.12)"}
          stroke="#F97316"
          strokeWidth={outline ? 3 : 3.5}
          strokeOpacity={outline ? 0.5 : 0.9}
        />
      </svg>
      <Icon
        className="relative text-accent"
        style={{ width: size * 0.38, height: size * 0.38 }}
        aria-hidden
      />
    </span>
  );
}

/** Animated 3D Hex with rotation and hover effect */
function AnimatedRocketHex({ size = 58 }: { size?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="relative grid shrink-0 place-items-center cursor-pointer"
      style={{ width: size, height: size }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? [0, 360] : 0,
        rotateZ: isHovered ? 10 : 0,
      }}
      transition={{
        rotateY: {
          duration: isHovered ? 0.8 : 0,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <polygon
          points="50,3 91,26 91,74 50,97 9,74 9,26"
          fill="rgba(249,115,22,0.12)"
          stroke="#F97316"
          strokeWidth={3.5}
          strokeOpacity={0.9}
        />
      </motion.svg>
      <motion.div
        className="relative"
        animate={{
          y: isHovered ? [-2, 2, -2] : [0, -3, 0],
        }}
        transition={{
          y: {
            duration: isHovered ? 0.4 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Rocket
          className="text-accent"
          style={{ width: size * 0.38, height: size * 0.38 }}
          aria-hidden
        />
      </motion.div>
    </motion.span>
  );
}

/** WhatsApp glyph — lucide has no brand icon, so this is a minimal inline SVG. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.41 1.02 2.77 1.17 2.96.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.41-9.4 9.41zM20.52 3.49A11.34 11.34 0 0 0 12.05.02C5.8.02.73 5.09.73 11.34c0 2 .52 3.95 1.52 5.67L.63 23.06l6.19-1.62a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.32-5.07 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
  );
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen-reader users are told it worked.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!emailRe.test(form.email)) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    try {
      if (web3Key) {
        // Web3Forms must be called client-side (free plan blocks server calls);
        // the access key is public by design.
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `Portfolio contact from ${form.name}`,
            from_name: form.name,
            email: form.email,
            phone: form.phone || "—",
            message: form.message,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { success?: boolean };
        if (!res.ok || !data.success) throw new Error("send-failed");
      } else {
        // No Web3Forms key → try the server route (Resend, if configured).
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("send-failed");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      // No mail-client popup: show a graceful "reach me directly" message.
      setStatus("error");
    }
  };

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      sub: "Drop me a line anytime.",
      href: profile.links.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      sub: "Call or WhatsApp",
      href: profile.links.phone,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      sub: "Available for remote work",
      href: undefined,
    },
  ];

  const socials = [
    { href: profile.links.github, icon: Github, label: "GitHub" },
    { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: profile.links.twitter, icon: Twitter, label: "Twitter" },
    { href: profile.links.instagram, icon: Instagram, label: "Instagram" },
    { href: profile.links.facebook, icon: Facebook, label: "Facebook" },
    { href: profile.links.email, icon: Mail, label: "Email" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24">
      <div className="section-shell">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">◇ Contact</span>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
            Let&rsquo;s build something{" "}
            <span className="text-gradient-accent">great</span>
          </h2>
          <p className="mt-4 text-muted">
            Open to frontend engineering roles and collaborations.
            <br className="hidden sm:block" /> I usually reply within a day.
          </p>
        </div>

        {/* min-w-0 on the tracks: the nowrap/truncate copy inside the cards
            would otherwise inflate their min-content and blow past the shell. */}
        <div className="mt-14 grid gap-6 [&>*]:min-w-0 lg:grid-cols-[1fr_1.25fr]">
          {/* ── Let's connect ── */}
          <Reveal className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Let&rsquo;s connect
            </p>

            {/* Featured LinkedIn card — on-brand, no third-party script. */}
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${profile.name} on LinkedIn — view profile`}
              className="group mt-5 flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                <Linkedin className="h-6 w-6 text-accent" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">
                  {profile.name}
                </span>
                <span className="block text-xs text-muted sm:truncate">
                  {profile.role} · LinkedIn
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-accent">
                <span className="hidden sm:inline">View</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </a>

            {/* WhatsApp — instant chat, prefilled greeting. */}
            <a
              href={profile.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Hemant Patil on WhatsApp"
              className="group mt-3 flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-4 transition-colors hover:border-success/50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-success/30 bg-success/10">
                <WhatsAppIcon className="h-6 w-6 text-success" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">
                  Chat on WhatsApp
                </span>
                <span className="block text-xs text-muted sm:truncate">
                  Usually replies quickly
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-success">
                <span className="hidden sm:inline">Message</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </a>

            <div className="mt-6 flex flex-col gap-5">
              {contactMethods.map(({ icon, label, value, sub, href }) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    <Hex icon={icon} />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {label}
                      </p>
                      <p className="break-all text-sm font-semibold text-ink sm:truncate sm:break-normal">
                        {value}
                      </p>
                      <p className="text-xs text-muted">{sub}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="block rounded-2xl transition-opacity hover:opacity-80"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>

            <div className="mt-7 border-t border-[var(--border)] pt-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Find me online
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
                {socials.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <span className="transition-transform group-hover:-translate-y-0.5">
                      <Hex icon={icon} outline size={44} />
                    </span>
                    <span className="text-[11px] text-muted group-hover:text-accent">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Send a message ── */}
          <Reveal
            delay={1}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Send a message
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Tell me about the role or project you have in mind.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-success" aria-hidden />
                <h3
                  ref={successRef}
                  tabIndex={-1}
                  className="mt-4 text-xl font-bold outline-none"
                >
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-accent underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-4"
              >
                <IconField
                  id="name"
                  label="Your name"
                  icon={User}
                  value={form.name}
                  onChange={update("name")}
                  error={errors.name}
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                />
                <IconField
                  id="email"
                  label="Your email"
                  icon={Mail}
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  error={errors.email}
                  placeholder="Your Email"
                  autoComplete="email"
                  required
                />
                <IconField
                  id="phone"
                  label="Your phone (optional)"
                  icon={Phone}
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="Your Phone (Optional)"
                  autoComplete="tel"
                />
                <div>
                  <label htmlFor="message" className="sr-only">
                    Your message
                  </label>
                  <div className="relative">
                    <PenLine
                      className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-accent/70"
                      aria-hidden
                    />
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell me about the role or project…"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      required
                      className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card-2)] py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent/60 focus:ring-1 focus:ring-accent/40"
                    />
                  </div>
                  {errors.message && (
                    <ErrorText id="message-error">{errors.message}</ErrorText>
                  )}
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-3.5 text-sm"
                  >
                    <p className="flex items-center gap-2 font-medium text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                      Couldn&rsquo;t send just now.
                    </p>
                    <p className="mt-1.5 text-muted">
                      Reach me directly at{" "}
                      <a
                        href={profile.links.email}
                        className="font-medium text-accent underline-offset-2 hover:underline"
                      >
                        {profile.email}
                      </a>{" "}
                      or on{" "}
                      <a
                        href={profile.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-success underline-offset-2 hover:underline"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>

        {/* ── Impact banner ── */}
        <Reveal
          delay={2}
          className="mt-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid items-center gap-6 text-center sm:grid-cols-[1fr_auto_1fr] sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Let&rsquo;s create impact
              </p>
              <p className="mt-2 text-sm text-muted">
                Great products start with great conversations.
              </p>
            </div>

            <span className="relative mx-auto grid h-20 w-20 place-items-center">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-glow"
              />
              <span
                aria-hidden
                className="absolute inset-1.5 rounded-full border border-accent/25"
              />
              <AnimatedRocketHex size={58} />
            </span>

            <div className="sm:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Current status
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-ink sm:justify-end">
                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                Available for new opportunities
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-4 py-1.5 text-xs font-semibold text-success">
                Open to Work
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IconField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/70"
          aria-hidden
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full rounded-2xl border bg-[var(--card-2)] py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent/60 focus:ring-1 focus:ring-accent/40",
            error ? "border-red-400/60" : "border-[var(--border)]",
          )}
        />
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
    >
      <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {children}
    </p>
  );
}
