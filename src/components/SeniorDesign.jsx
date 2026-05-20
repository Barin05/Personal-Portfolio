import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar";
import { Footer } from "./Footer";

import fdrReport from "../assets/2026_FDR_Monkey_s_Fist-1.pdf";
import skyRender from "../assets/skybetterrender.jpg";
import onCarrier from "../assets/oncarrier (1).jpg";
import frontSkyRender from "../assets/frontskyrender.jpg";
import topSkyRender from "../assets/topskyrender.jpg";

const MISSION_REQS = [
  { label: "Cruise Mach", value: "0.93 at 30,000 ft" },
  { label: "Dash Mach", value: "2.0 at 30,000 ft" },
  { label: "Combat Radius", value: "1000 nm" },
  { label: "Combat Time", value: "5 min" },
  { label: "Max Approach Speed", value: "145 KTAS" },
  { label: "OEI ROC at Launch", value: "200 ft/min" },
  { label: "Single-Engine ROC (approach)", value: "500 ft/min" },
  { label: "Max Landing Weight", value: "~40,500 lb" },
];

const AIRCRAFT_SPECS = [
  { label: "MTOW", value: "~62,449 lb" },
  { label: "Empty Weight", value: "~31,119 lb" },
  { label: "Max Payload", value: "10,000 lb" },
  { label: "Fuselage", value: "600 in long, 72 in diameter" },
  { label: "Wing Area (S_ref)", value: "483 ft²" },
  { label: "Aspect Ratio", value: "3.7" },
  { label: "LE Sweep", value: "40°" },
  { label: "t/c", value: "0.06" },
  { label: "Taper Ratio", value: "0.43" },
  { label: "Ultimate Load Factor", value: "N_ult = 12 (1.5 × 8g)" },
];

const ENGINE_SPECS = [
  { label: "Engine Model", value: "Modified GE F110-132" },
  { label: "Number of Engines", value: "1 (single-engine)" },
  { label: "Bypass Ratio", value: "0.70 (supersonic-optimized)" },
  { label: "SL Static Dry Thrust", value: "18,540 lb" },
  { label: "SFC (no afterburner)", value: "0.72 lb/(lb·hr)" },
  { label: "SFC (afterburner)", value: "1.99 lb/(lb·hr)" },
  { label: "Fan Diameter", value: "46.5 in" },
  { label: "Core Pressure Ratio", value: "~33.3" },
  { label: "Burner Exit Temp", value: "~3,145 R (~2,685°F)" },
  { label: "Total Airflow", value: "275.7 lb/s" },
];

const INLET_SPECS = [
  { label: "Type", value: "Two divertless supersonic inlets (DSI)" },
  { label: "Design Condition", value: "Mach 2.0 at 30,000 ft" },
  { label: "Total Engine Airflow", value: "275.7 lbm/s (~138 lbm/s per inlet)" },
  { label: "Engine Face Mach", value: "0.60" },
  { label: "Duct Loss Method", value: "Fanno flow analysis" },
];

const LG_SPECS = [
  { label: "Configuration", value: "Tricycle" },
  { label: "Nose Gear", value: "Twin wheels (carrier catapult requirement, ≥19 in diameter)" },
  { label: "Sink Rate Design", value: "20 ft/s (carrier landing)" },
  { label: "Stroke Method", value: "Currey energy equation, N = 5g" },
  { label: "Nose Tire", value: "22×6.50-10 (Goodyear Aviation 2022)" },
  { label: "Main Tire", value: "28×9.0-14 (Goodyear Aviation 2022)" },
];

const ARTIFACTS = [
  { item: "GasTurb engine model (dry & afterburning)", note: "F110 cycle data; BPR 0.76 optimized" },
  { item: "Inlet sizing notebook", note: "Fanno flow, normal shock, ISA atmosphere" },
  { item: "SFC vs Thrust plots (dry & wet)", note: "Contour maps vs altitude & Mach" },
  { item: "Landing gear sizing notebook", note: "Currey stroke, tire selection, CG limits" },
  { item: "Landing gear CAD", note: "Tricycle geometry with twin nose wheels" },
  { item: "Aircraft sizing code (Sizing_RFP_V3)", note: "Iterative convergence; wave drag via Delta method" },
  { item: "Master sizing sheet", note: "MTOW, empty weight, fuel fractions" },
  { item: "Final Design Report (FDR)", note: "Full team report — add PDF above to enable download" },
];

const GALLERY = [
  { src: skyRender, alt: "Kestrel in flight — sky render" },
  { src: onCarrier, alt: "Kestrel on carrier deck" },
  { src: frontSkyRender, alt: "Kestrel — front sky render" },
  { src: topSkyRender, alt: "Kestrel — top sky render" },
];

