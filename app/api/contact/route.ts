import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter (resets on cold-start — good enough for a personal site)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 3; // max submissions per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}

// Basic spam patterns — add more as needed
const SPAM_PATTERNS = [
  /\b(viagra|casino|lottery|crypto\s*investment|click\s*here|free\s*money)\b/i,
  /https?:\/\/\S+\s+https?:\/\/\S+/,          // multiple URLs
  /(.)\1{10,}/,                                  // repeated character spam
];

function looksLikeSpam(text: string): boolean {
  return SPAM_PATTERNS.some((re) => re.test(text));
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // ── Parse body ───────────────────────────────────────────────
    const body = await req.json();
    const { name, email, subject, message, _website, _loadedAt } = body;

    // ── Honeypot check ───────────────────────────────────────────
    // Real users leave this empty; most bots fill every field they see.
    if (_website && _website.trim() !== "") {
      // Silently accept — don't tell the bot it was detected
      return NextResponse.json({ ok: true });
    }

    // ── Timing check ─────────────────────────────────────────────
    // Form must have been open for at least 3 s and no more than 2 h
    const elapsed = Date.now() - Number(_loadedAt);
    if (isNaN(elapsed) || elapsed < 3000 || elapsed > 7_200_000) {
      return NextResponse.json({ ok: true }); // silent drop
    }

    // ── Field validation ─────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Field length limits
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    // ── Spam content check ───────────────────────────────────────
    if (looksLikeSpam(message) || looksLikeSpam(name)) {
      return NextResponse.json({ ok: true }); // silent drop
    }

    // ── Send email ───────────────────────────────────────────────
    await resend.emails.send({
      from: "ksontini.me <contact@ksontini.me>",
      to: "anis@ksontini.me",
      replyTo: email.trim(),
      subject: `[ksontini.me] ${subject ?? "Contact"} — from ${name.trim()}`,
      text: [
        `Name:    ${name.trim()}`,
        `Email:   ${email.trim()}`,
        `Subject: ${subject ?? "—"}`,
        "",
        message.trim(),
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
