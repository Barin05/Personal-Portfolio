import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar";
import website from "../assets/website.png";
import { Footer } from "./Footer";
// ⬇️ Optional screenshots (uncomment & add real files to enable the gallery)
// import heroShot from "../assets/website_hero.png";
// import darkMode from "../assets/website_dark.png";
// import timeline from "../assets/website_timeline.png";
// import filters from "../assets/website_filters.png";

// --- Personal Portfolio Website — Page (same layout as your other project pages) ---

const SPEC_ROWS = [
  { label: "Frontend", value: "React, Vite, Tailwind CSS" },
  { label: "Routing", value: "react-router-dom (client-side)" },
  { label: "State", value: "React hooks" },
  { label: "Theming", value: "Dark/Light mode with ThemeToggle" },
  { label: "Deployment", value: "Hostinger + GitHub (CI/CD)" },
  { label: "Extras", value: "Animated backgrounds, project filters, responsive layout" },
];

const ARTIFACTS = [
  { item: "Source code (React + Tailwind)", qty: "1 repo", note: "Component-based UI with utility classes" },
  { item: "Build config (Vite)", qty: "1", note: "Fast dev server + optimized build" },
  { item: "Routing setup", qty: "1", note: "Project pages (Skid, Drone, Spacecraft, Maze)" },
  { item: "Deployment files", qty: "2", note: "Hostinger settings + GitHub workflow" },
];

// Optional gallery: keep empty to hide the section; add as needed.
const GALLERY = [
  { src: website, alt: "Homepage hero" },
  // { src: darkMode, alt: "Dark mode UI" },
  // { src: timeline, alt: "Animated timeline" },
  // { src: filters, alt: "Project filter chips" },
];

export default function Website() {
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
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Personal Portfolio Website</h1>
              <p className="mt-3 opacity-80">
                Responsive portfolio built with React + Tailwind + Vite. Includes dark/light theming,
                animated backgrounds, project filters, and consistent project pages with sticky tabs,
                galleries, and CTAs.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["React","Tailwind","Routing","CI/CD"].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="3 weeks" />
                <Meta k="Role" v="Design · Frontend · Deployment" />
                <Meta k="Tools" v="React • Vite • Tailwind • Hostinger • GitHub" />
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
                  <span className="text-xs opacity-60">Add website screenshots to enable the gallery preview</span>
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

      <Section id="overview" title="Overview">
        <p>
          I designed and shipped a clean, fast portfolio focused on consistency and reuse. Shared components
          (Navbar, ThemeToggle, StarBackground, Section helpers) keep pages uniform. Project pages follow the
          same UX: hero, sticky tabs, overview, build, specs, artifacts, FAQ, and a CTA.
        </p>
        <ul className="mt-4 list-disc list-inside opacity-80 text-sm">
          <li>Reusable layout and tokens for a consistent look</li>
          <li>Dark/light theme and responsive components</li>
          <li>Fast dev/build times with Vite</li>
          <li>Deployed via Hostinger + GitHub CI/CD</li>
        </ul>
      </Section>

      <Section id="build" title="Build Process (Step‑by‑Step)">
        <ol className="grid gap-3">
          {[
            ["Design &amp; Layout","Sketched layout, sections, and navigation; built with reusable components."],
            ["Implementation","React components with Tailwind utilities; accessibility and responsive tweaks."],
            ["Dynamic Features","Dark/Light theme, animated background, project filters, sticky tabs."],
            ["Deployment","Hostinger + GitHub; automatic builds from main branch."],
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
            ["Why build your own portfolio?","To present projects interactively and control the UX/brand beyond a static PDF."],
            ["Why React + Tailwind?","Modular components and rapid styling with consistent tokens."],
            ["What was tricky?","Balancing animations with performance and keeping pages consistent."],
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
          <p className="opacity-80">Want the code or a walkthrough?</p>
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