import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar";
// ⬇️ Optional images (add later to enable the gallery)
// import scIso from "../assets/spacecraft_iso.png";
// import starTrackerFov from "../assets/startracker_fov.png";
// import wheelBlock from "../assets/reaction_wheels.png";
// import simAttitude from "../assets/attitude_response.png";

// ⬇️ Optional video config — use ONE of the following:
// Local MP4
import scVideo from "../assets/spacecraft.mp4";
const VIDEO_SRC = scVideo;
import spacecraft_photo from '../assets/spacecraft_photo.png';
import { Footer } from "./Footer";

// OR YouTube embed
// const YT_ID = "YOUR_YOUTUBE_VIDEO_ID";

// --- Spacecraft with Star Tracker — Page (Tailwind utility version matched to Skid/Drone) ---

const SPEC_ROWS = [
  { label: "Platform", value: "Rigid spacecraft with 3‑axis reaction wheels" },
  { label: "Sensors", value: "Star tracker (absolute attitude) + gyros (rates)" },
  { label: "Control Law", value: "LQR state‑feedback on linearized attitude dynamics" },
  { label: "Estimator", value: "Gyro integration + star‑tracker updates" },
  { label: "Linearization", value: "About nominal pointing attitude (hover/hold)" },
  { label: "Simulator", value: "Python · MATLAB · SymPy · Matplotlib" },
];

const ARTIFACTS = [
  { item: "Nonlinear attitude dynamics derivation", qty: "1", note: "Rigid body + wheel coupling" },
  { item: "Linearized state‑space (A,B,C,D)", qty: "1", note: "Quaternion‑error small‑angle model" },
  { item: "LQR controller implementation", qty: "1", note: "Wheel torque inputs; weight presets" },
  { item: "Estimator block (optional)", qty: "1", note: "MEKF/complementary structure with star tracker updates" },
  { item: "Plots &amp; simulation scripts", qty: "10+", note: "Step/hold disturbance tests, wheel torques" },
];

// Optional gallery: keep empty to hide the section; add as needed.
const GALLERY = [
  { src: spacecraft_photo, alt: "Spacecraft model with reaction wheels" },
  // { src: starTrackerFov, alt: "Star tracker field of view" },
  // { src: wheelBlock, alt: "Reaction wheel torque block" },
  // { src: simAttitude, alt: "Attitude response plot" },
];

export default function Spacecraft() {
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
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Spacecraft Attitude Control with Star Tracker</h1>
              <p className="mt-3 opacity-80">
                Developed a control system for a spacecraft using reaction wheels and a star tracker for precise orientation. Modeled and linearized spacecraft dynamics, then designed LQR-based controllers to stabilize and command attitude. Simulated performance under disturbances to validate pointing accuracy and stability.

              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Attitude","Estimation","Control","Simulation"].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="4 weeks" />
                <Meta k="Role" v="Modeling · Controls · Estimation" />
                <Meta k="Tools" v="Python • MATLAB • SymPy • Matplotlib" />
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
                  <span className="text-xs opacity-60">Add spacecraft images to enable the gallery preview</span>
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
              ["video","Video"],
              ["build","Build Process"],
              ["specs","Specs"],
              ["artifacts","Artifacts"],
              ["faq","FAQ"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className="opacity-80 hover:opacity-100">{label}</a>
            ))}
          </nav>
        </div>
      </div>


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
                title="Spacecraft with Star Tracker — Explainer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-sm opacity-80">
              Fun walkthrough of the star tracker integration and wheel control loop.
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
            ["Dynamics Modeling","Formulated rigid-body equations of motion for a 3‑axis spacecraft; incorporated gravity‑gradient torque and reaction‑wheel dynamics."],
            ["Linearization + State Setup","Expanded nonlinear dynamics around nominal equilibrium; defined a state‑space model with quaternion/angle representation and wheel speeds."],
            ["Control Design","Applied LQR techniques for full‑state feedback; tuned cost matrices to balance stability, responsiveness, and control effort."],
            ["Sensor Integration","Modeled star‑tracker measurements with realistic noise; incorporated sensor fusion for state feedback."],
            ["Simulation &amp; Testing","Ran Monte Carlo simulations in MATLAB/Python; injected disturbances and sensor noise to validate stability and pointing accuracy."],
            ["Results + Verification","Verified closed‑loop stability; demonstrated fast settling, minimal overshoot, and robust disturbance rejection."]
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

      <Section id="artifacts" title="Artifacts (Files)">
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
              {ARTIFACTS.map((r, idx) => (
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
          {[
            ["How accurate can a star tracker really be?","Modern star trackers can measure orientation to within a few arcseconds, making them extremely precise."],
            ["What’s the biggest challenge in simulating spacecraft dynamics?","Capturing the nonlinear behavior of rotational motion while keeping the model efficient for control design."],
            ["How is noise from space sensors handled in simulations?","By adding realistic random noise to measurement models, then testing if the control system remains stable and accurate."]
          ].map(([q,a]) => (
            <div key={q} className="rounded-xl border bg-card p-4">
              <div className="font-medium">{q}</div>
              <div className="mt-1 text-sm opacity-80">{a}</div>
            </div>
          ))}
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
          <p className="opacity-80">Want notebooks, plots, or the controller/estimator settings?</p>
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
