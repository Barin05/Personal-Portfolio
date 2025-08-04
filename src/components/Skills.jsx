import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// add hidden: true to any skill object to permanently exclude it from display
const skills = [
  // FEA
  { name: "ANSYS", level: 95, category: "FEA" },
  { name: "ABAQUS", level: 90, category: "FEA" },
  { name: "CAESAR CX II", level: 80, category: "FEA" },
  { name: "Nozzle PRO", level: 85, category: "FEA" },

  // CAD
  { name: "AutoCAD", level: 80, category: "CAD" },
  { name: "NX Siemens", level: 75, category: "CAD" },
  { name: "SolidWorks", level: 70, category: "CAD" },
  { name: "Cura", level: 80, category: "CAD" },
  { name: "NavisWorks", level: 90, category: "CAD" },

  // Programming
  { name: "Python", level: 90, category: "Code" },
  { name: "JavaScript", level: 80, category: "Code" },
  { name: "C++", level: 90, category: "Code" },
  { name: "React", level: 70, category: "Code" },
  { name: "HTML/CSS", level: 80, category: "Code" },
  { name: "Git/GitHub", level: 90, category: "Code" },
  { name: "Docker", level: 70, category: "Code" },
  { name: "VS Code", level: 95, category: "Code" },
];

const rawCategories = Array.from(new Set(skills.map((s) => s.category)));
const preferredOrder = ["FEA", "CAD", "Code"];
const categories = rawCategories.sort((a, b) => {
  const ai = preferredOrder.indexOf(a);
  const bi = preferredOrder.indexOf(b);
  if (ai !== -1 || bi !== -1) {
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  }
  return a.localeCompare(b);
});

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(() => {
    try {
      return localStorage.getItem("skillsActiveCategory") || categories[0];
    } catch {
      return categories[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("skillsActiveCategory", activeCategory);
    } catch {}
  }, [activeCategory]);

  const filteredSkills = skills.filter(
    (skill) => skill.hidden !== true && skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
        {filteredSkills.length === 0 && (
          <div className="col-span-full text-center py-6 text-sm text-gray-500">
            No skills in this category.
          </div>
        )}
      </div>
    </section>
  );
};