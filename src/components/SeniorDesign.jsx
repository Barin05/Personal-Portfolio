import { useState } from "react";
import { SmallNavbar } from "./SmallNavbar";
import { Footer } from "./Footer";

import fdrReport from "../assets/2026_FDR_Monkey_s_Fist-1.pdf";
import skyRender from "../assets/skybetterrender.jpg";
import onCarrier from "../assets/oncarrier (1).jpg";
import frontSkyRender from "../assets/frontskyrender.jpg";
import topSkyRender from "../assets/topskyrender.jpg";

/* ── Data ─────────────────────────────────────────────── */

const MISSION_REQS = [
  { label: "Cruise Mach", value: "0.93 at 30,000 ft" },
  { label: "Dash Mach", value: "2.0 at 30,000 ft" },
  { label: "Combat Radius", value: "1,000 nm" },
  { label: "Combat Time", value: "5 min" },
  { label: "Max Approach Speed", value: "145 KTAS" },
  { label: "OEI ROC at Launch", value: "200 ft/min" },
  { label: "Single-Engine ROC", value: "500 ft/min (approach)" },
  { label: "Max Landing Weight", value: "~40,500 lb" },
];

const AIRCRAFT_SPECS = [
  { label: "MTOW", value: "~62,449 lb" },
  { label: "Empty Weight", value: "~31,119 lb" },
  { label: "Max Payload", value: "10,000 lb" },
  { label: "Fuselage", value: "600 in long, 72 in dia." },
  { label: "Wing Area (S_ref)", value: "483 ft²" },
  { label: "Aspect Ratio", value: "3.7" },
  { label: "LE Sweep", value: "40°" },
  { label: "t/c", value: "0.06" },
  { label: "Taper Ratio", value: "0.43" },
  { label: "Ultimate Load Factor", value: "N_ult = 12 (1.5 × 8g)" },
];

const ENGINE_SPECS = [
  { label: "Engine Model", value: "Modified GE F110-132" },
  { label: "Configuration", value: "Single-engine" },
  { label: "Bypass Ratio", value: "0.70 (supersonic-optimized)" },
  { label: "SL Static Dry Thrust", value: "18,540 lb" },
  { label: "SFC (dry)", value: "0.72 lb/(lb·hr)" },
  { label: "SFC (afterburner)", value: "1.99 lb/(lb·hr)" },
  { label: "Fan Diameter", value: "46.5 in" },
  { label: "Core Pressure Ratio", value: "~33.3" },
  { label: "Burner Exit Temp", value: "~3,145 R (~2,685°F)" },
  { label: "Total Airflow", value: "275.7 lb/s" },
];

const INLET_SPECS = [
  { label: "Type", value: "Dual DSI (Divertless Supersonic)" },
  { label: "Design Condition", value: "Mach 2.0 at 30,000 ft" },
  { label: "Airflow per Inlet", value: "~138 lbm/s" },
  { label: "Engine Face Mach", value: "0.60" },
  { label: "Duct Loss Method", value: "Fanno flow analysis" },
];

const LG_SPECS = [
  { label: "Configuration", value: "Tricycle" },
  { label: "Nose Gear", value: "Twin wheels (≥19 in dia.)" },
  { label: "Sink Rate Design", value: "20 ft/s (carrier)" },
  { label: "Stroke Method", value: "Currey energy eq., N = 5g" },
  { label: "Nose Tire", value: "22×6.50-10 (Goodyear 2022)" },
  { label: "Main Tire", value: "28×9.0-14 (Goodyear 2022)" },
];

