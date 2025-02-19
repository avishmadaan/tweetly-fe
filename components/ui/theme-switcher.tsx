"use client"; 
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Optional: Icons for light/dark

export const ThemeSwitcher = ({
    className
}:{className?:string}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; 
  // Render nothing until mounted

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`border p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 ${className} h-12 w-12 flex items-center justify-center`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
