"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/data";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CaseStudies() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section
      id="work"
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
            CASE STUDIES
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--text-primary)" }}
          >
            Real problems. Real outcomes.
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {caseStudies.map((cs) => {
            const isOpen = expanded === cs.id;
            return (
              <div
                key={cs.id}
                className="glass-card rounded-xl overflow-hidden hover-card"
              >
                {/* Card header — always visible */}
                <div
                  className="p-6 lg:p-8 cursor-pointer"
                  onClick={() => toggle(cs.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded"
                          style={{
                            background: "rgba(0, 212, 170, 0.1)",
                            color: "var(--accent2)",
                            fontFamily: "var(--font-jetbrains-var), monospace",
                          }}
                        >
                          {cs.year}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {cs.clientType}
                        </span>
                      </div>

                      <h3
                        className="font-semibold mb-3"
                        style={{ fontSize: "20px", color: "var(--text-primary)" }}
                      >
                        {cs.title}
                      </h3>

                      {/* Challenge — always shown */}
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
                      >
                        {cs.challenge}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {cs.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: "rgba(108,99,255,0.12)",
                              color: "var(--accent)",
                              fontFamily: "var(--font-jetbrains-var), monospace",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                        {cs.tags.length > 3 && (
                          <span
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: "rgba(108,99,255,0.12)",
                              color: "var(--accent)",
                              fontFamily: "var(--font-jetbrains-var), monospace",
                            }}
                          >
                            +{cs.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: isOpen ? "var(--accent)" : "rgba(108,99,255,0.12)",
                        color: isOpen ? "white" : "var(--accent)",
                      }}
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div
                    className="px-6 pb-8 lg:px-8 lg:pb-8"
                    style={{ borderTop: "1px solid rgba(108,99,255,0.15)" }}
                  >
                    <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Approach */}
                      <div>
                        <h4
                          className="text-xs font-semibold tracking-widest mb-4"
                          style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-var), monospace" }}
                        >
                          APPROACH
                        </h4>
                        <ol className="flex flex-col gap-3">
                          {cs.approach.map((step, i) => (
                            <li key={i} className="flex gap-3">
                              <span
                                className="flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold mt-0.5"
                                style={{ background: "var(--accent)", color: "white" }}
                              >
                                {i + 1}
                              </span>
                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}
                              >
                                {step}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Outcome */}
                      <div>
                        <h4
                          className="text-xs font-semibold tracking-widest mb-4"
                          style={{ color: "var(--accent2)", fontFamily: "var(--font-jetbrains-var), monospace" }}
                        >
                          OUTCOME
                        </h4>
                        <p
                          className="text-sm leading-relaxed mb-6"
                          style={{ color: "var(--text-primary)", lineHeight: "1.7" }}
                        >
                          {cs.outcome}
                        </p>

                        {/* All tags */}
                        <div className="flex flex-wrap gap-2">
                          {cs.tags.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                background: "rgba(108,99,255,0.12)",
                                color: "var(--accent)",
                                fontFamily: "var(--font-jetbrains-var), monospace",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
