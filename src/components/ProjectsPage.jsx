import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { StarBackground } from "./StarBackground";
import { ThemeToggle } from "./ThemeToggle";
import { Github } from "lucide-react";
import skid from "../assets/skid.png";
import website from "../assets/website.png";
import drone from "../assets/drone.png";
import maze from "../assets/maze.jpg";
import spacecraft_photo from '../assets/Spacecraft_photo.png';
import { Footer } from "./Footer";
import kestrel from '../assets/skybetterrender.jpg';

const PROJECTS = [
  {
    id: 0,
    title: "Kestrel — Naval Strike Fighter",
    description: "Propulsion lead & landing gear lead for a carrier-capable single-engine strike fighter. GasTurb engine modeling, supersonic inlet sizing, and carrier landing gear design.",
    image: kestrel,
    tags: ["GasTurb", "Python", "Aircraft Design", "MATLAB"],
    demoUrl: "/senior-design",
    githubUrl: "#",
    category: "AE",
  },
  {
    id: 1,
    title: '24” Ethane Trap Skid',
    description: 'A project focused on the design and 3D print of a 24” Ethane Trap Skid for a client.',
    image: skid,
    tags: ["AutoCAD", "Cura", "3D Printing"],
    demoUrl: "/skid",
    githubUrl: "#",
    category: "MechE",
  },
  {
    id: 2,
    title: "Racing Quadrotor Drone",
    description: "Full-state control system for a racing quadrotor drone using control techniques.",
    image: drone,
    tags: ["Python", "MATLAB", "SymPy"],
    demoUrl: "/drone",
    githubUrl: "#",
    category: "AE",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Full-feature personal portfolio website with custom-made star background and first web-design project.",
    image: website,
    tags: ["React", "Tailwind", "JavaScript"],
    demoUrl: "/website",
    githubUrl: "#",
    category: "Tech",
  },
  {
    id: 4,
    title: "Maddening Mazes — C++",
    description: "Maze generation & solving (DFS/BFS), shortest-path visualization, and solver benchmark.",
    image: maze, // add an asset import if available
    tags: ["C++", "DFS", "BFS"],
    demoUrl: "/maze",
    githubUrl: "",
    category: "Tech",
  },
  {
    id: 5,
    title: "DP3: Control of a Spacecraft with Star Tracker",
    description: "Symbolic modeling, linearization, and control design of a spacecraft using reaction wheels and a star tracker.",
    image: spacecraft_photo, // add asset import if you have one
    tags: ["Python", "Control Systems", "Aerospace"],
    demoUrl: "/spacecraft",
    githubUrl: "#",
    category: "AE",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
    <main className="relative mx-auto max-w-6xl px-4 py-12">
        {/* Background behind content */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <StarBackground />
        </div>

        {/* Top bar */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <nav
            className={cn(
              "fixed top-0 left-0 w-full z-40 transition-all duration-300 backdrop-blur-md border-b shadow-xs",
              isScrolled ? "bg-background/90" : "bg-background/50"
            )}
          >
            <div className="container h-16 md:h-20 flex items-center justify-between">
              <Link className="text-xl font-bold text-primary flex items-center" to="/">
                <span className="relative z-10">
                  <span className="text-glow text-foreground"> Riyad Babayev </span> Portfolio
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/80 transition-colors duration-300"
                >
                  Back to Main Page
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <div aria-hidden className="h-16 md:h-20" />
        </div>
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-2">
          A running list of things I’ve built, from aerospace controls to web tools.
        </p>
      </header>

      <div className="mb-6 flex justify-center gap-4">
        {["All", "AE", "Tech", "MechE"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {PROJECTS.filter((project) =>
          filter === "All" ? true : project.category === filter
        ).map((project) => (
          <a
            key={project.id}
            href={project.demoUrl}
            className="block group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </a>
                </div>
                <span className="text-xs opacity-70">Click for more info</span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
    <Footer />
    </>
  );
}