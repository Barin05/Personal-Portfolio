import { useState } from "react";
import skid from '../assets/skid.png';
import isoskid from '../assets/IsoSkid.png';
import frontskid from '../assets/frontskid.png';
import nametag from '../assets/nametag.png';
import skidupclose from '../assets/skidupclose.png';
import backskid from '../assets/backskid.png';
import structure from '../assets/structure_skid.png';
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/* ── Data ─────────────────────────────────────────────── */

const SPECS = [
  { label: "Scale", value: "1:19 scale model" },
  { label: "Overall Dimensions", value: "1.6 × 1.0 × 0.5 ft" },
  { label: "Materials", value: "PLA / PETG + threaded inserts + fasteners" },
  { label: "Print Settings", value: "0.2 mm layer, 20% infill (varied)" },
  { label: "CAD & Slicer", value: "AutoCAD / Navisworks refs, sliced in Cura" },
  { label: "Assembly", value: "M3/M4 fasteners; heat-set inserts; CA glue" },
];

const BOM = [
  { item: "PLA/PETG filament", note: "~0.9 kg — Grey + Orange" },
  { item: "M3 socket cap screws", note: "40 pcs, various lengths" },
  { item: "M4 socket cap screws", note: "24 pcs" },
  { item: "Threaded brass inserts (M3)", note: "36 pcs — heat-set" },
  { item: "Loctite 243", note: "Thread locker — assembly" },
];

const GALLERY = [
  { src: skid, alt: "Assembled skid model" },
  { src: backskid, alt: "Rear view" },
  { src: isoskid, alt: "Isometric view" },
  { src: frontskid, alt: "Front view" },
  { src: nametag, alt: "Nametag detail" },
  { src: skidupclose, alt: "Component close-up" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "specs", label: "Specs" },
  { id: "bom", label: "BOM" },
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

export default function SkidPage() {
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
            src={skid}
            alt="Ethane Trap Skid model"
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
          <div className="ae-eyebrow">MechE · 3D Print · 2024</div>

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
            Ethane Trap Skid.
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--ae-muted)",
              marginBottom: "28px",
              maxWidth: "480px",
            }}
          >
            1:19 scale model of a 24" Ethane Trap Skid — designed to support process layout reviews and client demos.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {["3D Printing", "AutoCAD", "Cura", "Process Layout", "MechE"].map((t) => (
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
              { k: "Timeline", v: "~100 hours" },
              { k: "Role", v: "Mechanical / CAD / Build" },
              { k: "Tools", v: "AutoCAD · Cura · Navisworks" },
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
      <AeSection id="overview" eyebrow="Project" title={<>Project <span style={{ color: "var(--ae-accent)" }}>Overview</span></>} bg="var(--ae-bg)" grid={false}>
        <p style={{ color: "var(--ae-muted)", fontSize: "14px", lineHeight: 1.8, maxWidth: "720px" }}>
          Designed and fabricated a 1:19 scale model of a 24" Ethane Trap Skid to support process layout reviews and client demos. Modeled from P&IDs and ISOs, printed as a modular assembly with PLA/PETG, and assembled with heat-set inserts and threaded fasteners. The model communicates valve placement, piping access, and maintenance flow in a form non-CAD stakeholders can interact with directly.
        </p>
      </AeSection>

      {/* ── GALLERY ─────────────────────────────────────── */}
      <AeSection id="gallery" eyebrow="Build Photos" title={<>Model <span style={{ color: "var(--ae-accent)" }}>Gallery</span></>} bg="var(--ae-bg2)" grid={true}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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

      {/* ── SPECS ───────────────────────────────────────── */}
      <AeSection id="specs" eyebrow="Build Data" title={<>Technical <span style={{ color: "var(--ae-accent)" }}>Specifications</span></>} bg="var(--ae-bg)" grid={false}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {SPECS.map((r) => (
            <SpecCard key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </AeSection>

      {/* ── BOM ─────────────────────────────────────────── */}
      <AeSection id="bom" eyebrow="Materials" title={<>Bill of <span style={{ color: "var(--ae-accent)" }}>Materials</span></>} bg="var(--ae-bg2)" grid={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {BOM.map((r, i) => (
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
              Want build notes or the STEP files?
            </h3>
            <p style={{ color: "var(--ae-muted)", fontSize: "14px", marginBottom: "28px" }}>
              Reach out to discuss the build process, CAD files, or print settings.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/#contact" className="ae-btn-primary">
                Get in Touch →
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
