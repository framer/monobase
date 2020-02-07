type ValueMap<K extends string> = { readonly [key in K]: string };
export type ColorTokenMap = ValueMap<ColorTokenKey>;

export type ColorTokenKey =
  // Button
  | "buttonBackground"
  | "buttonBackgroundHover"
  | "buttonBackgroundActive"
  | "buttonText"
  | "buttonBackgroundPrimary"
  | "buttonBackgroundPrimaryHover"
  | "buttonBackgroundPrimaryActive"
  | "buttonTextPrimary"

  //Input
  | "inputBackground";
