import { useState } from "react";
import website from "../assets/website.png";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/* ── Data ─────────────────────────────────────────────── */

const SPECS = [
  { label: "Frontend", value: "React 19 + Vite 7" },
  { label: "Styling", value: "Tailwind CSS v4 + custom CSS tokens" },
  { label: "Routing", value: "react-router-dom (client-side SPA)" },
  { label: "State", value: "React hooks (useState, useEffect, useRef)" },
  { label: "Deployment", value: "Hostinger + GitHub (CI/CD pipeline)" },
  { label: "Design", value: "Aerospace-themed dark UI with grid, bracket corners, accent colors" },
];

const ARTIFACTS = [
  { item: "Component library", note: "Navbar · Hero · About · Experience · Skills · Projects · Contact · Footer" },
  { item: "Project detail pages", note: "Kestrel · Drone · Spacecraft · Skid · Maze · Website" },
  { item: "CSS design system", note: "Custom tokens, ae-grid-bg, ae-corner, ae-eyebrow, ae-btn-* utilities" },
  { item: "FloatingCTA", note: "Fixed right-edge Resume + Hire Me tabs with pulse indicator" },
  { item: "Star canvas", note: "requestAnimationFrame star field rendered via useRef + useEffect" },
  { item: "Routing & deployment", note: "react-router-dom SPA config + Hostinger hosting" },
];

const TABS = [
  { id: "overview", label: "Overview" },
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

export default function Website() {
  return (
    <div
      style={{
        background: "var(--ae-bg)",
        color: "var(--ae-text)",
        minHeight: "100vh",
        overflowX: "hidden",
        textAlign: "left",
      }}
    >
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
            src={website}
            alt="Portfolio website screenshot"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "60%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          <div className="ae-hero-img-fade" />
        </div>

        <div
          className="container mx-auto max-w-5xl ae-project-hero-content" style={{ position: "relative", zIndex: 10, padding: "120px 16px 80px" }}
        >
          <div className="ae-eyebrow">React · Tailwind · Full-Stack · 2025</div>

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
            Portfolio Website.
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--ae-muted)",
              marginBottom: "28px",
              maxWidth: "480px",
            }}
          >
            Aerospace-themed personal portfolio built with React + Vite + Tailwind CSS v4. Custom design system, star canvas, and fully responsive project pages.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {["React", "Tailwind CSS", "Vite", "JavaScript", "CI/CD"].map((t) => (
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
              { k: "Timeline", v: "3 weeks" },
              { k: "Role", v: "Design · Frontend · Deployment" },
              { k: "Tools", v: "React · Vite · Tailwind · Hostinger" },
            ].map(({ k, v }) => (
              <div key={k}>
                <div
                  style={{
                    color: "var(--ae-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                  }}
                >
                  {k}
                </div>
                <div style={{ color: "var(--ae-text)", fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="#overview" className="ae-btn-primary">
              Explore Project →
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
      <AeSection
        id="overview"
        eyebrow="Project"
        title={<>Project <span style={{ color: "var(--ae-accent)" }}>Overview</span></>}
        bg="var(--ae-bg)"
        grid={false}
      >
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, maxWidth: "720px" }}>
          Designed and built a fully responsive aerospace-themed personal portfolio from scratch — my first web project. Built on React 19 + Vite 7 + Tailwind CSS v4 with a custom design system of CSS tokens, grid backgrounds, bracket corner decorations, and accent utilities. Includes an animated star canvas, a floating Resume/Hire Me CTA, and six individual project detail pages with consistent hero, tab nav, specs, and artifact layouts. Deployed via Hostinger with a GitHub CI/CD pipeline.
        </p>
      </AeSection>

      {/* ── SPECS ───────────────────────────────────────── */}
      <AeSection
        id="specs"
        eyebrow="System Data"
        title={<>Technical <span style={{ color: "var(--ae-accent)" }}>Specifications</span></>}
        bg="var(--ae-bg2)"
        grid={true}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {SPECS.map((r) => (
            <SpecCard key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </AeSection>

      {/* ── ARTIFACTS ───────────────────────────────────── */}
      <AeSection
        id="artifacts"
        eyebrow="Deliverables"
        title={<>Work <span style={{ color: "var(--ae-accent)" }}>Artifacts</span></>}
        bg="var(--ae-bg)"
        grid={false}
      >
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
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ae-text)" }}>
                {r.item}
              </span>
              <span style={{ fontSize: "12px", color: "var(--ae-muted)", textAlign: "right" }}>
                {r.note}
              </span>
            </div>
          ))}
        </div>
      </AeSection>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ae-bg2)", padding: "64px 16px" }}>
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
            <div className="ae-eyebrow" style={{ justifyContent: "center" }}>
              Want to learn more?
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--ae-text)",
                marginBottom: "12px",
              }}
            >
              Want a walkthrough or the source code?
            </h3>
            <p
              style={{
                color: "var(--ae-muted)",
                fontSize: "14px",
                marginBottom: "28px",
              }}
            >
              Happy to walk through the design system, component architecture, or deployment setup.
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="/#contact" className="ae-btn-primary">
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
