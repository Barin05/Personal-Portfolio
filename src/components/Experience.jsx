import { experiences } from "../constants";

export const Experience = () => {
  if (!Array.isArray(experiences)) return null;

  return (
    <section
      id="experience"
      className="py-24 px-4 relative"
      style={{ background: "var(--ae-bg)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Career</div>
        <h2 className="ae-section-title" style={{ marginBottom: "56px" }}>
          Work <span style={{ color: "var(--ae-accent)" }}>Experience</span>
        </h2>

        <div className="ae-timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="ae-timeline-entry">
              <div className="ae-timeline-dot" />

              <div className="ae-timeline-card">
                {/* Bracket corners */}
                <span className="ae-corner ae-tl" />
                <span className="ae-corner ae-br" />

                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {exp.icon && (
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: exp.iconBg || "#fff",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={exp.icon}
                        alt={exp.company_name}
                        style={{ width: "70%", height: "70%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--ae-text)",
                        marginBottom: "2px",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--ae-accent)",
                        fontWeight: 600,
                        marginBottom: "2px",
                      }}
                    >
                      {exp.company_name}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--ae-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.date}
                    </p>
                  </div>
                </div>

                {/* Bullet points */}
                {Array.isArray(exp.points) && exp.points.length > 0 && (
                  <ul
                    style={{
                      paddingLeft: "20px",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: "13px",
                          color: "var(--ae-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
