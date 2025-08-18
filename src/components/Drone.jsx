import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar";
// ⬇️ Add drone images later (uncomment + point to real files)
// import simStep from "../assets/drone_step.png";
// import simTrack from "../assets/drone_track.png";
// import quadIso from "../assets/drone_iso.png";
// import gainSweep from "../assets/drone_gains.png";

// ⬇️ Optional video config — use ONE of the following:
// For a local file in /assets
import droneVideo from "../assets/DP4 Riyad and Bradley.mp4";
import { Footer } from "./Footer";
const VIDEO_SRC = droneVideo;
// Optional poster/thumbnail image
// const VIDEO_POSTER = require("../assets/drone_poster.jpg");
//
// For a YouTube/Vimeo embed
// const YT_ID = "YOUR_YOUTUBE_VIDEO_ID";

// --- Drone Page — Tailwind utility version matched to SkidPage ---

const SPEC_ROWS = [
  { label: "Platform", value: "4‑rotor quadcopter (X configuration)" },
  { label: "State Vector", value: "x, y, z, ϕ, θ, ψ, and body rates p, q, r" },
  { label: "Dynamics", value: "6‑DOF COM + Euler‑angle attitude; rotor thrust/torque coupling" },
  { label: "Control Law", value: "LQR state‑feedback + feedforward for reference tracking" },
  { label: "Linearization", value: "About hover equilibrium (trim)" },
  { label: "Simulator", value: "Python · NumPy · SciPy · SymPy · Matplotlib" },
];

const BOM_ITEMS = [
  { item: "Nonlinear dynamics derivation (notebook)", qty: "1", note: "Symbolic model + equations" },
  { item: "Linearization &amp; state‑space model", qty: "1", note: "A, B, C, D around hover" },
  { item: "LQR controller implementation", qty: "1", note: "Q/R tuning presets" },
  { item: "Feedforward reference block", qty: "1", note: "Trajectory tracking" },
  { item: "Plotting utilities &amp; figures", qty: "10+", note: "Step, chirp, and path tracking plots" },
];

// Optional gallery: keep empty to hide the section; add as needed.
const GALLERY = [
  // { src: simStep, alt: "Attitude step response" },
  // { src: simTrack, alt: "3D trajectory tracking" },
  // { src: quadIso, alt: "Quadrotor geometry (X‑frame)" },
  // { src: gainSweep, alt: "Gain sweep metrics" },
];

