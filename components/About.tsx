"use client";

import { useState } from "react";
import Image from "next/image";
import { about } from "@/lib/data";
import { MapPin, Globe, Languages, Briefcase } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={18} />,
  Globe: <Globe size={18} />,
  Languages: <Languages size={18} />,
  Briefcase: <Briefcase size={18} />,
};

function Photo() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
        }}
      >
        <div className="text-center">
          <div className="text-6xl font-extrabold mb-2" style={{ color: "var(--accent)" }}>
            AK
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src="/photo.jpg"
      alt="Anis Ksontini"
      fill
      sizes="(max-width: 768px) 256px, 320px"
      className="object-cover object-top"
      priority
      onError={() => setError(true)}
    />
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo column */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--accent)" }}
              >
                <Photo />
              </div>
              {/* Accent decoration */}
              <div
                className="absolute -bottom-3 -right-3 w-24 h-24 rounded-xl -z-10"
                style={{ background: "var(--accent)", opacity: 0.15 }}
              />
            </div>
          </div>

          {/* Text column */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] mb-4"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-jetbrains-var), monospace",
              }}
            >
              {about.label}
            </p>

            <h2
              className="font-bold leading-tight mb-8"
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                color: "var(--text-dark)",
              }}
            >
              {about.h2Line1}
              <br />
              {about.h2Line2}
            </h2>

            <div className="flex flex-col gap-5 mb-10">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-dark)", lineHeight: "1.75", opacity: 0.8 }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Key facts strip */}
            <div className="grid grid-cols-2 gap-4">
              {about.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ background: "rgba(108, 99, 255, 0.06)", border: "1px solid rgba(108,99,255,0.12)" }}
                >
                  <div style={{ color: "var(--accent)", marginTop: 2 }}>
                    {iconMap[f.icon]}
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-secondary)" }}>
                      {f.label}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-dark)" }}>
                      {f.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
