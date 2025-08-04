import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      // Defaults to dark mode if no theme is set
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button 
        onClick={toggleTheme} 
        className={cn(
            "fixed max-sm:hidden top-1.5 right-4 z-50 p-2 rounded-full transition-colors duration-300 transition-transform duration-300 hover:scale-[1.1]",
            "focus:outline-hidden"
        )}
    >
      {isDarkMode ? (
        <Sun className="h-7 w-7 text-yellow-300" />
      ) : (
        <Moon className="h-7 w-7 text-blue-900" />
      )}
    </button>
  );
};