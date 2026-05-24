import kestrel from "../assets/skybetterrender.jpg";
import drone from "../assets/drone.png";
import spacecraft from "../assets/Spacecraft_photo.png";
import skid from "../assets/skid.png";
import fdrPdf from "../assets/2026_FDR_Monkey_s_Fist-1.pdf";

const gridProjects = [
  {
    title: "Racing Quadrotor Drone",
    category: "Controls",
    description:
      "Full-state control system for a racing quadrotor drone using advanced control techniques.",
    image: drone,
    tags: ["Python", "MATLAB", "SymPy"],
    href: "/drone",
  },
  {
    title: "Spacecraft Attitude Control",
    category: "Aerospace",
    description:
      "Attitude determination and control simulation for a 3-axis stabilized spacecraft.",
    image: spacecraft,
    tags: ["Python", "MATLAB"],
    href: "/spacecraft",
  },
  {
    title: '24" Ethane Trap Skid',
    category: "MechE",
    description:
      'Design and 3D print of a 24" Ethane Trap Skid for a process engineering client.',
    image: skid,
    tags: ["AutoCAD", "Cura", "3D Printing"],
    href: "/skid",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" style={{ background: "var(--ae-bg)" }}>
      {/* ── Featured Kestrel Block ── */}
      <div className="kestrel-block ae-grid-bg">
        {/* Aircraft image fills right side */}
        <div className="kestrel-img-wrap">
          <img src={kestrel} alt="Kestrel aircraft render" className="kestrel-img" />
          <div className="kestrel-img-fade" />
        </div>

        {/* Content */}
        <div className="kestrel-content">
          <span className="kestrel-badge">Featured Work — AE443 Capstone</span>

          <h2 className="kestrel-title">Kestrel.</h2>

          <p style={{ fontSize: "15px", color: "var(--ae-muted)", marginBottom: "16px" }}>
            Naval carrier-capable single-engine strike fighter
          </p>

          <div className="kestrel-desc">
            <span className="ae-corner ae-tl" style={{ width: "12px", height: "12px" }} />
            <span className="ae-corner ae-br" style={{ width: "12px", height: "12px" }} />
            Propulsion lead &amp; landing gear lead for a Mach 2.0-capable carrier strike
            fighter designed for the US Navy. Responsible for engine cycle analysis
            (GasTurb), inlet design (DSI), landing gear sizing, and integration trade
            studies.
          </div>

          <div className="kestrel-specs">
            {[
              { value: "Mach 2.0", label: "Dash Speed" },
              { value: "1,000 nm", label: "Combat Radius" },
              { value: "62,449 lb", label: "MTOW" },
              { value: "F110-GE-132", label: "Engine" },
            ].map(({ value, label }) => (
              <div key={label} className="kestrel-spec-item">
                <span className="kestrel-spec-value">{value}</span>
                <span className="kestrel-spec-label">{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="/senior-design" className="ae-btn-primary">
              Explore Design →
            </a>
            <a
              href={fdrPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ae-btn-outline"
            >
              View FDR
            </a>
          </div>
        </div>

        {/* Annotation callouts */}
        <div className="kestrel-annotation" style={{ top: "32%", right: "28%" }}>
          <span className="kestrel-annotation-dot" />
          Dual DSI Inlets
        </div>
        <div className="kestrel-annotation" style={{ top: "62%", right: "22%" }}>
          <span className="kestrel-annotation-dot" />
          Tricycle LG
        </div>
      </div>

      {/* ── Diamond Divider ── */}
      <div
        className="ae-diamond-divider"
        style={{ background: "var(--ae-bg)", padding: "40px 0 28px" }}
      >
        <span className="ae-diamond" />
      </div>

      {/* ── Other Projects Grid ── */}
      <div className="px-4 pb-20" style={{ background: "var(--ae-bg)" }}>
        <div className="container mx-auto max-w-5xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {gridProjects.map((proj) => (
              <a key={proj.title} href={proj.href} className="ae-project-card">
                <span className="ae-corner ae-tl" />
                <span className="ae-corner ae-br" />
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="ae-project-card-img"
                />
                <div className="ae-project-card-body">
                  <span className="ae-project-tag">{proj.category}</span>
                  <div className="ae-project-card-title">{proj.title}</div>
                  <div className="ae-project-card-desc">{proj.description}</div>
                  <div className="ae-project-chips">
                    {proj.tags.map((t) => (
                      <span key={t} className="ae-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="ae-project-arrow">Explore →</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="/projects" className="ae-btn-outline">
              View All Projects →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
