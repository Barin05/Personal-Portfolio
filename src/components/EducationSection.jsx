import React from "react";

const EducationSection = () => {
  return (
    <section className="py-10 px-5 md:px-10 lg:px-20 bg-background text-foreground">
      <h2 className="text-3xl font-bold mb-4">🎓 Education</h2>
      <div className="space-y-2">
        <div>
          <h3 className="text-xl font-semibold">
            University of Illinois Urbana-Champaign
          </h3>
          <p className="text-sm italic">
            B.S. in Aerospace Engineering, Minor in Computer Science
          </p>
          <p className="text-sm text-muted-foreground">
            Champaign, IL — Expected May 2026
          </p>
          <p className="text-sm text-muted-foreground">
            Relevant Coursework: Control Systems, Thermodynamics, Structures, Machine Learning
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;