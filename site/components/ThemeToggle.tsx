import * as React from "react";
import { Button } from "../fraction";
import { css } from "linaria";
import { Dynamic } from "../../src";

const wrapper = css`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: 10;

  border: none;
  border-radius: 100px;
  background: var(--monobase-theme-switcher-background);
  backdrop-filter: blur(10px);
  color: var(--monobase-theme-switcher-color);
  outline: 0;

  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  transition-property: opacity, color, background, transform;
  transform: rotate(var(--monobase-theme-switcher-rotation));

  :hover {
    background: var(--monobase-theme-switcher-hover-background);
    color: var(--monobase-theme-switcher-hover-color);
  }

  :active {
    opacity: 0.8;
  }
`;

export const StaticThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(false);

  // Set initial theme
  React.useEffect(() => {
    const initialIsDark = localStorage.getItem("themeIsDark");
    if (initialIsDark === "true") {
      document.body.classList.toggle("dark");
      setIsDark(true);
    }
  }, []);

  //   Switch theme on click
  const handleClick = () => {
    localStorage.setItem("themeIsDark", `${!isDark}`);
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  return (
    <button className={wrapper} onClick={handleClick}>
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
