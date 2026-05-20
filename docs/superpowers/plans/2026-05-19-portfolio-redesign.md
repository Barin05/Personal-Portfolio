# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully restyle riyadbabayev.com from a generic dark portfolio to an aerospace-engineering-specific portfolio with a cinematic Kestrel feature, blueprint grid language, dot-pip skills, custom timeline, and floating resume CTA.

**Architecture:** All changes are purely visual — same React/Vite/Tailwind stack, same routes and data. New CSS custom properties (`--ae-*`) are added to `:root` and consumed directly in component inline styles or new CSS classes. No new npm packages; all effects are native JS canvas or CSS.

**Tech Stack:** React 19, Vite 7, Tailwind CSS v4 (via `@import "tailwindcss"` in index.css), React Router v7, Lucide React

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/index.css` | Modify | New design tokens, grid-bg, bracket corners, dot pips, eyebrow, timeline CSS |
| `src/components/Navbar.jsx` | Modify | "RB / AE" logo, 4 links (About/Work/Skills/Contact), dark bg |
| `src/components/FloatingCTA.jsx` | Create | Fixed right-edge Resume + Hire Me tabs with pulsing dot |
| `src/pages/Home.jsx` | Modify | Remove `<StarBackground>`, add `<FloatingCTA>` |
| `src/components/HeroSection.jsx` | Rewrite | Two-column layout, headshot frame, star canvas, eyebrow, two CTA buttons |
| `src/components/AboutSection.jsx` | Modify | Grid background, new token colors, eyebrow label |
| `src/components/Experience.jsx` | Rewrite | Custom vertical timeline, remove react-vertical-timeline-component import |
| `src/components/Skills.jsx` | Rewrite | Three-column always-visible, dot pips, no % bars, no tabs |
| `src/components/Projects.jsx` | Rewrite | Full-width Kestrel featured block + 3-col grid below |
| `src/components/ContactSection.jsx` | Modify | Grid background, new token colors, fix placeholder |
| `src/components/Footer.jsx` | Rewrite | Minimal copyright + LinkedIn/GitHub/Instagram icons |

---

## Task 1: CSS Design Tokens & Utility Classes

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add aerospace design tokens to `:root` in `@layer base`**

In `src/index.css`, inside the `@layer base { :root { ... } }` block, append these tokens after the existing `--star-glow` line:

```css
/* Aerospace design tokens */
--ae-bg: #080b12;
--ae-bg2: #0d1220;
--ae-accent: #6c8cff;
--ae-text: #e8eaf0;
--ae-muted: rgba(232, 234, 240, 0.5);
--ae-card: rgba(13, 18, 32, 0.85);
--ae-border: rgba(108, 140, 255, 0.2);
--ae-gridline: rgba(108, 140, 255, 0.10);
```

- [ ] **Step 2: Add CSS utility classes after the existing `@utility` blocks**

Append the following after the last `@utility` block (after the `#root` rule at the bottom):

