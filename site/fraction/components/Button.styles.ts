import { css } from "linaria";
import { colors, fonts, dimensions } from "../tokens";

export const button = css`
  -webkit-appearance: none;

  position: relative;
  outline: 0;
  border: none;
  height: ${dimensions.inputHeight}px;
  padding: 3px ${dimensions.inputPaddingHorizontal}px 1px;

  font-family: ${fonts.family.default};
  font-size: ${fonts.size.small}px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.1px;
  text-align: center;
  text-decoration: none;

  border-radius: ${dimensions.inputRadius}px;
  background-color: ${colors.buttonBackground};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 1px 0 rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  color: ${colors.buttonText};

  transform: translateZ(0);
  transition: box-shadow 0.3s, background-color 0.2s, color 0.2s;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
  }

  :hover {
    background-color: ${colors.buttonBackgroundHover};
  }

  :active:focus:not(:disabled),
  :active:hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundActive};
  }

  :focus:not(:disabled),
  :hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundHover};
  }
`;

export const buttonPrimary = css`
  color: ${colors.buttonTextPrimary};
  background-color: ${colors.buttonBackgroundPrimary};

  :focus:not(:disabled),
  :hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundPrimaryHover};
  }

  :active:focus:not(:disabled),
  :active:hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundPrimaryActive};
  }
`;
