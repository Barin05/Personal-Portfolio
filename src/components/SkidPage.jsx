import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar"
import skid from '../assets/skid.png';
import isoskid from '../assets/IsoSkid.png';
import frontskid from '../assets/frontskid.png';
import nametag from '../assets/nametag.png';
import skidupclose from '../assets/skidupclose.png';
import backskid from '../assets/backskid.png';
import structure from '../assets/structure_skid.png';
import { Footer } from "./Footer";



// SkidPage — Tailwind utility version wired to your index.css tokens/utilities

const SPEC_ROWS = [
  { label: "Scale", value: "1:19 scale model" },
  { label: "Overall Dimensions", value: "1.6 × 1.0 × 0.5 ft" },
  { label: "Materials", value: "PLA / PETG + threaded inserts + fasteners" },
  { label: "Print Settings", value: "0.2 mm layer, 20% infill (varied)" },
  { label: "CAD & Slicer", value: "AutoCAD / Navisworks refs, modeled in CAD, sliced in Cura" },
  { label: "Assembly", value: "M3/M4 fasteners; heat‑set inserts; CA glue for fixtures" },
];

const BOM_ITEMS = [
  { item: "PLA/PETG filament", qty: "~0.9 kg", note: "Grey + Orange" },
  { item: "M3 socket cap screws", qty: "40", note: "various lengths" },
  { item: "M4 socket cap screws", qty: "24", note: "—" },
  { item: "Threaded brass inserts (M3)", qty: "36", note: "heat‑set" },
  { item: "Loctite 243", qty: "1", note: "assembly" },
];

const GALLERY = [
  { src: skid, alt: "Assembled skid model" },
  { src: backskid, alt: "Rear view of skid" },
  { src: isoskid, alt: "Isometric view" },
  { src: frontskid, alt: "Front view of skid" },
  { src: nametag, alt: "Nametag close-up" },
  { src: skidupclose, alt: "Component close-up" },
];

export default function SkidPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open = (idx) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)); };
  const next = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)); };

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-x-hidden">
        <SmallNavbar/>
        <ThemeToggle />
      <StarBackground />
      {/* HERO */}
      <section className="relative">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <p className="uppercase tracking-widest text-sm opacity-70">Project</p>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Ethane Trap Skid (24\")</h1>
              <p className="mt-3 opacity-80">
                A compact, scale model of a process trap skid built to communicate layout, valve
                access, and maintenance flow. Modeled from P&amp;IDs/ISOs and printed as a modular
                assembly for demos and design reviews.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['3D Printing','CAD','Piping','Process Layout'].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="100 hours" />
                <Meta k="Role" v="Mechanical / CAD / Build" />
                <Meta k="Tools" v="AutoCAD • Cura • Navisworks • Bluebeam Revu" />
              </div>
            </div>
            <div>
              <button onClick={() => open(0)} className="w-full aspect-video overflow-hidden rounded-xl border bg-card card-hover">
                {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-cover" />
              </button>
              <p className="mt-2 text-center text-xs opacity-70">Click to open gallery</p>
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
              ["build","Build Process"],
              ["specs","Specs"],
              ["bom","BOM"],
              ["faq","FAQ"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className="opacity-80 hover:opacity-100">{label}</a>
            ))}
          </nav>
        </div>
      </div>

      <Section id="overview" title="Overview">
        <p>
          This project highlights my work on designing and fabricating a 24” scale model of an Ethane Trap Skid to support process 
          layout reviews and client demos. The goal was to create a compact, durable representation of an industrial system that would clearly 
          communicate valve placement, piping access, and maintenance flow without relying solely on CAD drawings.
        </p>
        <ul className="mt-4 list-disc list-inside opacity-80 text-sm">
            <li>Purpose: Demonstrating layouts, onboarding new team members, and validating designs</li>
            <li>Constraints: Printer bed limits, part durability, and assembly accessibility</li>
            <li>Outcomes: Accelerated design reviews and improved clarity of maintenance workflows</li>
        </ul>
      </Section>

      <Section id="gallery" title="Gallery">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {GALLERY.map((img, i) => (
            <button key={img.src} onClick={() => open(i)} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-card card-hover">
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </Section>

      <Section id="build" title="Build Process (Step‑by‑Step)">
        <ol className="grid gap-3">
          {[
                ["Reference capture","Pulled P&IDs, ISOs, and GA drawings; tagged valve classes, flange ratings, and nozzle orientations to mirror field hardware."],
                ["CAD & segmentation","Modeled subassemblies, split for printer bed, and added chamfers/clearances, tapped holes, and heat-set insert pockets."],
                ["Slicing & tuning","0.2 mm layers and ~20% infill; balanced walls vs. print time; batched overnight runs; labeled parts for fast sorting."],
                ["Post-processing","Heat-set inserts, dry-fits, light sanding; press-fit dowels on long runs for clean alignment."],
                ["Assembly & QA","Torque check + threadlocker; tap-test for looseness; verified valve reach, handwheel swing, and maintenance clearances."]
            ].map(([t,body]) => (
            <li key={t} className="rounded-xl border bg-card p-4">
              <div className="font-medium">{t}</div>
              <div className="mt-1 text-sm opacity-80">{body}</div>
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

      <Section id="bom" title="Bill of Materials (BOM)">
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
                  <td className="rounded-l-xl bg-card px-3 py-2 font-medium">{r.item}</td>
                  <td className="bg-card px-3 py-2">{r.qty}</td>
                  <td className="rounded-r-xl bg-card px-3 py-2 opacity-80">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

    

      <Section id="faq" title="FAQ">
        <div className="grid gap-3">
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">Why a physical model?</div>
            <div className="mt-1 text-sm opacity-80">Faster design reviews and clearer maintenance paths for non‑CAD folks.</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">How long did it take?</div>
            <div className="mt-1 text-sm opacity-80">40 CAD + 40 print time + 20 assembly hours.</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="font-medium">Could this be scaled?</div>
            <div className="mt-1 text-sm opacity-80">Yes. Sections are modular. Possibility to re‑slice for larger printers or CNC.</div>
          </div>
        </div>
      </Section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
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
          <p className="opacity-80">Want build notes or the STEP files?</p>
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