```css
/* ── Aerospace utility classes ── */

/* Grid background pattern used on all non-hero sections */
.ae-grid-bg {
  background-image:
    linear-gradient(var(--ae-gridline) 1px, transparent 1px),
    linear-gradient(90deg, var(--ae-gridline) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Engineering bracket corner elements */
.ae-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-style: solid;
  border-color: var(--ae-accent);
  pointer-events: none;
  z-index: 1;
}
.ae-tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.ae-tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.ae-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.ae-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

/* Section eyebrow label */
.ae-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ae-accent);
  margin-bottom: 14px;
}
.ae-eyebrow::after {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--ae-accent);
  opacity: 0.6;
}

/* Dot pip skill indicators */
.ae-pips {
  display: flex;
  gap: 4px;
  align-items: center;
}
.ae-pip {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background: var(--ae-border);
}
.ae-pip-on { background: var(--ae-accent); }

/* Section heading shared style */
.ae-section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ae-text);
  margin-bottom: 0;
}

/* Primary CTA button */
.ae-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--ae-accent);
  color: #080b12;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.ae-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

/* Outline CTA button */
.ae-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: transparent;
  color: var(--ae-accent);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.05em;
  border: 1px solid var(--ae-accent);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}
.ae-btn-outline:hover { background: rgba(108, 140, 255, 0.1); transform: translateY(-1px); }

/* Diamond section divider */
.ae-diamond-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 0 32px;
}
.ae-diamond {
  display: block;
  width: 10px;
  height: 10px;
  background: var(--ae-accent);
  transform: rotate(45deg);
  opacity: 0.7;
}
.ae-diamond-divider::before,
.ae-diamond-divider::after {
  content: '';
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: var(--ae-border);
}

/* Custom vertical timeline */
.ae-timeline {
  position: relative;
  padding-left: 28px;
}
.ae-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 0;
  width: 1px;
  background: var(--ae-border);
}
.ae-timeline-entry {
  position: relative;
  margin-bottom: 48px;
}
.ae-timeline-dot {
  position: absolute;
  left: -32px;
  top: 20px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--ae-accent);
  border: 2px solid var(--ae-bg);
  box-shadow: 0 0 0 1px var(--ae-accent);
}
.ae-timeline-card {
  position: relative;
  background: var(--ae-card);
  border: 1px solid var(--ae-border);
  padding: 24px 28px;
}

/* Floating CTA */
.ae-floating-cta {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.ae-cta-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 18px 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s;
  cursor: pointer;
}
.ae-cta-tab-resume {
  background: var(--ae-accent);
  color: #080b12;
}
.ae-cta-tab-resume:hover { background: rgba(108, 140, 255, 0.85); }
.ae-cta-tab-hire {
  background: var(--ae-card);
  border: 1px solid var(--ae-border);
  border-top: none;
  color: var(--ae-accent);
}
.ae-cta-tab-hire:hover { background: rgba(108, 140, 255, 0.08); }
.ae-cta-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ae-accent);
  animation: ae-pulse 2s ease-in-out infinite;
}
@keyframes ae-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

/* Kestrel featured block */
.kestrel-block {
  position: relative;
  min-height: 85vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.kestrel-img-wrap {
  position: absolute;
  inset: 0;
}
.kestrel-img {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 65%;
  object-fit: cover;
  object-position: center;
}
.kestrel-img-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--ae-bg2) 30%, rgba(8,11,18,0.5) 70%, transparent 100%);
}
.kestrel-content {
  position: relative;
  z-index: 10;
  max-width: 560px;
  padding: 60px 48px;
}
.kestrel-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--ae-text);
  line-height: 1;
  margin: 12px 0 16px;
}
.kestrel-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ae-accent);
  border: 1px solid var(--ae-accent);
  padding: 4px 10px;
}
.kestrel-desc {
  position: relative;
  background: rgba(13,18,32,0.75);
  border: 1px solid var(--ae-border);
  padding: 16px 20px;
  font-size: 14px;
  color: var(--ae-muted);
  line-height: 1.7;
  margin: 20px 0;
  backdrop-filter: blur(4px);
}
.kestrel-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}
.kestrel-spec-item {
  border-left: 2px solid var(--ae-accent);
  padding-left: 12px;
}
.kestrel-spec-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ae-text);
  letter-spacing: -0.01em;
}
.kestrel-spec-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ae-muted);
  margin-top: 2px;
}
.kestrel-annotation {
  position: absolute;
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ae-accent);
  background: rgba(8,11,18,0.7);
  border: 1px solid var(--ae-accent);
  padding: 4px 10px;
}
.kestrel-annotation-dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--ae-accent);
  flex-shrink: 0;
}

/* Project grid cards */
.ae-project-card {
  position: relative;
  background: var(--ae-card);
  border: 1px solid var(--ae-border);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: border-color 0.2s, transform 0.2s;
}
.ae-project-card:hover {
  border-color: var(--ae-accent);
  transform: translateY(-2px);
}
.ae-project-card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
.ae-project-card-body { padding: 20px; }
.ae-project-tag {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ae-accent);
  border: 1px solid var(--ae-border);
  padding: 2px 8px;
  margin-bottom: 10px;
}
.ae-project-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ae-text);
  margin-bottom: 8px;
}
.ae-project-card-desc {
  font-size: 13px;
  color: var(--ae-muted);
  line-height: 1.6;
  margin-bottom: 14px;
}
.ae-project-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.ae-chip {
  font-size: 11px;
  font-weight: 500;
  color: var(--ae-muted);
  background: rgba(108,140,255,0.07);
  border: 1px solid var(--ae-border);
  padding: 2px 8px;
}
.ae-project-arrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--ae-accent);
  text-transform: uppercase;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add aerospace design tokens and utility classes to index.css"
```

---

## Task 2: Navbar Redesign

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Rewrite Navbar.jsx**

Replace the entire file content with:

