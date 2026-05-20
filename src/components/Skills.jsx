const skills = [
  // Simulation & Analysis
  { name: "ANSYS", level: 95, category: "sim" },
  { name: "ABAQUS", level: 90, category: "sim" },
  { name: "CAESAR CX II", level: 80, category: "sim" },
  { name: "Nozzle PRO", level: 85, category: "sim" },
  { name: "GasTurb", level: 85, category: "sim" },

  // CAD & Design
  { name: "AutoCAD", level: 80, category: "cad" },
  { name: "NX Siemens", level: 75, category: "cad" },
  { name: "SolidWorks", level: 70, category: "cad" },
  { name: "Cura", level: 80, category: "cad" },
  { name: "NavisWorks", level: 90, category: "cad" },

  // Programming
  { name: "Python", level: 90, category: "code" },
  { name: "JavaScript", level: 80, category: "code" },
  { name: "C++", level: 90, category: "code" },
  { name: "React", level: 70, category: "code" },
  { name: "HTML/CSS", level: 80, category: "code" },
  { name: "Git/GitHub", level: 90, category: "code" },
  { name: "Docker", level: 70, category: "code" },
  { name: "VS Code", level: 95, category: "code" },
];

const columns = [
  { key: "sim", label: "Simulation & Analysis" },
  { key: "cad", label: "CAD & Design" },
  { key: "code", label: "Programming" },
];

const DotPips = ({ level }) => {
  const filled = Math.ceil(level / 20);
  return (
    <div className="ae-pips">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`ae-pip${i < filled ? " ae-pip-on" : ""}`} />
      ))}
    </div>
  );
};

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ backgroundColor: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Expertise</div>
        <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
          Technical <span style={{ color: "var(--ae-accent)" }}>Skills</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {columns.map(({ key, label }) => (
            <div
              key={key}
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

              {/* Column header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--ae-border)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "8px",
                    height: "8px",
                    background: "var(--ae-accent)",
                    transform: "rotate(45deg)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ae-accent)",
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Skill rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {skills
                  .filter((s) => s.category === key)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--ae-text)",
                        }}
                      >
                        {skill.name}
                      </span>
                      <DotPips level={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
