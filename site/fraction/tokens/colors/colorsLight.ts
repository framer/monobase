import { ColorTokenMap } from "./colorTypes";
import { pallette } from "./palette";
import { rgba } from "../utils/rgba";

const buttonTextColoredDimmed = rgba(pallette.white100, 0.9);

export const colorsLight: ColorTokenMap = {
  // Input
  inputBackground: pallette.light62,

  // Button
  buttonBackground: pallette.white100,
  buttonBackgroundHover: pallette.light54,
  buttonBackgroundActive: pallette.light60,
  buttonText: pallette.dark80,
  buttonTextDimmed: pallette.dark50,
  buttonBackgroundPrimary: pallette.blue100,
  buttonBackgroundPrimaryHover: pallette.blue80,
  buttonBackgroundPrimaryActive: pallette.blue90,
  buttonTextPrimary: pallette.white100,
  buttonTextPrimaryDimmed: buttonTextColoredDimmed,
  buttonBackgroundDestructive: pallette.red110,
  buttonBackgroundDestructiveHover: pallette.red100,
  buttonBackgroundDestructiveActive: pallette.red114,
  buttonTextDestructive: pallette.white100,
  buttonTextDestructiveDimmed: buttonTextColoredDimmed
};
