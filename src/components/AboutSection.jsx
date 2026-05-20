import { Briefcase, Code, PencilRuler } from "lucide-react";
import resumePDF from "../assets/Riyad_Babayev_Resume.pdf";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ color: "var(--ae-muted)", lineHeight: 1.8, fontSize: "15px" }}>
              I'm an Aerospace Engineer with a passion for solving real-world problems through
              engineering, technology, and design. With hands-on experience across aerospace,
              oil and gas, and tech industries.
            </p>
            <p style={{ color: "var(--ae-text)", lineHeight: 1.8, fontSize: "15px", fontWeight: 500 }}>
              I believe working across different fields and teams leads to more creative and
              effective solutions.
            </p>
            <p style={{ color: "var(--ae-muted)", lineHeight: 1.8, fontSize: "15px" }}>
              Whether I'm contributing to large-scale engineering projects or creating small-scale
              digital tools, I care about making work that's functional, thoughtful, and impactful.{" "}
              <span style={{ textDecoration: "underline", color: "var(--ae-text)" }}>
                My goal is to keep learning, keep building, and keep connecting ideas across disciplines.
              </span>
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", paddingTop: "8px" }}>
              <a href="#contact" className="ae-btn-primary">Contact Me</a>
              <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="ae-btn-outline">
                View Resume
              </a>
            </div>
          </div>

          {/* Right: cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                icon: <PencilRuler size={22} />,
                title: "Engineering",
                desc: "Experience in aerospace and energy industries, with core skills in aircraft inspection, drone systems, mechanical design, 3D printing, CAD, FEA, and stress analysis.",
              },
              {
                icon: <Briefcase size={22} />,
                title: "Project Management",
                desc: "Leading engineering teams by managing documentation, tracking deliverables, and facilitating vendor and client communication.",
              },
              {
                icon: <Code size={22} />,
                title: "Tech",
                desc: "Automating tasks, building tools, and exploring new ideas that enhance productivity and innovation with Python, JavaScript, and C++.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  position: "relative",
                  background: "var(--ae-card)",
                  border: "1px solid var(--ae-border)",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span className="ae-corner ae-tl" />
                <span className="ae-corner ae-br" />
                <div
                  style={{
                    padding: "10px",
                    background: "rgba(108,140,255,0.1)",
                    color: "var(--ae-accent)",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "15px", color: "var(--ae-text)", marginBottom: "6px" }}>
                    {title}
                  </h4>
                  <p style={{ color: "var(--ae-muted)", fontSize: "13px", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: "56px", borderTop: "1px solid var(--ae-border)", paddingTop: "40px" }}>
          <div className="ae-eyebrow">Education</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ae-text)", marginBottom: "6px" }}>
            University of Illinois Urbana-Champaign
          </h3>
          <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--ae-muted)" }}>
            B.S. in Aerospace Engineering, Minor in Computer Science
          </p>
          <p style={{ fontSize: "13px", color: "var(--ae-muted)", marginTop: "4px" }}>
            Champaign, IL — May 2026
          </p>
        </div>
      </div>
    </section>
  );
};
