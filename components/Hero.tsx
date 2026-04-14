"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/lib/data";
import { ChevronDown } from "lucide-react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 60;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(108, 99, 255, 0.5)";
        ctx.fill();
      });

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(108,99,255,0.05) 0%, transparent 50%, rgba(0,212,170,0.03) 100%)",
        }}
      />

      {/* Particle network on right half (desktop) */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <ParticleCanvas />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Pre-headline */}
          <p
            className="text-xs font-semibold tracking-[0.2em] mb-6"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-jetbrains-var), monospace",
            }}
          >
            {hero.preheadline}
          </p>

          {/* H1 */}
          <h1
            className="font-extrabold leading-tight mb-6"
            style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>{hero.h1Line1}</span>
            <br />
            <span style={{ color: "var(--accent2)" }}>{hero.h1Line2}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg mb-2" style={{ color: "var(--text-secondary)" }}>
            {hero.subheadline}
          </p>
          <p className="text-lg mb-8 font-semibold" style={{ color: "var(--text-primary)" }}>
            {hero.subheadline2}
          </p>

          {/* Body */}
          <p
            className="text-base leading-relaxed mb-10 max-w-xl"
            style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}
          >
            {hero.body}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => scrollTo("#work")}
              className="px-6 py-3 rounded font-semibold text-white transition-all"
              style={{ background: "var(--accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              See my work
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-3 rounded font-semibold transition-all"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              Let&apos;s talk
            </button>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {hero.stats.map((s, i) => (
              <div
                key={i}
                className="px-6 py-3 first:pl-0"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="text-xl font-bold"
                  style={{ color: "var(--accent2)" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
          SCROLL
        </span>
        <ChevronDown
          size={18}
          style={{ color: "var(--accent)" }}
          className="animate-bounce"
        />
      </div>
    </section>
  );
}
