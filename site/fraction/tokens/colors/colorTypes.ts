type ValueMap<K extends string> = { readonly [key in K]: string };
export type ColorTokenMap = ValueMap<ColorTokenKey>;

export type ColorTokenKey =
  | "text"
  | "tintPrimary"

  // Button
  | "buttonBackground"
  | "buttonBackgroundHover"
  | "buttonBackgroundActive"
  | "buttonText"
  | "buttonTextDimmed"
  | "buttonBackgroundPrimary"
  | "buttonBackgroundPrimaryHover"
  | "buttonBackgroundPrimaryActive"
  | "buttonTextPrimary"
  | "buttonTextPrimaryDimmed"
  | "buttonBackgroundDestructive"
  | "buttonBackgroundDestructiveHover"
  | "buttonBackgroundDestructiveActive"
  | "buttonTextDestructive"
  | "buttonTextDestructiveDimmed"

  //Input
  | "inputBackground";
