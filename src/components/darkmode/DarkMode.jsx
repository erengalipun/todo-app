import { useEffect } from "react";

export default function DarkMode() {
  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains("light-mode")
      ? "dark-mode"
      : "light-mode";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(currentTheme);
    localStorage.setItem("theme", currentTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light-mode";
    document.body.classList.add(savedTheme);
  }, []);

  return (
    <button onClick={toggleTheme} className="material-symbols-outlined">
      dark_mode
    </button>
  );
}
