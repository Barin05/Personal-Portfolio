import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import skid from "../assets/skid.png";
import website from "../assets/website.png";
import drone from "../assets/drone.png";
import maze from "../assets/maze.jpg";
import spacecraft_photo from "../assets/Spacecraft_photo.png";
import kestrel from "../assets/skybetterrender.jpg";

/* ── Data ─────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0,
    title: "Kestrel — Naval Strike Fighter",
    description:
      "Propulsion lead & landing gear lead for a carrier-capable single-engine strike fighter. GasTurb engine modeling, supersonic inlet sizing, and carrier landing gear design.",
    image: kestrel,
    tags: ["GasTurb", "Python", "Aircraft Design", "MATLAB"],
    href: "/senior-design",
    category: "AE",
  },
  {
    id: 1,
    title: '24" Ethane Trap Skid',
    description:
      "Design and 3D print of a 24″ Ethane Trap Skid for an industry client. Full CAD model, print preparation, and assembly documentation.",
    image: skid,
    tags: ["AutoCAD", "Cura", "3D Printing"],
    href: "/skid",
    category: "MechE",
  },
  {
    id: 2,
    title: "Racing Quadrotor Drone",
    description:
      "Full-state LQR control system for a 6-DOF quadrotor, linearized about hover equilibrium. Validated with step, chirp, and path-tracking simulations.",
    image: drone,
    tags: ["Python", "MATLAB", "LQR", "SymPy"],
    href: "/drone",
    category: "AE",
  },
  {
    id: 3,
    title: "Spacecraft Attitude Control",
    description:
      "Symbolic modeling, linearization, and LQR control of a 3-axis rigid spacecraft using reaction wheels and a star tracker for absolute attitude measurement.",
    image: spacecraft_photo,
    tags: ["Python", "Control Systems", "Aerospace"],
    href: "/spacecraft",
    category: "AE",
  },
  {
    id: 4,
    title: "Maddening Mazes — C++",
    description:
      "Maze generation & solving with DFS/BFS, shortest-path visualization, and solver benchmark suite built in modern C++.",
    image: maze,
    tags: ["C++", "DFS", "BFS", "Algorithms"],
    href: "/maze",
    category: "Tech",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Aerospace-themed personal portfolio — React + Vite + Tailwind CSS v4, custom star canvas, and fully responsive design.",
    image: website,
    tags: ["React", "Tailwind", "JavaScript", "Vite"],
    href: "/website",
    category: "Tech",
  },
];

const CATEGORIES = ["All", "AE", "MechE", "Tech"];

const CATEGORY_LABELS = {
  AE: "Aerospace",
  MechE: "Mechanical",
  Tech: "Software",
};

/* ── Project Card ──────────────────────────────────────── */

const ProjectCard = ({ project }) => (
  <a
    href={project.href}
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      background: "var(--ae-card)",
      border: "1px solid var(--ae-border)",
      textDecoration: "none",
      overflow: "hidden",
      transition: "border-color 0.2s, transform 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--ae-accent)";
      e.currentTarget.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--ae-border)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {/* Corner brackets */}
    <span className="ae-corner ae-tl" />
    <span className="ae-corner ae-tr" />
    <span className="ae-corner ae-bl" />
    <span className="ae-corner ae-br" />

    {/* Image */}
    <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
      <img
        src={project.image}
        alt={project.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transition: "transform 0.5s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ae-accent)",
          background: "rgba(8,11,18,0.85)",
          border: "1px solid var(--ae-border)",
          padding: "3px 10px",
        }}
      >
        {CATEGORY_LABELS[project.category] ?? project.category}
      </div>
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(transparent, var(--ae-card))",
        }}
      />
    </div>

    {/* Body */}
    <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ae-accent)",
              border: "1px solid var(--ae-border)",
              padding: "3px 8px",
              background: "rgba(108,140,255,0.07)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3
        style={{
          fontSize: "15px",
          fontWeight: 800,
          color: "var(--ae-text)",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          color: "var(--ae-muted)",
          lineHeight: 1.7,
          flex: 1,
          marginBottom: "16px",
        }}
      >
        {project.description}
      </p>

      {/* CTA row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--ae-border)",
          paddingTop: "12px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ae-accent)",
          }}
        >
          View Project →
        </span>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ae-muted)",
          }}
        >
          {CATEGORY_LABELS[project.category] ?? project.category}
        </span>
      </div>
    </div>
  </a>
);

/* ── Main component ────────────────────────────────────── */

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = PROJECTS.filter((p) =>
    filter === "All" ? true : p.category === filter
  );

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

      {/* ── HERO ───────────────────────────────────────── */}
      <section
        className="ae-grid-bg"
        style={{
          backgroundColor: "var(--ae-bg2)",
          padding: "160px 16px 80px",
          position: "relative",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="ae-eyebrow">Aerospace · Engineering · Software</div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 7vw, 4.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ae-text)",
              marginBottom: "16px",
            }}
          >
            All <span style={{ color: "var(--ae-accent)" }}>Projects.</span>
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--ae-muted)",
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            A running catalogue of what I've designed, modeled, and shipped —
            from carrier strike fighter propulsion to C++ maze solvers.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { k: "Total Projects", v: `${PROJECTS.length}` },
              { k: "Aerospace", v: `${PROJECTS.filter((p) => p.category === "AE").length}` },
              { k: "Software", v: `${PROJECTS.filter((p) => p.category === "Tech").length}` },
              { k: "Mechanical", v: `${PROJECTS.filter((p) => p.category === "MechE").length}` },
            ].map(({ k, v }) => (
              <div key={k}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ae-muted)",
                    marginBottom: "2px",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "var(--ae-accent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────── */}
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
        <div
          className="container mx-auto max-w-5xl"
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <nav style={{ display: "flex", gap: "0", overflowX: "auto" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: filter === cat ? "var(--ae-accent)" : "var(--ae-muted)",
                  background: "none",
                  border: "none",
                  borderBottom: filter === cat
                    ? "2px solid var(--ae-accent)"
                    : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (filter !== cat) e.currentTarget.style.color = "var(--ae-text)";
                }}
                onMouseLeave={(e) => {
                  if (filter !== cat) e.currentTarget.style.color = "var(--ae-muted)";
                }}
              >
                {cat === "All"
                  ? `All (${PROJECTS.length})`
                  : `${CATEGORY_LABELS[cat]} (${PROJECTS.filter((p) => p.category === cat).length})`}
              </button>
            ))}
          </nav>

          <Link
            to="/"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ae-muted)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "14px 0 14px 20px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ae-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ae-muted)")}
          >
            ← Home
          </Link>
        </div>
      </div>

      {/* ── GRID ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--ae-bg)", padding: "64px 16px 80px" }}>
        <div className="container mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--ae-muted)",
                padding: "80px 0",
                fontSize: "14px",
              }}
            >
              No projects in this category yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section
        className="ae-grid-bg"
        style={{ backgroundColor: "var(--ae-bg2)", padding: "64px 16px" }}
      >
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
              Let's work together
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--ae-text)",
                marginBottom: "12px",
              }}
            >
              Interested in what I build?
            </h3>
            <p
              style={{
                color: "var(--ae-muted)",
                fontSize: "14px",
                marginBottom: "28px",
                maxWidth: "440px",
                margin: "0 auto 28px",
              }}
            >
              I'm open to full-time roles, internships, and research collaborations
              in aerospace and software engineering.
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
              <a href="/" className="ae-btn-outline">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
