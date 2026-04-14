import { articles } from "@/lib/data";
import { Clock, ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  Technical: "#6C63FF",
  "Tech × Business": "#00D4AA",
  Opinion: "#F59E0B",
};

export default function Writing() {
  return (
    <section
      id="writing"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] mb-3"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-jetbrains-var), monospace",
              }}
            >
              WRITING
            </p>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--text-primary)" }}
            >
              Thinking out loud.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Read all articles <ArrowRight size={16} />
          </a>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            const accentColor = categoryColors[article.category] || "var(--accent)";
            return (
              <article
                key={i}
                className="glass-card hover-card rounded-xl overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Cover image placeholder */}
                <div
                  className="h-40 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,170,0.08) 100%)`,
                  }}
                >
                  <div
                    className="text-4xl font-extrabold opacity-20"
                    style={{ color: accentColor, fontFamily: "var(--font-jetbrains-var), monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Category */}
                  <span
                    className="text-xs font-semibold mb-3 inline-block"
                    style={{
                      color: accentColor,
                      fontFamily: "var(--font-jetbrains-var), monospace",
                    }}
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-semibold mb-3 leading-snug flex-1"
                    style={{ fontSize: "16px", color: "var(--text-primary)" }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
                  >
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between text-xs pt-4"
                    style={{
                      borderTop: "1px solid rgba(108,99,255,0.1)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
