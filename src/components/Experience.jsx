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
        <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
          Work <span style={{ color: "var(--ae-accent)" }}>Experience</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="ae-exp-card"
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

              {/* Header: logo + role + company + date */}
              <div
                className="ae-exp-header"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                {/* Left: logo + title + company */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {exp.icon && (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
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
                        fontWeight: 700,
                        fontSize: "14px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--ae-text)",
                        margin: "0 0 3px",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--ae-accent)",
                        margin: 0,
                      }}
                    >
                      {exp.company_name}
                    </p>
                  </div>
                </div>

                {/* Right: date */}
                <span
                  className="ae-exp-date"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ae-muted)",
                    paddingTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  {exp.date}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "var(--ae-border)",
                  marginBottom: "20px",
                }}
              />

              {/* Bullet points */}
              {Array.isArray(exp.points) && exp.points.length > 0 && (
                <ul
                  style={{
                    paddingLeft: "18px",
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
                        lineHeight: 1.75,
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