const PROPULSION_STEPS = [
  {
    title: "Engine Cycle Modeling",
    body: "Modeled the GE F110 turbofan cycle in GasTurb in both dry and afterburning configurations. Iterated BPR from baseline to 0.70, optimizing for supersonic dash performance while maintaining acceptable SFC at cruise.",
  },
  {
    title: "Performance Mapping",
    body: "Generated SFC vs. Thrust plots and Mach/altitude contour maps for dry and wet power settings. These fed directly into the aircraft sizing code for fuel weight estimation and constraint diagram analysis.",
  },
  {
    title: "Thrust-Weight Matching",
    body: "Used constraint diagram (dash Mach 2.0, sustained 8°/s turn at FL200, stall speed) to select the design point. Final: AR = 3.7, S_ref = 483 ft², LE sweep = 40°.",
  },
  {
    title: "Survivability Planning",
    body: "Designed redundancy for single-engine operation: EPU, dual electrical buses, split hydraulics / EHA actuators, ballistic firewalls, redundant igniters, and a defined restart envelope.",
  },
];

const INLET_STEPS = [
  {
    title: "Inlet Type Selection",
    body: "Selected external-compression supersonic inlets — two inlets, one per side — feeding a single engine. External compression chosen for simplicity, weight, and compatibility with fuselage geometry.",
  },
  {
    title: "Sizing at Design Condition",
    body: "Sized each inlet for ~138 lbm/s at Mach 2.0 / 30,000 ft, targeting engine face Mach 0.60. Used normal shock relations and ISA atmosphere to set inlet geometry.",
  },
  {
    title: "Fanno Flow Analysis",
    body: "Completed Fanno flow calculations to account for friction losses in the inlet duct, refining pressure recovery estimates. CFD verification was planned as a follow-on step.",
  },
];

const LG_STEPS = [
  {
    title: "CG & Geometry Layout",
    body: "Established nose and main gear positions relative to the aircraft CG envelope. Verified tip-over and tip-back angle constraints across the full CG range.",
  },
  {
    title: "Stroke Sizing",
    body: "Applied the Currey energy absorption equation at carrier sink rate 20 ft/s and landing load factor 5g to determine required oleo strut stroke for nose and main gear.",
  },
  {
    title: "Tire Selection",
    body: "Selected nose and main tires from the Goodyear Aviation Databook 2022 based on load rating, dimensional fit, and carrier requirements (nose wheels ≥19 in to clear the catapult).",
  },
  {
    title: "CAD Modeling",
    body: "Produced CAD geometry of the tricycle configuration to verify ground clearance, door envelope, and folded stow volume for carrier deck operations.",
  },
];

const ARTIFACTS = [
  { item: "GasTurb engine model", note: "F110 cycle data — BPR 0.76 optimized, dry & afterburning" },
  { item: "Inlet sizing notebook", note: "Fanno flow, normal shock, ISA atmosphere" },
  { item: "SFC vs Thrust plots", note: "Contour maps vs altitude & Mach (dry & wet)" },
  { item: "Landing gear sizing notebook", note: "Currey stroke, tire selection, CG limits" },
  { item: "Landing gear CAD", note: "Tricycle geometry with twin nose wheels" },
  { item: "Aircraft sizing code (V3)", note: "Iterative convergence; wave drag via Delta method" },
  { item: "Master sizing sheet", note: "MTOW, empty weight, fuel fractions" },
  { item: "Final Design Report (FDR)", note: "Full team report — 100+ pages" },
];

