import { useEffect, useRef } from "react";
import { Briefcase, FolderOpen, Gauge } from "lucide-react";
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

    const meteors = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * 0.7,
      y: Math.random() * 0.4,
      tail: Math.random() * 120 + 80,
      speed: Math.random() * 0.004 + 0.003,
      // first 3 start active immediately, rest staggered
      progress: i < 3 ? Math.random() * 0.15 : 0,
      active: i < 3,
      timer: i < 3 ? 0 : Math.floor(Math.random() * 200 + 60),
    }));

    let frame;
    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const starRGB = isDark ? "232,234,240" : "13,18,32";
      const meteorTail = isDark ? "232,234,240" : "13,18,32";

      // Draw stars with subtle twinkle
      stars.forEach((s) => {
        const alpha = s.a * (0.7 + 0.3 * Math.sin(tick * 0.02 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRGB},${alpha})`;
        ctx.fill();
      });

      // Draw meteors
      const diag = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
      const angle = Math.PI * 0.25;
      meteors.forEach((m) => {
        if (!m.active) {
          m.timer--;
          if (m.timer <= 0) {
            m.active = true;
            m.x = Math.random() * 0.7;
            m.y = Math.random() * 0.4;
            m.progress = 0;
            m.timer = Math.floor(Math.random() * 300 + 120);
          }
          return;
        }
        m.progress += m.speed;
        // done when head has travelled full diagonal (guaranteed off-screen)
        if (m.progress * diag > diag + m.tail) {
          m.active = false;
          return;
        }
        const headX = m.x * canvas.width + m.progress * diag * Math.cos(angle);
        const headY = m.y * canvas.height + m.progress * diag * Math.sin(angle);
        const tailX = headX - m.tail * Math.cos(angle);
        const tailY = headY - m.tail * Math.sin(angle);
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, "rgba(108,140,255,0)");
        grad.addColorStop(1, `rgba(${meteorTail},0.9)`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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

      {/* Small avatar — mobile only */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          zIndex: 20,
          width: "130px",
          height: "210px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "2px solid var(--ae-accent)",
          boxShadow: "0 0 18px rgba(108,140,255,0.35)",
          background: "var(--ae-bg)",
          flexShrink: 0,
        }}
      >
        <img
          src={headshot}
          alt="Riyad Babayev"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Two-column layout */}
      <div
        className="container ae-hero-grid"
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "flex-end",
          gap: "48px",
          paddingBottom: "48px",
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
              display: "flex",
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
            background: "var(--ae-bg)",
            alignSelf: "flex-end",
            marginBottom: "120px",
          }}
          className="hidden md:block"
        >
          {/* Photo */}
          <img
            src={headshot}
            alt="Riyad Babayev"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "120% bottom",
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

          {/* Stat cards */}
          <div
            style={{
              position: "absolute",
              bottom: "-72px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              width: "310px",
            }}
          >
            {[
              { icon: <Briefcase size={13} />, value: "3+", label: "Internships" },
              { icon: <FolderOpen size={13} />, value: "5+", label: "Projects" },
              { icon: <Gauge size={13} />, value: "M2.0", label: "Dash Racer" },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(108,140,255,0.07)",
                  border: "1px solid var(--ae-border)",
                  padding: "10px 6px 8px",
                }}
              >
                <span style={{ color: "var(--ae-accent)", opacity: 0.8 }}>{icon}</span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "var(--ae-text)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ae-muted)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
