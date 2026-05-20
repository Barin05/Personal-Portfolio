import { Briefcase, Code, PencilRuler, GraduationCap } from "lucide-react";

const disciplines = [
  {
    icon: <PencilRuler size={20} />,
    title: "Engineering",
    desc: "Aerospace & energy industries — aircraft inspection, drone systems, mechanical design, 3D printing, CAD, FEA, and stress analysis.",
  },
  {
    icon: <Briefcase size={20} />,
    title: "Project Management",
    desc: "Engineering team leadership — documentation, deliverable tracking, and vendor & client communication.",
  },
  {
    icon: <Code size={20} />,
    title: "Tech",
    desc: "Building tools and automating workflows with Python, JavaScript, and C++ across engineering and research contexts.",
  },
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ backgroundColor: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Background</div>
        <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
          About <span style={{ color: "var(--ae-accent)" }}>Me</span>
        </h2>

        {/* Discipline cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {disciplines.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                position: "relative",
                background: "var(--ae-card)",
                border: "1px solid var(--ae-border)",
                padding: "28px 24px",
              }}
            >
              <span className="ae-corner ae-tl" />
              <span className="ae-corner ae-tr" />
              <span className="ae-corner ae-bl" />
              <span className="ae-corner ae-br" />

              {/* Icon + title row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ color: "var(--ae-accent)", display: "flex", flexShrink: 0 }}>
                  {icon}
                </span>
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ae-text)",
                    margin: 0,
                  }}
                >
                  {title}
                </h4>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "var(--ae-muted)",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          style={{
            position: "relative",
            background: "var(--ae-card)",
            border: "1px solid var(--ae-border)",
            padding: "28px 24px",
          }}
        >
          <span className="ae-corner ae-tl" />
          <span className="ae-corner ae-tr" />
          <span className="ae-corner ae-bl" />
          <span className="ae-corner ae-br" />

          {/* Header row — matches discipline cards */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ color: "var(--ae-accent)", display: "flex", flexShrink: 0 }}>
              <GraduationCap size={20} />
            </span>
            <h4
              style={{
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ae-text)",
                margin: 0,
              }}
            >
              Education
            </h4>
          </div>

          {/* Content — two-column: degree left, meta right */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--ae-text)",
                  margin: "0 0 4px",
                }}
              >
                University of Illinois Urbana-Champaign
              </p>
              <p style={{ fontSize: "13px", color: "var(--ae-muted)", margin: 0 }}>
                B.S. Aerospace Engineering · Minor in Computer Science
              </p>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--ae-accent)",
                  margin: "0 0 2px",
                }}
              >
                May 2026
              </p>
              <p style={{ fontSize: "12px", color: "var(--ae-muted)", margin: 0 }}>
                Champaign, IL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
