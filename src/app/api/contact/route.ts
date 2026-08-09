import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

/**
 * Contact form → your email inbox (server-side, via Resend).
 *
 * This route is the fallback path used when NO Web3Forms key is set. Web3Forms
 * itself is called client-side from the form (its free plan blocks server-side
 * calls), so the primary path never hits this route.
 *
 * Set RESEND_API_KEY (https://resend.com) to enable this path. With no key it
 * returns 503 and the client shows a graceful "reach me directly" message.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);

  if (!name || !emailRe.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please provide a name, a valid email, and a message." },
      { status: 422 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const subject = `Portfolio contact from ${name}`;

  // ── Resend (server-side) ──
  if (resendKey) {
    const to = profile.email.replace(/^mailto:/, "");
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject,
          text:
            `New message from your portfolio contact form:\n\n` +
            `Name:  ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || "—"}\n\n` +
            `${message}\n`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Could not send the message." }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not reach the email service." }, { status: 502 });
    }
  }

  return NextResponse.json(
    { error: "Email delivery is not configured yet." },
    { status: 503 },
  );
}
