import { css } from "linaria";

export const themeToggle = css`
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
