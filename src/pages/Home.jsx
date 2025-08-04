import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/Skills";
import { ProjectsSection } from "../components/Projects";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Experience } from "../components/Experience";


export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflox-x-hidden">
        {/* Theme Toggle Button */}
        <ThemeToggle />
        

        {/* Background Effects */}
        <StarBackground />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
            <HeroSection />
            <AboutSection />
            <Experience />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
        </main>


        {/* Footer */}
        <Footer />
    </div>;
};