import { useState } from "react";
import scVideo from "../assets/spacecraft.mp4";
import spacecraft_photo from '../assets/Spacecraft_photo.png';
import refLetter from "../assets/DP3-Letter.pdf";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/* ── Data ─────────────────────────────────────────────── */

const SPECS = [
  { label: "Platform", value: "Rigid spacecraft with 3-axis reaction wheels" },
  { label: "Sensors", value: "Star tracker (absolute attitude) + gyros (rates)" },
  { label: "Control Law", value: "LQR state-feedback on linearized attitude dynamics" },
  { label: "Estimator", value: "Gyro integration + star-tracker updates" },
  { label: "Linearization", value: "About nominal pointing attitude" },
  { label: "Simulator", value: "Python · MATLAB · SymPy · Matplotlib" },
];

const ARTIFACTS = [
  { item: "Nonlinear attitude dynamics derivation", note: "Rigid body + reaction wheel coupling" },
  { item: "Linearized state-space (A, B, C, D)", note: "Quaternion-error small-angle model" },
  { item: "LQR controller implementation", note: "Wheel torque inputs; weight presets" },
  { item: "Estimator block", note: "MEKF/complementary structure with star tracker updates" },
  { item: "Plots & simulation scripts", note: "Step/hold disturbance tests, wheel torques (10+)" },
  { item: "Professor reference letter (PDF)", note: "Project endorsement" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "video", label: "Video" },
  { id: "specs", label: "Specs" },
  { id: "artifacts", label: "Artifacts" },
];

/* ── Shared sub-components ─────────────────────────────── */

const SpecCard = ({ label, value }) => (
  <div
    style={{
      position: "relative",
      background: "var(--ae-card)",
      border: "1px solid var(--ae-border)",
      padding: "14px 16px",
    }}
  >
    <span className="ae-corner ae-tl" style={{ width: "10px", height: "10px" }} />
    <span className="ae-corner ae-br" style={{ width: "10px", height: "10px" }} />
    <div
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ae-muted)",
        marginBottom: "6px",
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ae-text)" }}>
      {value}
    </div>
  </div>
);

const AeSection = ({ id, eyebrow, title, bg = "var(--ae-bg)", grid = false, children }) => (
  <section
    id={id}
    className={grid ? "ae-grid-bg" : ""}
    style={{ backgroundColor: bg, padding: "72px 16px" }}
  >
    <div className="container mx-auto max-w-5xl">
      <div className="ae-eyebrow">{eyebrow}</div>
      <h2 className="ae-section-title" style={{ marginBottom: "40px" }}>
        {title}
      </h2>
      {children}
    </div>
  </section>
);

/* ── Main component ────────────────────────────────────── */

