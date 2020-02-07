import { css } from "linaria";
import { colors, shadows } from "../tokens";

export const toggle = css`
  cursor: pointer;
  display: block;
  position: relative;

  height: 24px;
  border-radius: 100px;
  width: 40px;

  background: ${colors.inputBackground};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);

  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:before {
    content: "";
    display: block;
    position: absolute;

    height: 18px;
    width: 18px;
    border-radius: 50%;
    top: 3px;
    left: 3px;

    background: ${colors.buttonBackground};
    box-shadow: ${shadows.knob};

    transition: left 0.2s ease;
    will-change: left;
  }
`;

export const toggleActive = css`
  background: ${colors.buttonBackgroundPrimary};

  &:before {
    left: 19px;
  }
`;