export default function SeniorDesign() {
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
              <p className="uppercase tracking-widest text-sm opacity-70">AE443 · Senior Design Capstone · Spring 2026</p>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Kestrel — Carrier-Capable Naval Strike Fighter</h1>
              <p className="mt-3 opacity-80">
                As Propulsion Lead and Landing Gear Lead for Team Monkey's Fist, I designed the full propulsion system for a single-engine naval strike fighter, from engine cycle modeling in GasTurb to supersonic inlet sizing, and sized the tricycle landing gear to carrier landing standards. The Kestrel is a conceptual F/A-18 / F-35C class aircraft designed to a full RFP with cruise Mach 0.94, dash Mach 2.0, and a 1000 nm mission radius.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Propulsion", "Landing Gear", "GasTurb", "Aircraft Design", "Carrier Aviation"].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="Spring 2026" />
                <Meta k="Role" v="Propulsion Lead · Landing Gear Lead" />
                <Meta k="Tools" v="GasTurb · Python · MATLAB · AutoCAD" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={fdrReport}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/80 transition-colors duration-300"
                >
                  View Final Report (PDF)
                </a>
                <a
                  href="/#contact"
                  className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
            <div>
              {GALLERY.length > 0 ? (
                <>
                  <button onClick={() => open(0)} className="w-full aspect-video overflow-hidden rounded-xl border bg-card card-hover">
                    <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-cover" />
                  </button>
                  <p className="mt-2 text-center text-xs opacity-70">Click to open gallery</p>
                </>
              ) : (
                <div className="w-full aspect-video rounded-xl border bg-card grid place-items-center">
                  <span className="text-xs opacity-60">Add aircraft images to enable gallery preview</span>
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
              ["overview", "Overview"],
              ["propulsion", "Propulsion"],
              ["landing-gear", "Landing Gear"],
              ["specs", "Specs"],
              ["artifacts", "Artifacts"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="opacity-80 hover:opacity-100">{label}</a>
            ))}
          </nav>
        </div>
      </div>

      {/* OVERVIEW */}
      <Section id="overview" title="Project Overview">
        <p className="opacity-80 mb-6">
          The Kestrel is a conceptual single-engine, carrier-capable naval strike fighter designed to meet a full Request for Proposals (RFP). The team, Monkey's Fist, selected a single-engine configuration for cost-effectiveness (precedent: F-35C, A-7), with survivability addressed through an EPU, redundant electrical buses, split hydraulics, and ballistic firewalls. My scope covered all of propulsion and landing gear from initial sizing through the Final Design Review.
        </p>
        <h3 className="font-semibold mb-3">Mission Requirements</h3>
        <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {MISSION_REQS.map((row) => (
            <div key={row.label} className="rounded-xl border bg-card p-4">
              <dt className="text-[11px] uppercase tracking-wider opacity-70">{row.label}</dt>
              <dd className="mt-1 font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* PROPULSION */}
      <Section id="propulsion" title="Propulsion System">
        <p className="opacity-80 mb-6">
          I modeled the engine cycle in GasTurb using the GE F110 as the design basis, targeting supersonic performance with a low bypass ratio of 0.70. The single-engine configuration required careful sizing to meet the OEI (one engine inoperative) climb requirements at launch. I achieved a +7% efficiency gain by reducing the bypass ratio, and sized the dual external-compression inlets for Mach 2.0 at 30,000 ft using Fanno flow analysis for duct losses.
        </p>

        <div className="grid gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-3">Engine Design</h3>
            <ol className="grid gap-3">
              {[
                ["Engine Cycle Modeling", "Used GasTurb to model the GE F110 turbofan cycle in both dry and afterburning configurations. Iterated BPR from a baseline to 0.70, optimizing for supersonic dash performance while maintaining acceptable SFC at cruise."],
                ["Performance Mapping", "Generated SFC vs. Thrust plots and Mach/altitude contour maps for both dry and wet (afterburning) power settings. These fed directly into the aircraft sizing code for fuel weight estimation and constraint diagram analysis."],
                ["Thrust-Weight Matching", "Used constraint diagram (dash Mach 2.0, sustained 8 deg/s turn at FL200, stall speed) to select the design point. Final selection: AR = 3.7, S_ref = 483 ft², LE sweep = 30°."],
                ["Survivability Planning", "Designed redundancy for single-engine operation: emergency power unit (EPU), dual electrical buses, split hydraulics / EHA actuators, ballistic firewalls, redundant igniters, and a defined restart envelope."],
              ].map(([t, body]) => (
                <li key={t} className="rounded-xl border bg-card p-4">
                  <div className="font-medium">{t}</div>
                  <div className="mt-1 text-sm opacity-80">{body}</div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Engine Specs</h3>
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {ENGINE_SPECS.map((row) => (
                <div key={row.label} className="rounded-xl border bg-card p-4">
                  <dt className="text-[11px] uppercase tracking-wider opacity-70">{row.label}</dt>
                  <dd className="mt-1 font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Inlet Design</h3>
            <ol className="grid gap-3 mb-4">
              {[
                ["Inlet Type Selection", "Selected external compression supersonic inlets — two inlets, one per side — to feed a single engine. External compression chosen for simplicity, weight, and compatibility with the fuselage geometry."],
                ["Sizing at Design Condition", "Sized each inlet for ~138 lbm/s at Mach 2.0 / 30,000 ft. Targeted an engine face Mach of 0.60. Used normal shock relations and ISA atmosphere to set inlet geometry."],
                ["Fanno Flow Analysis", "Completed Fanno flow calculations to account for friction losses in the inlet duct, refining the pressure recovery estimate. CFD verification was planned as a follow-on step."],
              ].map(([t, body]) => (
                <li key={t} className="rounded-xl border bg-card p-4">
                  <div className="font-medium">{t}</div>
                  <div className="mt-1 text-sm opacity-80">{body}</div>
                </li>
              ))}
            </ol>
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {INLET_SPECS.map((row) => (
                <div key={row.label} className="rounded-xl border bg-card p-4">
                  <dt className="text-[11px] uppercase tracking-wider opacity-70">{row.label}</dt>
                  <dd className="mt-1 font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* LANDING GEAR */}
      <Section id="landing-gear" title="Landing Gear">
        <p className="opacity-80 mb-6">
          I sized the landing gear for carrier operations, the most demanding landing environment, requiring a 20 ft/s sink rate design condition versus the typical 10–12 ft/s for land-based aircraft. The tricycle configuration uses twin nose wheels to straddle the carrier catapult, and the stroke was computed via the Currey energy equation at 5g. Tires were selected from the Goodyear Aviation Databook 2022.
        </p>

        <div className="grid gap-6">
          <div>
            <h3 className="font-semibold mb-3">Design Process</h3>
            <ol className="grid gap-3">
              {[
                ["CG & Geometry Layout", "Established nose gear and main gear positions relative to the aircraft CG envelope. Verified tip-over and tip-back angle constraints across the full CG range."],
                ["Stroke Sizing", "Applied the Currey energy absorption equation at the carrier sink rate of 20 ft/s and a landing load factor of 5g to determine required oleo strut stroke for both nose and main gear."],
                ["Tire Selection", "Selected nose and main tires from the Goodyear Aviation Databook 2022 based on load rating, dimensional fit, and carrier-specific requirements (nose wheels ≥19 in diameter to clear the catapult)."],
                ["CAD Modeling", "Produced CAD geometry of the tricycle configuration to verify ground clearance, door envelope, and folded stow volume for carrier deck operations."],
              ].map(([t, body]) => (
                <li key={t} className="rounded-xl border bg-card p-4">
                  <div className="font-medium">{t}</div>
                  <div className="mt-1 text-sm opacity-80">{body}</div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Landing Gear Specs</h3>
            <dl className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {LG_SPECS.map((row) => (
                <div key={row.label} className="rounded-xl border bg-card p-4">
                  <dt className="text-[11px] uppercase tracking-wider opacity-70">{row.label}</dt>
                  <dd className="mt-1 font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ARTIFACTS */}
      <Section id="artifacts" title="Deliverables & Artifacts">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-sm opacity-70">
                <th className="rounded-l-xl bg-card px-3 py-2">Artifact</th>
                <th className="rounded-r-xl bg-card px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ARTIFACTS.map((r, idx) => (
                <tr key={idx}>
                  <td className="rounded-l-xl bg-card px-3 py-2 font-medium">{r.item}</td>
                  <td className="rounded-r-xl bg-card px-3 py-2 opacity-80">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <img src={GALLERY[lightboxIndex].src} alt={GALLERY[lightboxIndex].alt} className="block max-h-[80vh] max-w-[92vw] md:max-w-[85vw] w-auto h-auto object-contain" />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border bg-background/80 p-2" onClick={next}>▶</button>
        </div>
      )}

      {/* CTA */}
      <section className="container pb-16">
        <div className="mt-10 rounded-2xl border bg-card p-6 text-center">
          <p className="opacity-80">Want to see the GasTurb outputs, sizing notebooks, or talk through the design?</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a href={fdrReport} target="_blank" rel="noopener noreferrer" className="inline-flex cosmic-button">View Final Report (PDF)</a>
            <a href="/#contact" className="inline-flex px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">Get in Touch</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="container py-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="leading-relaxed">{children}</div>
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
