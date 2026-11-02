"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle btn-sm"
      aria-label="Switch between light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <FiSun className="hidden text-lg in-data-[theme=dark]:block" />
      <FiMoon className="block text-lg in-data-[theme=dark]:hidden" />
    </button>
  );
}