export default function Drone() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open = (idx) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)); };
  const next = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)); };

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      <SmallNavbar />
      <ThemeToggle />
      <StarBackground />

      {/* HERO */}
      <section className="relative">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <p className="uppercase tracking-widest text-sm opacity-70">Project</p>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Racing Quadrotor Drone (LQR)</h1>
              <p className="mt-3 opacity-80">
                Nonlinear quadcopter model with real‑time attitude control for racing‑style maneuvers.
                Built a digital twin, linearized about hover, and designed an LQR + feedforward controller
                for fast, stable tracking under aggressive setpoints.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Dynamics","Control","Simulation","Python"].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="4 weeks" />
                <Meta k="Role" v="Modeling / Controls / Analysis" />
                <Meta k="Tools" v="Python • NumPy • SciPy • SymPy • Matplotlib" />
              </div>
            </div>
            <div>
              {GALLERY.length > 0 ? (
                <>
                  <button onClick={() => open(0)} className="w-full aspect-video overflow-hidden rounded-xl border bg-card card-hover">
                    {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                    <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-cover" />
                  </button>
                  <p className="mt-2 text-center text-xs opacity-70">Click to open gallery</p>
                </>
              ) : (
                <div className="w-full aspect-video rounded-xl border bg-card grid place-items-center">
                  <span className="text-xs opacity-60">Add drone images to enable the gallery preview</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TABS */}
      <div className="sticky top-0 z-20 border-y bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-3 text-sm">
          <nav className="flex flex-wrap gap-4">
            {[
              ["overview","Overview"],
              ["gallery","Gallery"],
              ["video","Video"],
              ["build","Build Process"],
              ["specs","Specs"],
              ["bom","Artifacts"],
              ["faq","FAQ"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className="opacity-80 hover:opacity-100">{label}</a>
            ))}
          </nav>
        </div>
      </div>

      <Section id="overview" title="Overview">
        <p>
          This project models a symmetric quadrotor with six degrees of freedom and designs a controller
          aimed at racing responsiveness. I derived the nonlinear equations of motion, linearized about hover,
          and used an LQR state‑feedback controller with a small feedforward term for reference tracking.
          Performance was validated with step, chirp, and trajectory tests, balancing rise/settle times against
          control effort and cross‑axis coupling.
        </p>
        <ul className="mt-4 list-disc list-inside opacity-80 text-sm">
          <li>Digital twin captures COM and attitude dynamics with rotor coupling</li>
          <li>Hover‑point linearization yields A/B/C/D for controller synthesis</li>
          <li>LQR weights tuned via sweeps; verified robustness to modest disturbances</li>
          <li>Clear plots and metrics for quick design iteration and comparison</li>
        </ul>
      </Section>

      <Section id="gallery" title="Gallery">
        {GALLERY.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {GALLERY.map((img, i) => (
              <button key={img.src} onClick={() => open(i)} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-card card-hover">
                {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-4 text-sm opacity-80">
            No images yet. Import your sim figures or model renders at the top of this file and add them to <code>GALLERY</code>.
          </div>
        )}
      </Section>

      <Section id="video" title="Video">
        {/* Render a local MP4 if VIDEO_SRC is defined; else render YouTube if YT_ID is defined */}
        {typeof VIDEO_SRC !== "undefined" ? (
          <div className="rounded-xl border bg-card p-3">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                controls
                preload="metadata"
                poster={typeof VIDEO_POSTER !== "undefined" ? VIDEO_POSTER : undefined}
                className="h-full w-full object-cover"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-2 text-sm opacity-80">
              Fun story video, describing the build process and results.
            </p>
          </div>
        ) : (typeof YT_ID !== "undefined" ? (
          <div className="rounded-xl border bg-card p-3">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${YT_ID}`}
                title="Racing Quadrotor Drone — Explainer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-sm opacity-80">
              Fun walkthrough of what we built and how the controller works.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-4 text-sm opacity-80">
            Add a video by defining <code>VIDEO_SRC</code> for a local file or <code>YT_ID</code> for a YouTube embed at the top of this file.
          </div>
        ))}
      </Section>

      <Section id="build" title="Build Process (Step‑by‑Step)">
        <ol className="grid gap-3">
          {[
            ["Model setup","Defined frames, mass/inertia, rotor geometry, thrust/torque coefficients; chose Euler angles (ϕ, θ, ψ)."],
            ["Dynamics derivation","Formulated 6‑DOF COM and attitude equations with gravity and rotor moments."],
            ["Linearization","Expanded about hover to get an LTI state‑space model for design and analysis."],
            ["Controller design","Solved LQR for multiple Q/R choices; added feedforward for reference tracking."],
            ["Simulation &amp; tuning","Ran step, chirp, and path‑tracking tests; logged rise/settle, overshoot, and input usage."],
            ["Visualization &amp; reporting","Generated comparative plots and a concise write‑up of trade‑offs."]
          ].map(([t,body]) => (
            <li key={t} className="rounded-xl border bg-card p-4">
              <div className="font-medium">{t}</div>
              <div className="mt-1 text-sm opacity-80" dangerouslySetInnerHTML={{__html: body}} />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="specs" title="Technical Specs">
        <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {SPEC_ROWS.map((row) => (
            <div key={row.label} className="rounded-xl border bg-card p-4">
              <dt className="text-[11px] uppercase tracking-wider opacity-70">{row.label}</dt>
              <dd className="mt-1 font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="bom" title="Artifacts (Files)">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-sm opacity-70">
                <th className="rounded-l-xl bg-card px-3 py-2">Item</th>
                <th className="bg-card px-3 py-2">Qty</th>
                <th className="rounded-r-xl bg-card px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BOM_ITEMS.map((r, idx) => (
                <tr key={idx}>
                  <td className="rounded-l-xl bg-card px-3 py-2 font-medium" dangerouslySetInnerHTML={{__html: r.item}} />
                  <td className="bg-card px-3 py-2">{r.qty}</td>
                  <td className="rounded-r-xl bg-card px-3 py-2 opacity-80" dangerouslySetInnerHTML={{__html: r.note}} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="faq" title="FAQ">
        <div className="grid gap-3">
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">Why LQR for racing?</div>
            <div className="mt-1 text-sm opacity-80">It offers fast, well‑damped responses with interpretable weighting. Great baseline before moving to MPC or nonlinear controllers.</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">How is yaw coupling handled?</div>
            <div className="mt-1 text-sm opacity-80">Axis‑wise weights and feedforward reduce cross‑axis interactions; tuning targets minimal overshoot and quick settling.</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">Can this run on hardware?</div>
            <div className="mt-1 text-sm opacity-80">Yes! the model/controller structure is hardware‑ready; next steps are system ID and onboard constraints.</div>
          </div>
        </div>
      </Section>

      {/* LIGHTBOX */}
      {GALLERY.length > 0 && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={close}>
          <button
            className="absolute left-4 top-4 rounded-full border bg-background/80 px-3 py-1 text-sm backdrop-blur"
            onClick={(e) => { e.stopPropagation(); close(); }}
          >
            Close
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border bg-background/80 p-2" onClick={prev}>◀</button>
          <div className="max-h-[85vh] max-w-[95vw] w-auto overflow-hidden rounded-2xl border bg-card p-2 md:p-4">
            {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            <img src={GALLERY[lightboxIndex].src} alt={GALLERY[lightboxIndex].alt} className="block max-h-[80vh] max-w-[92vw] md:max-w-[85vw] w-auto h-auto object-contain" />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border bg-background/80 p-2" onClick={next}>▶</button>
        </div>
      )}

      {/* CTA */}
      <section className="container pb-16">
        <div className="mt-10 rounded-2xl border bg-card p-6 text-center">
          <p className="opacity-80">Want notebooks, plots, or the controller settings?</p>
          <a href="/#contact" className="mt-3 inline-flex cosmic-button">Get in touch</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="container py-10">
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      <div className="mt-4 leading-relaxed">{children}</div>
    </section>
  );
}

function Meta({ k, v }) {
  return (
    <div className="flex items-center gap-2 mr-6">
      <span className="text-[11px] uppercase tracking-[0.12em] opacity-70">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}
