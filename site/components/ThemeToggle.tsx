import * as React from "react";
import { Dynamic } from "../../src";
import * as styles from "./ThemeToggle.styles";

export const StaticThemeToggle = () => {
  // Set initial theme
  React.useEffect(() => {
    const isDark = localStorage.getItem("themeIsDark") === "true";
    if (isDark) {
      document.body.classList.toggle("dark");
    }
  }, []);

  // Switch theme on click
  const handleClick = () => {
    const isDark = localStorage.getItem("themeIsDark") === "true";
    localStorage.setItem("themeIsDark", `${isDark ? "false" : "true"}`);
    document.body.classList.toggle("dark");
  };

  return (
    <button className={styles.themeToggle} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          d="M 8 0 C 12.418 0 16 3.582 16 8 C 16 12.418 12.418 16 8 16 C 3.582 16 0 12.418 0 8 C 0 3.582 3.582 0 8 0 Z M 2 8.424 C 2 11.505 4.498 14.004 7.58 14.004 C 7.812 14.004 8 13.815 8 13.583 L 8 2.424 C 8 2.192 7.812 2.004 7.58 2.004 C 4.498 2.004 2 4.502 2 7.583 Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
};

export const ThemeToggle = Dynamic(StaticThemeToggle);
