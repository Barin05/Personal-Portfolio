import { Briefcase, Code, PencilRuler, GraduationCap } from "lucide-react";

const disciplines = [
  {
    icon: <PencilRuler size={24} />,
    title: "Engineering",
    desc: "Aerospace & energy industries — aircraft inspection, drone systems, mechanical design, 3D printing, CAD, FEA, and stress analysis.",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Project Management",
    desc: "Engineering team leadership — documentation, deliverable tracking, and vendor & client communication.",
  },
  {
    icon: <Code size={24} />,
    title: "Tech",
    desc: "Building tools and automating workflows with Python, JavaScript, and C++ across engineering and research contexts.",
  },
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ background: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Background</div>
        <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
          About <span style={{ color: "var(--ae-accent)" }}>Me</span>
        </h2>

        {/* Discipline cards — full-width three-column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "56px",
          }}
        >
          {disciplines.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                position: "relative",
                background: "var(--ae-card)",
                border: "1px solid var(--ae-border)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span className="ae-corner ae-tl" />
              <span className="ae-corner ae-tr" />
              <span className="ae-corner ae-bl" />
              <span className="ae-corner ae-br" />

              {/* Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(108,140,255,0.1)",
                  color: "var(--ae-accent)",
                }}
              >
                {icon}
              </div>

              {/* Title */}
              <h4
                style={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                  color: "var(--ae-text)",
                  margin: 0,
                }}
              >
                {title}
              </h4>

              {/* Divider */}
              <div
                style={{
                  width: "32px",
                  height: "2px",
                  background: "var(--ae-accent)",
                  opacity: 0.6,
                }}
              />

              {/* Description */}
              <p
                style={{
                  color: "var(--ae-muted)",
                  fontSize: "13px",
                  lineHeight: 1.75,
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
            padding: "28px 32px",
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <span className="ae-corner ae-tl" />
          <span className="ae-corner ae-br" />

          <div
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(108,140,255,0.1)",
              color: "var(--ae-accent)",
              flexShrink: 0,
            }}
          >
            <GraduationCap size={24} />
          </div>

          <div>
            <div className="ae-eyebrow" style={{ marginBottom: "8px" }}>Education</div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--ae-text)",
                marginBottom: "4px",
              }}
            >
              University of Illinois Urbana-Champaign
            </h3>
            <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--ae-muted)", margin: "0 0 4px" }}>
              B.S. in Aerospace Engineering, Minor in Computer Science
            </p>
            <p style={{ fontSize: "12px", color: "var(--ae-muted)", margin: 0, letterSpacing: "0.05em" }}>
              Champaign, IL — May 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
