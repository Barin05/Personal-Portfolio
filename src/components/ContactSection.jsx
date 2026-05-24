import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
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
      style={{ backgroundColor: "var(--ae-bg2)" }}
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
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--ae-text)",
                marginBottom: "28px",
              }}
            >
              Contact Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  icon: <Mail size={20} />,
                  label: "Email",
                  value: "riyad.babayev05@gmail.com",
                  href: "mailto:riyad.babayev05@gmail.com",
                },
                {
                  icon: <Phone size={20} />,
                  label: "Phone",
                  value: "+1 (217) 729-1691",
                  href: "tel:+12177291691",
                },
                {
                  icon: <MapPin size={20} />,
                  label: "Location",
                  value: "Champaign, Illinois, USA",
                  href: null,
                },
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
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "var(--ae-text)",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{ fontSize: "13px", color: "var(--ae-muted)", textDecoration: "none" }}
                      >
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
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--ae-muted)",
                  marginBottom: "16px",
                }}
              >
                Connect
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  {
                    href: "https://www.linkedin.com/in/riyad-babayev-0b7986226/",
                    icon: <Linkedin size={18} />,
                  },
                  { href: "https://github.com/Barin05", icon: <Github size={18} /> },
                  {
                    href: "https://www.instagram.com/ba.ri___n?igsh=MXBueG54YmU3dmdkeA%3D%3D&utm_source=qr",
                    icon: <Instagram size={18} />,
                  },
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--ae-accent)";
                      e.currentTarget.style.borderColor = "var(--ae-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ae-muted)";
                      e.currentTarget.style.borderColor = "var(--ae-border)";
                    }}
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
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--ae-text)",
                marginBottom: "24px",
              }}
            >
              Send a Message
            </h3>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              onSubmit={handleSubmit}
            >
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Riyad Babayev..." },
                { id: "email", label: "Your Email", type: "email", placeholder: "your@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ae-muted)",
                      marginBottom: "8px",
                    }}
                  >
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
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ae-muted)",
                    marginBottom: "8px",
                  }}
                >
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
