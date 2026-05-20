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
