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
              onMouseEnter={(e) => (e.target.style.color = "var(--ae-accent)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--ae-muted)")}
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
