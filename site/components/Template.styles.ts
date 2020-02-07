import { themeStyle } from "fraction";
import { css } from "linaria";

export const fractionStyle = themeStyle;
export const template = css`
  --monobase-type: #999;
  --monobase-border: #eee;
  --monobase-theme-switcher-color: #999;
  --monobase-theme-switcher-hover-color: #bbb;
  --monobase-theme-switcher-background: rgba(220, 220, 220, 0.5);
  --monobase-theme-switcher-hover-background: rgba(220, 220, 220, 0.3);
  --monobase-theme-switcher-rotation: 0deg;

  &.dark {
    --monobase-type: #333;
    --monobase-border: #222;
    --monobase-theme-switcher-color: #555;
    --monobase-theme-switcher-hover-color: #777;
    --monobase-theme-switcher-background: rgba(40, 40, 40, 0.5);
    --monobase-theme-switcher-hover-background: rgba(40, 40, 40, 0.7);
    --monobase-theme-switcher-rotation: 180deg;

    background: #101010;
    transition: background 0.2s;
  }
`;
