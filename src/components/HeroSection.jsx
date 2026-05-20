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
      active: false,
      timer: Math.floor(Math.random() * 300 + 100),
    }));

    let frame;
    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with subtle twinkle
      stars.forEach((s) => {
        const alpha = s.a * (0.7 + 0.3 * Math.sin(tick * 0.02 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,234,240,${alpha})`;
        ctx.fill();
      });

      // Draw meteors
      meteors.forEach((m) => {
        m.timer--;
        if (m.timer <= 0 && !m.active) {
          m.active = true;
          m.x = Math.random() * 0.6 + 0.1;
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
          const angle = Math.PI * 0.25;
          const x = m.x * canvas.width + m.progress * m.len * Math.cos(angle);
          const y = m.y * canvas.height + m.progress * m.len * Math.sin(angle);
          const x0 = x - m.len * Math.cos(angle);
          const y0 = y - m.len * Math.sin(angle);
          const grad = ctx.createLinearGradient(x0, y0, x, y);
          grad.addColorStop(0, "rgba(108,140,255,0)");
          grad.addColorStop(1, "rgba(232,234,240,0.85)");
          ctx.beginPath();
          ctx.moveTo(x0, y0);
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
      {/* Star canvas scoped to hero */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
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
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="ae-btn-outline"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Right: Profile photo frame */}
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

          {/* Accent glow beneath */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "160px",
              height: "40px",
              background:
                "radial-gradient(ellipse, rgba(108,140,255,0.25) 0%, transparent 70%)",
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
              gap: "6px",
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
