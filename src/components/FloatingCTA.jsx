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