const GALLERY = [
  { src: skyRender, alt: "Kestrel in flight — sky render" },
  { src: onCarrier, alt: "Kestrel on carrier deck" },
  { src: frontSkyRender, alt: "Kestrel — front view" },
  { src: topSkyRender, alt: "Kestrel — top view" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "propulsion", label: "Propulsion" },
  { id: "landing-gear", label: "Landing Gear" },
  { id: "specs", label: "Specs" },
  { id: "gallery", label: "Gallery" },
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

const StepCard = ({ title, body }) => (
  <div
    style={{
      position: "relative",
      background: "var(--ae-card)",
      border: "1px solid var(--ae-border)",
      padding: "20px 22px",
    }}
  >
    <span className="ae-corner ae-tl" />
    <span className="ae-corner ae-br" />
    <div
      style={{
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        color: "var(--ae-text)",
        marginBottom: "8px",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: "13px", color: "var(--ae-muted)", lineHeight: 1.75 }}>
      {body}
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

export default function SeniorDesign() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open = (idx) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  };
  const next = (e) => {
    e?.stopPropagation();
    setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY.length));
  };

  return (
    <div style={{ background: "var(--ae-bg)", color: "var(--ae-text)", minHeight: "100vh", overflowX: "hidden", textAlign: "left" }}>
      <SmallNavbar />

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
        {/* Aircraft image — right side, fades left */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={skyRender}
            alt="Kestrel strike fighter"
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

        {/* Content */}
        <div
          className="container mx-auto max-w-5xl"
          style={{ position: "relative", zIndex: 10, padding: "120px 16px 80px" }}
        >
          <div className="ae-eyebrow">AE443 · Senior Design Capstone · Spring 2026</div>

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
            Kestrel.
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--ae-muted)",
              marginBottom: "28px",
              maxWidth: "480px",
            }}
          >
            Naval carrier-capable single-engine strike fighter designed to a full RFP — Mach 2.0 dash, 1,000 nm combat radius.
          </p>

          {/* Role chips */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {["Propulsion Lead", "Landing Gear Lead", "GasTurb", "Python", "Aircraft Design"].map((t) => (
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

          {/* Meta row */}
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
              { k: "Timeline", v: "Spring 2026" },
              { k: "Team", v: "Monkey's Fist" },
              { k: "Tools", v: "GasTurb · Python · MATLAB · AutoCAD" },
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
            <a href={fdrReport} target="_blank" rel="noopener noreferrer" className="ae-btn-primary">
              View Final Report →
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
          background: "rgba(8,11,18,0.95)",
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
      <AeSection id="overview" eyebrow="Mission" title={<>Project <span style={{ color: "var(--ae-accent)" }}>Overview</span></>} bg="var(--ae-bg)" grid={false}>
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "36px", maxWidth: "720px" }}>
          The Kestrel is a conceptual single-engine, carrier-capable naval strike fighter designed to meet a full RFP. Team Monkey's Fist selected a single-engine configuration for cost-effectiveness (precedent: F-35C, A-7), with survivability addressed through an EPU, redundant electrical buses, split hydraulics, and ballistic firewalls. My scope covered all of propulsion and landing gear from initial sizing through the Final Design Review.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {MISSION_REQS.map((r) => (
            <SpecCard key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </AeSection>

      {/* ── PROPULSION ──────────────────────────────────── */}
      <AeSection id="propulsion" eyebrow="Propulsion System" title={<>Engine <span style={{ color: "var(--ae-accent)" }}>Design</span></>} bg="var(--ae-bg2)" grid={true}>
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px", maxWidth: "720px" }}>
          I modeled the engine cycle in GasTurb using the GE F110 as the design basis, targeting supersonic performance with a low bypass ratio of 0.70. The single-engine configuration required careful sizing to meet OEI climb requirements at launch. I achieved a +7% efficiency gain by reducing the bypass ratio, and sized the dual DSI inlets for Mach 2.0 at 30,000 ft using Fanno flow analysis.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "36px" }}>
          {PROPULSION_STEPS.map((s) => <StepCard key={s.title} {...s} />)}
        </div>

        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ae-accent)", marginBottom: "16px" }}>
          Engine Specifications
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "40px" }}>
          {ENGINE_SPECS.map((r) => <SpecCard key={r.label} label={r.label} value={r.value} />)}
        </div>

        <div style={{ borderTop: "1px solid var(--ae-border)", paddingTop: "40px" }}>
          <div className="ae-eyebrow" style={{ marginBottom: "16px" }}>Inlet Design</div>
          <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px", maxWidth: "720px" }}>
            Selected dual divertless supersonic inlets (DSI) — one per side feeding a single engine. Sized each for ~138 lbm/s at the Mach 2.0 design condition using normal shock relations, ISA atmosphere, and Fanno flow for duct pressure recovery.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {INLET_STEPS.map((s) => <StepCard key={s.title} {...s} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {INLET_SPECS.map((r) => <SpecCard key={r.label} label={r.label} value={r.value} />)}
          </div>
        </div>
      </AeSection>

      {/* ── LANDING GEAR ────────────────────────────────── */}
      <AeSection id="landing-gear" eyebrow="Landing Gear" title={<>Gear <span style={{ color: "var(--ae-accent)" }}>Design</span></>} bg="var(--ae-bg)" grid={false}>
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px", maxWidth: "720px" }}>
          Sized the landing gear for carrier operations — 20 ft/s sink rate design condition versus the typical 10–12 ft/s for land-based aircraft. The tricycle configuration uses twin nose wheels to straddle the carrier catapult, with stroke computed via the Currey energy equation at 5g.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "36px" }}>
          {LG_STEPS.map((s) => <StepCard key={s.title} {...s} />)}
        </div>

        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ae-accent)", marginBottom: "16px" }}>
          Landing Gear Specifications
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {LG_SPECS.map((r) => <SpecCard key={r.label} label={r.label} value={r.value} />)}
        </div>
      </AeSection>

      {/* ── AIRCRAFT SPECS ──────────────────────────────── */}
      <AeSection id="specs" eyebrow="Aircraft Data" title={<>Full <span style={{ color: "var(--ae-accent)" }}>Specifications</span></>} bg="var(--ae-bg2)" grid={true}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {AIRCRAFT_SPECS.map((r) => <SpecCard key={r.label} label={r.label} value={r.value} />)}
        </div>
      </AeSection>

      {/* ── GALLERY ─────────────────────────────────────── */}
      <AeSection id="gallery" eyebrow="Renders" title={<>Aircraft <span style={{ color: "var(--ae-accent)" }}>Gallery</span></>} bg="var(--ae-bg)" grid={false}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {GALLERY.map((img, idx) => (
            <button
              key={idx}
              onClick={() => open(idx)}
              style={{
                position: "relative",
                background: "none",
                border: "1px solid var(--ae-border)",
                padding: 0,
                cursor: "pointer",
                overflow: "hidden",
                display: "block",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ae-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--ae-border)")}
            >
              <span className="ae-corner ae-tl" />
              <span className="ae-corner ae-br" />
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,11,18,0.7) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "14px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ae-muted)",
                }}
              >
                {img.alt}
              </div>
            </button>
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
              See the Full Design Report
            </h3>
            <p style={{ color: "var(--ae-muted)", fontSize: "14px", marginBottom: "28px" }}>
              100+ pages covering propulsion, structures, aerodynamics, landing gear, and systems.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={fdrReport} target="_blank" rel="noopener noreferrer" className="ae-btn-primary">
                View Final Report →
              </a>
              <a href="/#contact" className="ae-btn-outline">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(8,11,18,0.93)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "var(--ae-card)",
              border: "1px solid var(--ae-border)",
              color: "var(--ae-text)",
              padding: "6px 16px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Close
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--ae-card)",
              border: "1px solid var(--ae-border)",
              color: "var(--ae-accent)",
              width: "40px",
              height: "40px",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", border: "1px solid var(--ae-border)" }}>
            <span className="ae-corner ae-tl" />
            <span className="ae-corner ae-tr" />
            <span className="ae-corner ae-bl" />
            <span className="ae-corner ae-br" />
            <img
              src={GALLERY[lightboxIndex].src}
              alt={GALLERY[lightboxIndex].alt}
              style={{ display: "block", maxHeight: "82vh", maxWidth: "90vw", objectFit: "contain" }}
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--ae-card)",
              border: "1px solid var(--ae-border)",
              color: "var(--ae-accent)",
              width: "40px",
              height: "40px",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