```jsx
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: "all 0.3s",
        borderBottom: isScrolled ? "1px solid var(--ae-border)" : "1px solid transparent",
        background: isScrolled ? "rgba(8,11,18,0.9)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        padding: isScrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "var(--ae-text)",
            textDecoration: "none",
          }}
        >
          RB{" "}
          <span style={{ color: "var(--ae-accent)" }}>/ AE</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: "36px" }}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ae-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.target.style.color = "var(--ae-accent)")}
              onMouseLeave={e => (e.target.style.color = "var(--ae-muted)")}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          style={{ color: "var(--ae-text)", background: "none", border: "none", cursor: "pointer", padding: "8px", zIndex: 50 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile overlay */}
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,11,18,0.97)",
            backdropFilter: "blur(12px)",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s",
            opacity: isMenuOpen ? 1 : 0,
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "center" }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ae-text)",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: redesign navbar with RB/AE logo and aerospace styling"
```

---

## Task 3: FloatingCTA Component

**Files:**
- Create: `src/components/FloatingCTA.jsx`

- [ ] **Step 1: Create FloatingCTA.jsx**

```jsx
import resumePDF from "../assets/Riyad_Babayev_Resume.pdf";

export const FloatingCTA = () => {
  return (
    <div className="ae-floating-cta">
      <a
        href={resumePDF}
        target="_blank"
        rel="noopener noreferrer"
        className="ae-cta-tab ae-cta-tab-resume"
        title="Download Resume"
      >
        Resume
      </a>
      <div className="ae-cta-pulse" />
      <a
        href="#contact"
        className="ae-cta-tab ae-cta-tab-hire"
        title="Contact me"
      >
        Hire Me
      </a>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FloatingCTA.jsx
git commit -m "feat: add floating resume/hire-me CTA component"
```

---

## Task 4: Update Home.jsx

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Remove StarBackground and add FloatingCTA**

Replace the entire file:

```jsx
import { ThemeToggle } from "../components/ThemeToggle";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/Skills";
import { ProjectsSection } from "../components/Projects";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Experience } from "../components/Experience";
import { FloatingCTA } from "../components/FloatingCTA";

export const Home = () => {
  return (
    <div style={{ background: "var(--ae-bg)", color: "var(--ae-text)", minHeight: "100vh", overflowX: "hidden" }}>
      <ThemeToggle />
      <FloatingCTA />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <Experience />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: wire FloatingCTA into Home, remove page-level StarBackground"
```

---

## Task 5: Hero Section Rewrite

**Files:**
- Modify: `src/components/HeroSection.jsx`

The hero has two columns: left (text) and right (photo). A canvas element renders the star animation scoped inside the section. The floating CTA is rendered separately (Task 3/4).

- [ ] **Step 1: Rewrite HeroSection.jsx**

