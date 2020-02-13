import { ColorTokenMap } from "./colorTypes";
import { pallette } from "./palette";
import { rgba } from "../utils/rgba";

const buttonTextColoredDimmed = rgba(pallette.white100, 0.9);

export const colorsDark: ColorTokenMap = {
  text: pallette.white100,
  tintPrimary: pallette.blue70,

  // Input
  inputBackground: pallette.light62,

  // Button
  buttonBackground: pallette.dark90,
  buttonBackgroundHover: pallette.dark84,
  buttonBackgroundActive: pallette.dark70,
  buttonText: pallette.light80,
  buttonTextDimmed: pallette.light60,
  buttonBackgroundPrimary: pallette.blue70,
  buttonBackgroundPrimaryHover: pallette.blue60,
  buttonBackgroundPrimaryActive: pallette.blue80,
  buttonTextPrimary: pallette.white100,
  buttonTextPrimaryDimmed: buttonTextColoredDimmed,
  buttonBackgroundDestructive: pallette.red110,
  buttonBackgroundDestructiveHover: pallette.red100,
  buttonBackgroundDestructiveActive: pallette.red114,
  buttonTextDestructive: pallette.white100,
  buttonTextDestructiveDimmed: buttonTextColoredDimmed
};
