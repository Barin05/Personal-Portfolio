# Portfolio Redesign — Design Spec
**Date:** 2026-05-19
**Status:** Approved

---

## Overview

Full visual redesign of riyadbabayev.com from a generic dark developer portfolio to an aerospace-engineering-specific portfolio. The identity shift: *this was built by someone who designs aircraft, not a developer who happens to like space*.

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080b12` | Page background |
| `--bg2` | `#0d1220` | Alternate section background |
| `--accent` | `#6c8cff` | Primary accent (replaces purple) |
| `--text` | `#e8eaf0` | Primary text |
| `--muted` | `rgba(232,234,240,0.5)` | Secondary text |
| `--card` | `rgba(13,18,32,0.85)` | Card backgrounds |
| `--border` | `rgba(108,140,255,0.2)` | Borders, dividers |
| `--gridline` | `rgba(108,140,255,0.10)` | Grid background lines |

### Backgrounds
- **Hero only:** Animated star + meteor canvas (JS, scoped to hero element)
- **All other sections:** 40×40px grid line pattern via CSS `background-image`

### Typography
- Font: `'Inter', 'Segoe UI', system-ui, sans-serif` (no new font imports)
- Headings: weight 800–900, tight letter-spacing (`-0.02em` to `-0.03em`)
- Eyebrows: 9–11px, weight 700, `letter-spacing: 0.2em`, `text-transform: uppercase`

### Shared UI Patterns
- **Engineering bracket corners:** `::before`/`::after` pseudo-elements on cards/frames — 14–20px corner lines in `--accent`
- **Section eyebrow:** colored label + short line `::after`, above every section title
- **Dot pips:** 5 squares (`5×5px`, `border-radius: 1px`, rotated 0°) for skill levels — replaces percentage bars
- **Diamond divider:** rotated square between major sections

---

## Components

### 1. Navbar
- Logo: `RB / AE` (single line, `AE` in accent color)
- Links: About · Work · Skills · Contact (11px, uppercase, spaced)
- Style: `position: fixed`, backdrop blur, bottom border in `--border`
- **Remove:** the current two-line "Riyad Babayev / Portfolio" logo

### 2. Floating CTA
- `position: fixed`, right edge, vertically centered
- Two vertical-text tabs: **Resume** (links to PDF) + **Hire Me** (links to `/#contact`)
- Pulsing dot between them in `--accent`
- Stays on screen for the entire scroll

### 3. Hero Section
- **Layout:** Two-column CSS grid (`1fr auto`), `align-items: end`
- **Left:** Eyebrow ("Aerospace Engineer") → Large name `Riyad / Babayev` (accent on last name) → tagline → green pulsing "Open to full-time roles" indicator → two buttons (View My Work, Download Resume)
- **Right:** Full-height profile photo (`headshot.png`) in a 260×540px frame with:
  - Engineering bracket corners (accent color)
  - `object-fit: contain`, `object-position: center bottom`
  - Bottom fade gradient into page background
  - Subtle accent glow below
  - "Riyad Babayev" label beneath
  - Three stat chips below label: `3+ Internships`, `5 Projects`, `M2.0 Dash Speed`
- **Background:** Animated star canvas (scoped to this section); no grid here
- **Fade:** Linear gradient at hero bottom edge transitions into next section

### 4. Experience Section
- **Replace** `react-vertical-timeline-component` with a custom vertical timeline
- Left vertical line in `--border`
- Each entry: dot on the line, company logo, role title, date range, bullet points
- No centered text — all left-aligned
- Data source: existing `src/constants/index.js` `experiences` array

### 5. Skills Section
- Three-column grid: **Simulation & Analysis** | **CAD & Design** | **Programming**
- Each column: bordered box, accent-colored header with diamond icon, rows of skill name + 5 dot pips
- **Remove:** percentage bars, tab buttons (FEA/CAD/Code replaced by always-visible 3 columns)

### 6. Projects Section (Home Page)
- **Featured block (Kestrel):** Full-width, min-height ~85vh
  - Aircraft render (`skybetterrender.jpg`) fills right side, fades left
  - Grid overlay on top
  - "FEATURED WORK — AE443 CAPSTONE" badge
  - Large "Kestrel." title, subtitle, bracket-box description, 4 spec numbers, two CTA buttons
  - Two annotation callouts on the aircraft (Dual DSI inlets, Tricycle LG)
- **Other Projects grid:** 3-column grid below a diamond divider
  - Cards: bracket corner, category tag, title, description, tool chips, arrow
  - Shows: Racing Drone, Spacecraft, Ethane Trap Skid
- **"View All Projects"** link to `/projects`

### 7. Contact Section
- Keep existing two-column layout (info left, Formspree form right)
- Restyle to match new design tokens (no changes to form logic/endpoint)
- Fix placeholder text ("goat@gmail.com" → "your@email.com")
- Add grid background

### 8. Footer
- Minimal: copyright line + three social icons (LinkedIn, GitHub, Instagram)
- Match new color scheme

---

## Files Modified

| File | Change |
|---|---|
| `src/index.css` | New design tokens, shared utility classes (`grid-bg`, `bracket-box`, etc.) |
| `src/components/Navbar.jsx` | New logo, styling |
| `src/components/HeroSection.jsx` | Two-column layout, photo, stars, floating CTA |
| `src/components/StarBackground.jsx` | Scope to hero only (no longer full-page) |
| `src/components/AboutSection.jsx` | Restyle with new tokens; keep text content |
| `src/components/Experience.jsx` | Replace timeline library with custom component |
| `src/components/Skills.jsx` | Three-column always-visible, dot pips |
| `src/components/Projects.jsx` | Featured Kestrel + grid below |
| `src/components/ContactSection.jsx` | Restyle; fix placeholder |
| `src/components/Footer.jsx` | Restyle |
| `src/components/ThemeToggle.jsx` | Keep; restyle to match new tokens |

## Files NOT Modified
- All project detail pages (`SkidPage`, `Drone`, `Spacecraft`, `Maze`, `Website`, `SeniorDesign`) — keep existing style
- `SmallNavbar.jsx` — keep for detail pages
- `ProjectsPage.jsx` — restyle to match new tokens (minor)
- `src/App.jsx` — no changes needed
- `src/constants/index.js` — no changes needed

---

## Out of Scope
- No new routes
- No changes to Formspree endpoint or contact form logic
- No changes to project detail page content
- No new dependencies (all CSS/JS written from scratch, no new npm packages)
