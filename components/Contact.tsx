"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/data";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <LinkedinIcon />,
  Github: <GithubIcon />,
  Mail: <Mail size={18} />,
  MapPin: <MapPin size={18} />,
};

export default function Contact() {
  const loadedAtRef = useRef<number>(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Job opportunity",
    message: "",
    // honeypot — hidden from real users, filled by bots
    _website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Record when the form section was first rendered
  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side minimum time guard (3 s) — supplements server check
    if (Date.now() - loadedAtRef.current < 3000) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _website: form._website,         // honeypot
          _loadedAt: loadedAtRef.current,  // timestamp
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "Job opportunity", message: "", _website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(30, 33, 48, 0.6)",
    border: "1px solid rgba(108,99,255,0.2)",
    color: "var(--text-primary)",
    borderRadius: "6px",
    padding: "12px 14px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] mb-3"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-jetbrains-var), monospace",
            }}
          >
            CONTACT
          </p>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "var(--text-primary)" }}
          >
            {contact.headline}
          </h2>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}
          >
            {contact.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div
                className="flex flex-col items-center justify-center gap-4 py-16 rounded-xl"
                style={{ background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.2)" }}
              >
                <CheckCircle size={40} style={{ color: "var(--accent2)" }} />
                <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  Message sent. I&apos;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* ── Honeypot field — hidden from humans ─────────────────── */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label htmlFor="website_field">Website</label>
                  <input
                    id="website_field"
                    name="_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form._website}
                    onChange={handleChange}
                  />
                </div>
                {/* ────────────────────────────────────────────────────────── */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      Your name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
                  >
                    <option>Job opportunity</option>
                    <option>Advisory</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or role"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.2)")}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#EF4444" }}>
                    Something went wrong. Please email me directly at anis@ksontini.me
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded font-semibold text-white transition-all"
                  style={{
                    background: status === "sending" ? "rgba(108,99,255,0.5)" : "var(--accent)",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Send size={16} />
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Social / Direct links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
              Or reach out directly
            </p>
            {contact.social.map((s) => {
              const content = (
                <div
                  className="flex items-center gap-3 p-4 rounded-xl transition-all"
                  style={{
                    background: "rgba(30, 33, 48, 0.6)",
                    border: "1px solid rgba(108,99,255,0.12)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.15)", color: "var(--accent)" }}
                  >
                    {iconMap[s.icon]}
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>
                      {s.icon === "MapPin" ? "Location" : s.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              );

              return s.url ? (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block hover-card"
                >
                  {content}
                </a>
              ) : (
                <div key={s.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-24 pt-8 max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(108,99,255,0.1)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          © {new Date().getFullYear()} Anis Ksontini. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </section>
  );
}
