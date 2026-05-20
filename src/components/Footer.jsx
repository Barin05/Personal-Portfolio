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
            {
              href: "https://www.linkedin.com/in/riyad-babayev-0b7986226/",
              icon: <Linkedin size={17} />,
            },
            { href: "https://github.com/Barin05", icon: <Github size={17} /> },
            {
              href: "https://www.instagram.com/ba.ri___n?igsh=MXBueG54YmU3dmdkeA%3D%3D&utm_source=qr",
              icon: <Instagram size={17} />,
            },
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ae-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ae-muted)")}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
