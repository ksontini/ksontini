import { expertiseCards, stackCategories } from "@/lib/data";
import {
  Network,
  Code2,
  Plug,
  Cloud,
  RefreshCw,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Network: <Network size={22} />,
  Code2: <Code2 size={22} />,
  Plug: <Plug size={22} />,
  Cloud: <Cloud size={22} />,
  RefreshCw: <RefreshCw size={22} />,
  Users: <Users size={22} />,
};

function ProficiencyDots({ level }: { level: number }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: i < level ? "var(--accent)" : "rgba(108,99,255,0.2)",
          }}
        />
      ))}
    </span>
  );
}

export default function Expertise() {
  return (
    <section
      id="expertise"
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
            EXPERTISE
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--text-dark)" }}
          >
            What I do best.
          </h2>
        </div>

        {/* Domain expertise cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {expertiseCards.map((card) => (
            <div
              key={card.title}
              className="hover-card p-6 rounded-xl"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(108, 99, 255, 0.1)", color: "var(--accent)" }}
              >
                {iconMap[card.icon]}
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ fontSize: "17px", color: "var(--text-dark)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}
              >
                {card.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "rgba(108,99,255,0.08)",
                      color: "var(--accent)",
                      fontFamily: "var(--font-jetbrains-var), monospace",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack grid */}
        <div>
          <h3
            className="font-semibold mb-6"
            style={{ fontSize: "20px", color: "var(--text-dark)" }}
          >
            Tech Stack
          </h3>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(108,99,255,0.06)", borderBottom: "1px solid var(--border)" }}>
                  <th
                    className="text-left py-3 px-5 text-xs font-semibold tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    Category
                  </th>
                  <th
                    className="text-left py-3 px-5 text-xs font-semibold tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    Technologies
                  </th>
                </tr>
              </thead>
              <tbody>
                {stackCategories.map((cat, i) => (
                  <tr
                    key={cat.category}
                    style={{
                      borderBottom: i < stackCategories.length - 1 ? "1px solid var(--border)" : "none",
                      background: i % 2 === 0 ? "white" : "rgba(108,99,255,0.02)",
                    }}
                  >
                    <td
                      className="py-4 px-5 text-sm font-semibold align-top"
                      style={{ color: "var(--text-dark)", minWidth: "140px" }}
                    >
                      {cat.category}
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {cat.items.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <span
                              className="text-sm"
                              style={{ color: "var(--text-dark)", fontFamily: "var(--font-jetbrains-var), monospace" }}
                            >
                              {item.name}
                            </span>
                            <ProficiencyDots level={item.level} />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
