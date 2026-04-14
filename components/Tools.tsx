"use client";

import { tools } from "@/lib/data";
import { Terminal, ExternalLink } from "lucide-react";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

export default function Tools() {
  return (
    <section
      id="tools"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-light)" }}
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
            OPEN SOURCE & TOOLS
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--text-dark)" }}
          >
            Tools I built and open-sourced.
          </h2>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="hover-card p-6 rounded-xl"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(108,99,255,0.1)", color: "var(--accent)" }}
                >
                  <Terminal size={20} />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded font-semibold"
                  style={{
                    background: "rgba(0,212,170,0.1)",
                    color: "var(--accent2)",
                    fontFamily: "var(--font-jetbrains-var), monospace",
                  }}
                >
                  {tool.language}
                </span>
              </div>

              <h3
                className="font-semibold mb-1"
                style={{
                  fontSize: "18px",
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-jetbrains-var), monospace",
                }}
              >
                {tool.name}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--accent)", fontStyle: "italic" }}
              >
                {tool.oneliner}
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}
              >
                {tool.description}
              </p>

              <a
                href={tool.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-all"
                style={{
                  background: "rgba(108,99,255,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(108,99,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(108,99,255,0.1)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
              >
                <GithubIcon />
                View on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          ))}

          {/* Placeholder card */}
          <div
            className="p-6 rounded-xl flex flex-col items-center justify-center text-center min-h-[280px]"
            style={{
              background: "white",
              border: "2px dashed var(--border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: "rgba(108,99,255,0.06)", color: "var(--text-secondary)" }}
            >
              <Terminal size={20} />
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "var(--text-dark)" }}
            >
              More tools coming soon
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Docker Swarm deploy script · Symfony profiler helper
            </p>
          </div>
        </div>

        {/* GitHub profile link */}
        <div className="flex justify-center">
          <a
            href="https://github.com/ksontini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
            style={{
              background: "transparent",
              color: "var(--text-dark)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-dark)";
            }}
          >
            <GithubIcon />
            View all repositories →
          </a>
        </div>
      </div>
    </section>
  );
}