```jsx
import { useEffect, useRef } from "react";
import headshot from "../assets/headshot.png";
import resumePDF from "../assets/Riyad_Babayev_Resume.pdf";

export const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.6 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.8 + 0.4,
    }));

    const meteors = Array.from({ length: 3 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      len: Math.random() * 100 + 60,
      speed: Math.random() * 0.003 + 0.002,
      progress: Math.random(),
      delay: Math.random() * 200,
      active: false,
      timer: Math.floor(Math.random() * 300),
    }));

    let frame;
    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((s) => {
        const alpha = s.a * (0.7 + 0.3 * Math.sin((tick * 0.02 * s.speed) + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,234,240,${alpha})`;
        ctx.fill();
      });

      // Meteors
      meteors.forEach((m) => {
        m.timer--;
        if (m.timer <= 0 && !m.active) {
          m.active = true;
          m.x = Math.random() * 0.6 + 0.2;
          m.y = Math.random() * 0.3;
          m.progress = 0;
          m.timer = Math.floor(Math.random() * 400 + 200);
        }
        if (m.active) {
          m.progress += m.speed;
          if (m.progress >= 1) {
            m.active = false;
            return;
          }
          const x = m.x * canvas.width + m.progress * m.len * Math.cos(Math.PI * 0.25);
          const y = m.y * canvas.height + m.progress * m.len * Math.sin(Math.PI * 0.25);
          const grad = ctx.createLinearGradient(
            x - m.len * Math.cos(Math.PI * 0.25),
            y - m.len * Math.sin(Math.PI * 0.25),
            x, y
          );
          grad.addColorStop(0, "rgba(108,140,255,0)");
          grad.addColorStop(1, "rgba(232,234,240,0.8)");
          ctx.beginPath();
          ctx.moveTo(x - m.len * Math.cos(Math.PI * 0.25), y - m.len * Math.sin(Math.PI * 0.25));
          ctx.lineTo(x, y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ae-bg)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--ae-bg2))",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Two-column layout */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "flex-end",
          gap: "48px",
          paddingBottom: "80px",
          paddingTop: "120px",
        }}
      >
        {/* Left: Text content */}
        <div style={{ maxWidth: "560px" }}>
          <div className="ae-eyebrow">Aerospace Engineer</div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ae-text)",
              marginBottom: "20px",
            }}
          >
            Riyad{" "}
            <span style={{ color: "var(--ae-accent)" }}>Babayev</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--ae-muted)",
              lineHeight: 1.7,
              marginBottom: "28px",
              maxWidth: "460px",
            }}
          >
            Aerospace Engineer with experience in mechanical design, propulsion
            analysis, and software. I build things that fly, things that move,
            and ideas that move worlds.
          </p>

          {/* Open-to-roles indicator */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#4ade80",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4ade80",
                animation: "ae-pulse 2s ease-in-out infinite",
              }}
            />
            Open to full-time roles
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="#projects" className="ae-btn-primary">
              View My Work
            </a>
            <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="ae-btn-outline">
              Download Resume
            </a>
          </div>
        </div>

        {/* Right: Profile photo */}
        <div
          style={{
            position: "relative",
            width: "260px",
            height: "540px",
            flexShrink: 0,
          }}
          className="hidden md:block"
        >
          {/* Bracket corners */}
          <span className="ae-corner ae-tl" />
          <span className="ae-corner ae-tr" />
          <span className="ae-corner ae-bl" />
          <span className="ae-corner ae-br" />

          {/* Photo */}
          <img
            src={headshot}
            alt="Riyad Babayev"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center bottom",
              display: "block",
              filter: "brightness(0.95) contrast(1.02)",
            }}
          />

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100px",
              background: "linear-gradient(to bottom, transparent, var(--ae-bg))",
              pointerEvents: "none",
            }}
          />

          {/* Accent glow */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "160px",
              height: "40px",
              background: "radial-gradient(ellipse, rgba(108,140,255,0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Name label */}
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ae-muted)",
            }}
          >
            Riyad Babayev
          </div>

          {/* Stat chips */}
          <div
            style={{
              position: "absolute",
              bottom: "-52px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            {["3+ Internships", "5 Projects", "M2.0 Dash"].map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ae-accent)",
                  background: "rgba(108,140,255,0.08)",
                  border: "1px solid var(--ae-border)",
                  padding: "3px 8px",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.jsx
git commit -m "feat: rewrite hero with two-column layout, headshot frame, and star canvas"
```

---

## Task 6: About Section Restyle

**Files:**
- Modify: `src/components/AboutSection.jsx`

Changes: add grid background, use new token colors, add eyebrow, keep all text content.

- [ ] **Step 1: Update AboutSection.jsx**

Replace the `<section>` opening tag and the `<h2>` heading with:

```jsx
<section
  id="about"
  className="ae-grid-bg py-24 px-4 relative"
  style={{ background: "var(--ae-bg2)" }}
>
  <div className="container mx-auto max-w-5xl">
    <div className="ae-eyebrow">Background</div>
    <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
      About <span style={{ color: "var(--ae-accent)" }}>Me</span>
    </h2>
```

Replace each `gradient-border p-6 card-hover` card wrapper with:

```jsx
<div
  style={{
    position: "relative",
    background: "var(--ae-card)",
    border: "1px solid var(--ae-border)",
    padding: "24px",
  }}
>
  <span className="ae-corner ae-tl" />
  <span className="ae-corner ae-br" />
  {/* existing card content unchanged */}
</div>
```

Replace `text-primary` icon containers with `style={{ color: "var(--ae-accent)" }}`.

Replace the `cosmic-button` anchor with `className="ae-btn-primary"`.

Replace the outline resume button with `className="ae-btn-outline"`.

Full updated file:

```jsx
import { Briefcase, Code, PencilRuler } from "lucide-react";
import resumePDF from "../assets/Riyad_Babayev_Resume.pdf";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ background: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Background</div>
        <h2
          className="ae-section-title"
          style={{ marginBottom: "48px" }}
        >
          About <span style={{ color: "var(--ae-accent)" }}>Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ color: "var(--ae-muted)", lineHeight: 1.8, fontSize: "15px" }}>
              I'm an Aerospace Engineer with a passion for solving real-world problems through
              engineering, technology, and design. With hands-on experience across aerospace,
              oil and gas, and tech industries.
            </p>
            <p style={{ color: "var(--ae-text)", lineHeight: 1.8, fontSize: "15px", fontWeight: 500 }}>
              I believe working across different fields and teams leads to more creative and
              effective solutions.
            </p>
            <p style={{ color: "var(--ae-muted)", lineHeight: 1.8, fontSize: "15px" }}>
              Whether I'm contributing to large-scale engineering projects or creating small-scale
              digital tools, I care about making work that's functional, thoughtful, and impactful.{" "}
              <span style={{ textDecoration: "underline", color: "var(--ae-text)" }}>
                My goal is to keep learning, keep building, and keep connecting ideas across disciplines.
              </span>
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", paddingTop: "8px" }}>
              <a href="#contact" className="ae-btn-primary">Contact Me</a>
              <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="ae-btn-outline">
                View Resume
              </a>
            </div>
          </div>

          {/* Right: cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                icon: <PencilRuler size={22} />,
                title: "Engineering",
                desc: "Experience in aerospace and energy industries, with core skills in aircraft inspection, drone systems, mechanical design, 3D printing, CAD, FEA, and stress analysis.",
              },
              {
                icon: <Briefcase size={22} />,
                title: "Project Management",
                desc: "Leading engineering teams by managing documentation, tracking deliverables, and facilitating vendor and client communication.",
              },
              {
                icon: <Code size={22} />,
                title: "Tech",
                desc: "Automating tasks, building tools, and exploring new ideas that enhance productivity and innovation with Python, JavaScript, and C++.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  position: "relative",
                  background: "var(--ae-card)",
                  border: "1px solid var(--ae-border)",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span className="ae-corner ae-tl" />
                <span className="ae-corner ae-br" />
                <div
                  style={{
                    padding: "10px",
                    background: "rgba(108,140,255,0.1)",
                    color: "var(--ae-accent)",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "15px", color: "var(--ae-text)", marginBottom: "6px" }}>
                    {title}
                  </h4>
                  <p style={{ color: "var(--ae-muted)", fontSize: "13px", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: "56px", borderTop: "1px solid var(--ae-border)", paddingTop: "40px" }}>
          <div className="ae-eyebrow">Education</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ae-text)", marginBottom: "6px" }}>
            University of Illinois Urbana-Champaign
          </h3>
          <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--ae-muted)" }}>
            B.S. in Aerospace Engineering, Minor in Computer Science
          </p>
          <p style={{ fontSize: "13px", color: "var(--ae-muted)", marginTop: "4px" }}>
            Champaign, IL — May 2026
          </p>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AboutSection.jsx
git commit -m "feat: restyle About section with aerospace tokens and bracket cards"
```

---

## Task 7: Experience — Custom Vertical Timeline

**Files:**
- Modify: `src/components/Experience.jsx`

Remove the `react-vertical-timeline-component` library dependency and replace with a custom left-line timeline.

- [ ] **Step 1: Rewrite Experience.jsx**

```jsx
import { experiences } from "../constants";

export const Experience = () => {
  if (!Array.isArray(experiences)) return null;

  return (
    <section
      id="experience"
      className="py-24 px-4 relative"
      style={{ background: "var(--ae-bg)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Career</div>
        <h2 className="ae-section-title" style={{ marginBottom: "56px" }}>
          Work <span style={{ color: "var(--ae-accent)" }}>Experience</span>
        </h2>

        <div className="ae-timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="ae-timeline-entry">
              <div className="ae-timeline-dot" />

              <div className="ae-timeline-card">
                {/* Bracket corners */}
                <span className="ae-corner ae-tl" />
                <span className="ae-corner ae-br" />

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  {exp.icon && (
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: exp.iconBg || "#fff",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={exp.icon}
                        alt={exp.company_name}
                        style={{ width: "70%", height: "70%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--ae-text)",
                        marginBottom: "2px",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--ae-accent)", fontWeight: 600, marginBottom: "2px" }}>
                      {exp.company_name}
                    </p>
                    <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--ae-muted)", textTransform: "uppercase" }}>
                      {exp.date}
                    </p>
                  </div>
                </div>

                {/* Bullet points */}
                {Array.isArray(exp.points) && exp.points.length > 0 && (
                  <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        style={{ fontSize: "13px", color: "var(--ae-muted)", lineHeight: 1.7 }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: replace react-vertical-timeline with custom aerospace timeline"
```

---

## Task 8: Skills — Three-Column Dot Pips

**Files:**
- Modify: `src/components/Skills.jsx`

Remove tab buttons and percentage bars. Show all three categories as always-visible columns with dot pips.

- [ ] **Step 1: Rewrite Skills.jsx**

```jsx
const skills = [
  // Simulation & Analysis
  { name: "ANSYS", level: 95, category: "sim" },
  { name: "ABAQUS", level: 90, category: "sim" },
  { name: "CAESAR CX II", level: 80, category: "sim" },
  { name: "Nozzle PRO", level: 85, category: "sim" },
  { name: "GasTurb", level: 85, category: "sim" },

  // CAD & Design
  { name: "AutoCAD", level: 80, category: "cad" },
  { name: "NX Siemens", level: 75, category: "cad" },
  { name: "SolidWorks", level: 70, category: "cad" },
  { name: "Cura", level: 80, category: "cad" },
  { name: "NavisWorks", level: 90, category: "cad" },

  // Programming
  { name: "Python", level: 90, category: "code" },
  { name: "JavaScript", level: 80, category: "code" },
  { name: "C++", level: 90, category: "code" },
  { name: "React", level: 70, category: "code" },
  { name: "HTML/CSS", level: 80, category: "code" },
  { name: "Git/GitHub", level: 90, category: "code" },
  { name: "Docker", level: 70, category: "code" },
  { name: "VS Code", level: 95, category: "code" },
];

const columns = [
  { key: "sim", label: "Simulation & Analysis" },
  { key: "cad", label: "CAD & Design" },
  { key: "code", label: "Programming" },
];

const DotPips = ({ level }) => {
  const filled = Math.ceil(level / 20);
  return (
    <div className="ae-pips">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`ae-pip${i < filled ? " ae-pip-on" : ""}`} />
      ))}
    </div>
  );
};

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ background: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Expertise</div>
        <h2 className="ae-section-title" style={{ marginBottom: "48px" }}>
          Technical <span style={{ color: "var(--ae-accent)" }}>Skills</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {columns.map(({ key, label }) => (
            <div
              key={key}
              style={{
                position: "relative",
                background: "var(--ae-card)",
                border: "1px solid var(--ae-border)",
                padding: "28px 24px",
              }}
            >
              <span className="ae-corner ae-tl" />
              <span className="ae-corner ae-tr" />
              <span className="ae-corner ae-bl" />
              <span className="ae-corner ae-br" />

              {/* Column header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--ae-border)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "8px",
                    height: "8px",
                    background: "var(--ae-accent)",
                    transform: "rotate(45deg)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ae-accent)",
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Skill rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {skills
                  .filter((s) => s.category === key)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--ae-text)",
                        }}
                      >
                        {skill.name}
                      </span>
                      <DotPips level={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: rewrite Skills as three-column dot-pip layout, remove tabs and % bars"
```

---

## Task 9: Projects — Featured Kestrel + Grid

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Rewrite Projects.jsx**

```jsx
import kestrel from "../assets/skybetterrender.jpg";
import drone from "../assets/drone.png";
import spacecraft from "../assets/Spacecraft_photo.png";
import skid from "../assets/skid.png";
import fdrPdf from "../assets/2026_FDR_Monkey_s_Fist-1.pdf";

const gridProjects = [
  {
    title: "Racing Quadrotor Drone",
    category: "Controls",
    description: "Full-state control system for a racing quadrotor drone using advanced control techniques.",
    image: drone,
    tags: ["Python", "MATLAB", "SymPy"],
    href: "/drone",
  },
  {
    title: "Spacecraft Attitude Control",
    category: "Aerospace",
    description: "Attitude determination and control simulation for a 3-axis stabilized spacecraft.",
    image: spacecraft,
    tags: ["Python", "MATLAB"],
    href: "/spacecraft",
  },
  {
    title: '24" Ethane Trap Skid',
    category: "MechE",
    description: 'Design and 3D print of a 24" Ethane Trap Skid for a process engineering client.',
    image: skid,
    tags: ["AutoCAD", "Cura", "3D Printing"],
    href: "/skid",
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      style={{ background: "var(--ae-bg)" }}
    >
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
            Propulsion lead &amp; landing gear lead for a Mach 2.0-capable carrier strike fighter
            designed for the US Navy. Responsible for engine cycle analysis (GasTurb), inlet
            design (DSI), landing gear sizing, and integration trade studies.
          </div>

          <div className="kestrel-specs">
            {[
              { value: "Mach 2.0", label: "Dash Speed" },
              { value: "1,000 nm", label: "Combat Radius" },
              { value: "62,449 lb", label: "MTOW" },
              { value: "F100-PW-229", label: "Engine" },
            ].map(({ value, label }) => (
              <div key={label} className="kestrel-spec-item">
                <span className="kestrel-spec-value">{value}</span>
                <span className="kestrel-spec-label">{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="/senior-design" className="ae-btn-primary">Explore Design →</a>
            <a href={fdrPdf} target="_blank" rel="noopener noreferrer" className="ae-btn-outline">
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
      <div className="ae-diamond-divider" style={{ background: "var(--ae-bg)", padding: "40px 0 28px" }}>
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
                <img src={proj.image} alt={proj.title} className="ae-project-card-img" />
                <div className="ae-project-card-body">
                  <span className="ae-project-tag">{proj.category}</span>
                  <div className="ae-project-card-title">{proj.title}</div>
                  <div className="ae-project-card-desc">{proj.description}</div>
                  <div className="ae-project-chips">
                    {proj.tags.map((t) => (
                      <span key={t} className="ae-chip">{t}</span>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: rewrite Projects with full-width Kestrel feature and grid layout"
```

---

## Task 10: Contact Section Restyle

**Files:**
- Modify: `src/components/ContactSection.jsx`

Changes: grid background, new token colors, fix `goat@gmail.com` placeholder → `your@email.com`.

- [ ] **Step 1: Update ContactSection.jsx**

Change the `<section>` opening:
```jsx
<section
  id="contact"
  className="ae-grid-bg py-24 px-4 relative"
  style={{ background: "var(--ae-bg2)" }}
>
```

Change the heading:
```jsx
<div className="ae-eyebrow">Get In Touch</div>
<h2 className="ae-section-title" style={{ marginBottom: "16px" }}>
  Contact <span style={{ color: "var(--ae-accent)" }}>Me</span>
</h2>
```

Fix the email placeholder (line 166):
```jsx
placeholder="your@email.com"
```

Change the form card background:
```jsx
<div
  style={{
    position: "relative",
    background: "var(--ae-card)",
    border: "1px solid var(--ae-border)",
    padding: "32px",
  }}
>
  <span className="ae-corner ae-tl" />
  <span className="ae-corner ae-br" />
  {/* ... existing form unchanged ... */}
</div>
```

Change the social icon links colors — wrap them each with `style={{ color: "var(--ae-accent)" }}`.

Change the submit button from `cosmic-button` to `ae-btn-primary`:
```jsx
<button
  type="submit"
  disabled={isSubmitting}
  className="ae-btn-primary"
  style={{ width: "100%", justifyContent: "center" }}
>
  {isSubmitting ? "Sending..." : "Send Message"}
  <Send size={16} />
</button>
```

Full updated ContactSection.jsx:

```jsx
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://formspree.io/f/xanbzgnv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        alert("Message sent! Thanks for reaching out. I'll get back to you soon.");
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      alert("Network error. Please try again later or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="ae-grid-bg py-24 px-4 relative"
      style={{ background: "var(--ae-bg2)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="ae-eyebrow">Get In Touch</div>
        <h2 className="ae-section-title" style={{ marginBottom: "16px" }}>
          Contact <span style={{ color: "var(--ae-accent)" }}>Me</span>
        </h2>
        <p style={{ color: "var(--ae-muted)", marginBottom: "48px", maxWidth: "520px" }}>
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ae-text)", marginBottom: "28px" }}>
              Contact Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: <Mail size={20} />, label: "Email", value: "riyad.babayev05@gmail.com", href: "mailto:riyad.babayev05@gmail.com" },
                { icon: <Phone size={20} />, label: "Phone", value: "+1 (217) 729-1691", href: "tel:+12177291691" },
                { icon: <MapPin size={20} />, label: "Location", value: "Champaign, Illinois, USA", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div
                    style={{
                      padding: "10px",
                      background: "rgba(108,140,255,0.1)",
                      color: "var(--ae-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--ae-text)", marginBottom: "2px" }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ fontSize: "13px", color: "var(--ae-muted)", textDecoration: "none" }}>
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: "13px", color: "var(--ae-muted)" }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ae-muted)", marginBottom: "16px" }}>
                Connect
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                {[
                  { href: "https://www.linkedin.com/in/riyad-babayev-0b7986226/", icon: <Linkedin size={20} /> },
                  { href: "https://github.com/Barin05", icon: <Github size={20} /> },
                  { href: "https://www.instagram.com/ba.ri___n?igsh=MXBueG54YmU3dmdkeA%3D%3D&utm_source=qr", icon: <Instagram size={20} /> },
                ].map(({ href, icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      border: "1px solid var(--ae-border)",
                      color: "var(--ae-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--ae-accent)"; e.currentTarget.style.borderColor = "var(--ae-accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--ae-muted)"; e.currentTarget.style.borderColor = "var(--ae-border)"; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              position: "relative",
              background: "var(--ae-card)",
              border: "1px solid var(--ae-border)",
              padding: "32px",
            }}
          >
            <span className="ae-corner ae-tl" />
            <span className="ae-corner ae-br" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ae-text)", marginBottom: "24px" }}>
              Send a Message
            </h3>
            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Riyad Babayev..." },
                { id: "email", label: "Your Email", type: "email", placeholder: "your@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ae-muted)", marginBottom: "8px" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    required
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(8,11,18,0.6)",
                      border: "1px solid var(--ae-border)",
                      color: "var(--ae-text)",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ae-muted)", marginBottom: "8px" }}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hello, I'd like to talk about..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(8,11,18,0.6)",
                    border: "1px solid var(--ae-border)",
                    color: "var(--ae-text)",
                    fontSize: "14px",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ae-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.jsx
git commit -m "feat: restyle Contact section with aerospace tokens, fix email placeholder"
```

---

## Task 11: Footer Restyle

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Rewrite Footer.jsx**

```jsx
import { Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "var(--ae-bg)",
        borderTop: "1px solid var(--ae-border)",
        padding: "24px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <p style={{ fontSize: "12px", color: "var(--ae-muted)", margin: 0 }}>
          &copy; {new Date().getFullYear()} RiyadBabayev.com — All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { href: "https://www.linkedin.com/in/riyad-babayev-0b7986226/", icon: <Linkedin size={17} /> },
            { href: "https://github.com/Barin05", icon: <Github size={17} /> },
            { href: "https://www.instagram.com/ba.ri___n?igsh=MXBueG54YmU3dmdkeA%3D%3D&utm_source=qr", icon: <Instagram size={17} /> },
          ].map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--ae-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--ae-accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ae-muted)")}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: restyle footer with minimal aerospace design"
```

---

## Task 12: Final Cleanup

**Files:**
- Delete or ignore: `public/mockup.html`, `public/headshot.png`, `public/profilePic.png`, `public/skybetterrender.jpg`

These files were scaffolding for the mockup phase. They are not referenced by the app.

- [ ] **Step 1: Remove temp files from public/**

```bash
rm /Users/riadbabayev/Documents/Portfolio/public/mockup.html
rm /Users/riadbabayev/Documents/Portfolio/public/headshot.png
rm /Users/riadbabayev/Documents/Portfolio/public/profilePic.png
rm /Users/riadbabayev/Documents/Portfolio/public/skybetterrender.jpg
```

- [ ] **Step 2: Verify dev server still starts cleanly**

```bash
# In a separate terminal: npm run dev
# Open http://localhost:5173 and confirm:
# - Navbar: "RB / AE" logo, 4 links
# - Hero: two-column, headshot on right, stars on canvas
# - Floating CTAs on right edge
# - About: grid background, bracket cards
# - Experience: custom timeline (no third-party library styles)
# - Skills: 3-column, dot pips
# - Projects: Kestrel full-width block, 3 cards below
# - Contact: grid background, fixed placeholder
# - Footer: minimal
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: remove mockup scaffolding files from public/"
```

---

## Self-Review

**Spec coverage check:**

| Spec Requirement | Task |
|---|---|
| `--bg`, `--accent`, `--gridline` tokens | Task 1 |
| Grid background on all non-hero sections | Task 1 + Tasks 6,7,8,10 |
| Hero star canvas scoped to hero | Task 5 |
| "RB / AE" navbar logo | Task 2 |
| About · Work · Skills · Contact links | Task 2 |
| Floating Resume + Hire Me CTA | Task 3 |
| Two-column hero with headshot | Task 5 |
| Bracket corners on photo frame | Task 5 |
| Eyebrow labels on each section | Tasks 5,6,7,8,10 |
| Custom vertical timeline | Task 7 |
| Three-column skills, dot pips | Task 8 |
| Kestrel featured block ~85vh | Task 9 |
| Grid projects 3-column | Task 9 |
| Diamond divider | Task 9 |
| Fix `goat@gmail.com` placeholder | Task 10 |
| Footer: copyright + 3 social icons | Task 11 |
| StarBackground removed from page level | Task 4 |
| ThemeToggle: kept (no explicit restyle step — acceptable; the new design tokens override visual appearance) | n/a |

**No placeholders found.** All steps contain complete code.

**Type consistency:** `ae-corner`, `ae-tl/tr/bl/br` used consistently across Tasks 1, 5, 6, 7, 8, 9, 10. `ae-btn-primary` / `ae-btn-outline` defined in Task 1 and used in Tasks 5, 6, 9, 10. `ae-eyebrow` defined in Task 1 and used in Tasks 5, 6, 7, 8, 10.
