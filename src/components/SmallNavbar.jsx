import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";


const navItems = [
    
];

export const SmallNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {  
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav 
        className={cn(
            "fixed w-full z-40 transition-all duration-300", 
            isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <Link className="text-xl font-bold text-primary flex items-center" to="/">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground"> Riyad Babayev </span> Portfolio
                    </span>
                </Link>


                {/* desktop navbar */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item, key) => (
                        <Link key={key}
                        to={item.href}
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link 
                      to="/projects"
                      className="px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/80 transition-colors duration-300"
                    >
                      Back to All Projects
                    </Link>
                </div>

            </div>
        </nav>
    );
};