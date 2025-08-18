import React, { useState } from "react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { SmallNavbar } from "./SmallNavbar";
import maze from "../assets/maze.jpg";
import { Footer } from "./Footer";

// ⬇️ Optional images (add later to enable the gallery)
// import mazeGrid from "../assets/maze_grid.png";
// import mazeSolve from "../assets/maze_solve.png";
// import mazeRender from "../assets/maze_render.png";
// import mazeStats from "../assets/maze_stats.png";

// --- Maddening Maze — Page (Tailwind utility version matched to Skid/Drone) ---

const SPEC_ROWS = [
  { label: "Language", value: "C++" },
  { label: "Core Class", value: "SquareMaze (generate, solve, render)" },
  { label: "Generation", value: "Randomized wall removals with Disjoint Sets or DFS carve" },
  { label: "Solver", value: "BFS for shortest path / DFS exploration (configurable)" },
  { label: "Complexity", value: "O(N α(N)) gen (DSU), O(N) solve (BFS)" },
  { label: "Rendering", value: "PNG drawing utilities for maze + path overlay" },
];

const ARTIFACTS = [
  { item: "SquareMaze.hpp / .cpp", qty: "2", note: "API: makeMaze, solveMaze, drawMaze, drawMazeWithSolution" },
  { item: "DisjointSets.hpp / .cpp", qty: "2", note: "Union‑Find for perfect maze generation" },
  { item: "Tests", qty: "10+", note: "Correctness & edge cases (1×1, thin mazes, large N)" },
  { item: "Render outputs", qty: "5+", note: "PNGs of maze only and with solution" },
  { item: "Perf notes", qty: "1", note: "Time/space behavior with large grids" },
];

// Optional gallery: keep empty to hide the section; add as needed.
const GALLERY = [
    { src: maze, alt: "Generated maze grid" },
  // { src: mazeSolve, alt: "Path found by solver" },
  // { src: mazeRender, alt: "Rendered PNG of maze" },
  // { src: mazeStats, alt: "Statistics of runs" },
];

export default function Maze() {
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
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Maddening Maze (SquareMaze)</h1>
              <p className="mt-3 opacity-80">
                A data‑structures and algorithms project that generates perfect mazes and computes
                optimal paths. Implemented a <em>SquareMaze</em> class in C++ with randomized
                generation, BFS/DFS solvers, and PNG renderers for visualization.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Algorithms","C++","Data Structures","Visualization"].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Meta k="Timeline" v="2 weeks" />
                <Meta k="Role" v="Design · Implementation · Testing" />
                <Meta k="Tech" v="C++ • Disjoint Sets • BFS/DFS • PNG" />
              </div>
            </div>
            <div>
              {GALLERY.length > 0 ? (
                <>
                  <button onClick={() => open(0)} className="w-full aspect-video overflow-hidden rounded-xl border bg-card card-hover">
                    {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                    <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-contain" />
                  </button>
                  <p className="mt-2 text-center text-xs opacity-70">Click to open gallery</p>
                </>
              ) : (
                <div className="w-full aspect-video rounded-xl border bg-card grid place-items-center">
                  <span className="text-xs opacity-60">Add maze images to enable the gallery preview</span>
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
          The project creates a <strong>perfect maze</strong> (exactly one path between any two cells) using
          randomized wall removals governed by a Disjoint Set (Union‑Find) or depth‑first carve. The solver
          uses BFS to compute a shortest path, with optional DFS exploration for comparison. Render utilities
          output PNGs of both the maze and the solution overlay.
        </p>
        <ul className="mt-4 list-disc list-inside opacity-80 text-sm">
          <li>Deterministic seeding for reproducible mazes</li>
          <li>Clean API for generation, solve, and render functions</li>
          <li>PNG drawing helpers for debugging and demos</li>
          <li>Unit tests for correctness on edge and large cases</li>
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
            No images yet. Import your maze figures/renders at the top of this file and add them to <code>GALLERY</code>.
          </div>
        )}
      </Section>

      <Section id="build" title="Build Process (Step‑by‑Step)">
        <ol className="grid gap-3">
          {[
            ["Problem framing","Define cell graph, edges as walls, and ‘perfect maze’ target."],
            ["Data structures","Implement DisjointSets (Union‑Find) with path compression + union by rank."],
            ["Generation","Randomly remove walls while preventing cycles (DSU) or carve via DFS backtracking."],
            ["Solving","Run BFS from start to goal to obtain a shortest path; optionally compare with DFS."],
            ["Rendering","Draw maze and overlay solution path as PNGs for visual checks and demos."],
            ["Testing","Edge cases (1×1, thin strips), large mazes, determinism with seeds, and performance notes."]
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
            ["What’s a ‘perfect’ maze?","A maze with no loops where exactly one path exists between any two cells."],
            ["Why BFS for solving?","BFS on an unweighted grid guarantees a shortest‑path solution efficiently."],
            ["How do you avoid cycles in generation?","Union‑Find prevents connecting cells already in the same set; DFS carve also ensures no cycles."],
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
          <p className="opacity-80">Want the code or PNG outputs?</p>
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