export default function Spacecraft() {
  return (
    <div style={{ background: "var(--ae-bg)", color: "var(--ae-text)", minHeight: "100vh", overflowX: "hidden", textAlign: "left" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="ae-grid-bg"
        style={{
          position: "relative",
          minHeight: "85vh",
          backgroundColor: "var(--ae-bg2)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={spacecraft_photo}
            alt="Spacecraft model"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "60%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, var(--ae-bg2) 35%, rgba(13,18,32,0.7) 65%, transparent 100%)",
            }}
          />
        </div>

        <div
          className="container mx-auto max-w-5xl"
          style={{ position: "relative", zIndex: 10, padding: "120px 16px 80px" }}
        >
          <div className="ae-eyebrow">Attitude Control · Star Tracker · Spring 2025</div>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "var(--ae-text)",
              marginBottom: "12px",
            }}
          >
            Spacecraft Control.
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--ae-muted)",
              marginBottom: "28px",
              maxWidth: "480px",
            }}
          >
            Control system for a 3-axis rigid spacecraft using reaction wheels and a star tracker for absolute attitude measurement.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {["Attitude Control", "LQR", "Star Tracker", "MATLAB", "Python"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ae-accent)",
                  border: "1px solid var(--ae-border)",
                  padding: "4px 12px",
                  background: "rgba(108,140,255,0.07)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              marginBottom: "36px",
              fontSize: "12px",
            }}
          >
            {[
              { k: "Timeline", v: "4 weeks" },
              { k: "Role", v: "Modeling · Controls · Estimation" },
              { k: "Tools", v: "Python · MATLAB · SymPy" },
            ].map(({ k, v }) => (
              <div key={k}>
                <div style={{ color: "var(--ae-muted)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                  {k}
                </div>
                <div style={{ color: "var(--ae-text)", fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href={refLetter} target="_blank" rel="noopener noreferrer" className="ae-btn-primary">
              View Reference Letter →
            </a>
            <a href="/#contact" className="ae-btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY TAB NAV ──────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "var(--ae-nav-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--ae-border)",
        }}
      >
        <div className="container mx-auto max-w-5xl" style={{ padding: "0 16px" }}>
          <nav style={{ display: "flex", gap: "0", overflowX: "auto" }}>
            {TABS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ae-muted)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  borderBottom: "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--ae-accent)";
                  e.currentTarget.style.borderBottomColor = "var(--ae-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ae-muted)";
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── OVERVIEW ────────────────────────────────────── */}
      <AeSection id="overview" eyebrow="Project" title={<>Project <span style={{ color: "var(--ae-accent)" }}>Overview</span></>} bg="var(--ae-bg)" grid={false}>
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, maxWidth: "720px" }}>
          Developed a control system for a 3-axis rigid spacecraft using reaction wheels and a star tracker for absolute attitude measurement. Modeled and linearized the spacecraft dynamics, then designed an LQR state-feedback controller to stabilize and command attitude. Simulated closed-loop performance under disturbances and sensor noise to validate pointing accuracy and stability.
        </p>
      </AeSection>

      {/* ── VIDEO ───────────────────────────────────────── */}
      <AeSection id="video" eyebrow="Simulation" title={<>Project <span style={{ color: "var(--ae-accent)" }}>Demo</span></>} bg="var(--ae-bg2)" grid={true}>
        <div style={{ border: "1px solid var(--ae-border)", background: "var(--ae-card)", padding: "4px" }}>
          <video
            src={scVideo}
            controls
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </AeSection>

      {/* ── SPECS ───────────────────────────────────────── */}
      <AeSection id="specs" eyebrow="System Data" title={<>Technical <span style={{ color: "var(--ae-accent)" }}>Specifications</span></>} bg="var(--ae-bg)" grid={false}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {SPECS.map((r) => (
            <SpecCard key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </AeSection>

      {/* ── ARTIFACTS ───────────────────────────────────── */}
      <AeSection id="artifacts" eyebrow="Deliverables" title={<>Work <span style={{ color: "var(--ae-accent)" }}>Artifacts</span></>} bg="var(--ae-bg2)" grid={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ARTIFACTS.map((r, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                background: "var(--ae-card)",
                border: "1px solid var(--ae-border)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <span className="ae-corner ae-tl" style={{ width: "10px", height: "10px" }} />
              <span className="ae-corner ae-br" style={{ width: "10px", height: "10px" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ae-text)" }}>{r.item}</span>
              <span style={{ fontSize: "12px", color: "var(--ae-muted)", textAlign: "right" }}>{r.note}</span>
            </div>
          ))}
        </div>
      </AeSection>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ae-bg)", padding: "64px 16px" }}>
        <div className="container mx-auto max-w-5xl">
          <div
            style={{
              position: "relative",
              background: "var(--ae-card)",
              border: "1px solid var(--ae-border)",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <span className="ae-corner ae-tl" />
            <span className="ae-corner ae-tr" />
            <span className="ae-corner ae-bl" />
            <span className="ae-corner ae-br" />
            <div className="ae-eyebrow" style={{ justifyContent: "center" }}>Want to learn more?</div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--ae-text)",
                marginBottom: "12px",
              }}
            >
              Want notebooks, simulation scripts, or the controller settings?
            </h3>
            <p style={{ color: "var(--ae-muted)", fontSize: "14px", marginBottom: "28px" }}>
              Reach out to discuss the modeling approach, estimator design, or LQR tuning.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={refLetter} target="_blank" rel="noopener noreferrer" className="ae-btn-primary">
                View Reference Letter →
              </a>
              <a href="/#contact" className="ae-btn-outline">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
