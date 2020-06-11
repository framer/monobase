import { createVariables, Scope } from "../utils"

export const paletteTokens: Record<string, string> = {
  // Dark
  dark100: "#111",
  dark94: "#181818",
  dark90: "#222",
  dark88: "#232323",
  dark86: "#252525",
  dark84: "#282828",
  dark82: "#2b2b2b",
  dark80: "#333",
  dark74: "#363636",
  dark70: "#444",
  dark60: "#555",
  dark50: "#666",
  dark40: "#777",
  dark30: "#888",
  dark20: "#999",

  // Light
  light100: "#aaa",
  light92: "#bababa",
  light90: "#bbb",
  light80: "#ccc",
  light70: "#ddd",
  light62: "#e3e3e3",
  light60: "#eee",
  light58: "#f3f3f3",
  light56: "#f4f4f4",
  light54: "#f5f5f5",
  light52: "#fdfdfd",

  // Blue
  blue: "#09f",
  blueLight: "#0af",
  blueDark: "#07f",

  // Deep Blue
  deepBlue: "#05f",
  deepBlueLight: "#07f",
  deepBlueDark: "#04d",

  // Sky
  sky: "#0cf",
  skyLight: "#75e3ff",
  skyDark: "#0bf",

  // Teal
  teal: "#2dd",
  tealLight: "#2effff",
  tealDark: "#06c6c6",

  // Purple
  purple: "#85f",
  purpleLight: "#9966ff",
  purpleDark: "#7033ff",

  // Pink
  pink: "#f59",
  pinkLight: "#ff61c0",
  pinkDark: "#ef4d88",

  // Red
  red: "#f36",
  redLight: "#ff0155",
  redDark: "#e7315f",

  // Yellow
  yellow: "#fb0",
  yellowLight: "#fc0",
  yellowDark: "#fa0",

  // Green
  green: "#0c8",
  greenLight: "#0e9",
  greenDark: "#00B37D",

  // Others
  white: "#fff",
  black: "#000",
  transparent: "transparent",
}

export const [palette, paletteDeclarations] = createVariables(
  paletteTokens,
  Scope.Palette
)
