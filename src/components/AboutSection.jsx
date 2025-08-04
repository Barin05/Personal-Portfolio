import { Briefcase, Code, Cog, PencilRuler } from "lucide-react";


export const AboutSection = () => {
    
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl"> 
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary">Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Right side content of the About Me starts here */}
                    <div className="space-y-6">

                        <p className="text-muted-foreground">
                            I’m an Aerospace Engineering senior with a passion for solving real-world problems through engineering, technology, and design.
                            With hands-on experience across aerospace, oil and gas, and tech industries.
                        </p>
                        <p className="text-muted-foreground, font-bold">
                            I believe working across different fields and teams leads to more creative and effective solutions.
                        </p>
                        <p className="text-muted-foreground">
                            Whether I’m contributing to large-scale engineering projects or creating small-scale digital tools, I care about making work that’s functional, thoughtful, and impactful.{" "}
                            <span className="underline">My goal is to keep learning, keep building, and keep connecting ideas across disciplines.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="cosmic-button">
                                Contact Me
                            </a>
                            <a href="" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Left side content of the About Me starts here */}
                    <div className="grid drid-cols-1 gap-6"> 
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <PencilRuler className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Engineering </h4>
                                    <p className="text-muted-foreground">
                                        Experience in aerospace and energy industries, with core skills in aircraft inspection, 
                                        drone systems, mechanical design, 3D printing, CAD, FEA, and stress analysis.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Project Management</h4>
                                    <p className="text-muted-foreground">
                                        Leading engineering teams by managing documentation, tracking deliverables, and facilitating vendor and client communication.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Tech</h4>
                                    <p className="text-muted-foreground">
                                        Automating tasks, building tools, and exploring new ideas that enhance productivity and innovation with Python, JavaScript, and C++.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};