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
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(34, 34, 34, 0.05);
  color: ${colors.buttonText};

  transform: translateZ(0);
  transition: box-shadow 0.3s, background-color 0.2s, color 0.2s;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  &.round {
    border-radius: 100px;
    padding: 3px ${dimensions.inputPaddingHorizontal + 4}px 1px;
  }

  :disabled {
    opacity: 0.5;
  }

  :active:focus:not(:disabled),
  :active:hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundActive};
  }

  :focus:not(:disabled),
  :hover:not(:disabled) {
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
    color: ${colors.buttonTextDimmed};
  }
`;

export const buttonPrimary = css`
  color: ${colors.buttonTextPrimary};
  background-color: ${colors.buttonBackgroundPrimary};
  border: none;

  :focus:not(:disabled),
  :hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundPrimaryHover};
    color: ${colors.buttonTextPrimaryDimmed};
  }

  :active:focus:not(:disabled),
  :active:hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundPrimaryActive};
  }
`;

export const buttonDestructive = css`
  color: ${colors.buttonTextDestructive};
  background-color: ${colors.buttonBackgroundDestructive};
  border: none;

  :focus:not(:disabled),
  :hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundDestructiveHover};
    color: ${colors.buttonTextDestructiveDimmed};
  }

  :active:focus:not(:disabled),
  :active:hover:not(:disabled) {
    background-color: ${colors.buttonBackgroundDestructiveActive};
  }
`;

export const buttonLarge = css`
  height: ${dimensions.inputHeightLarge}px;
  padding: 3px ${dimensions.inputPaddingHorizontalLarge}px 1px;
  font-size: ${fonts.size.base}px;

  &.round {
    padding: 3px ${dimensions.inputPaddingHorizontalLarge + 4}px 1px;
  }
`;

export const buttonRound = css``;
