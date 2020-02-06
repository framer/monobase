export type Scale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ScaleMinor = 0 | 1 | 2 | 3 | 4;

export enum ColorEnum {
  /** Background for buttons and cta's */
  primary = "primary",

  /** Lighter main color for highlights */
  primaryLight = "primaryLight",

  /** Darker main color for hover/active states */
  primaryDark = "primaryDark",

  /** Text color used in combination with primary color */
  primaryColor = "primaryColor",

  /** Used for secondary buttons/cta's */
  secondary = "secondary",

  /** Darker secondary color for hover/active states */
  secondaryDark = "secondaryDark",

  /** Lighter main color for highlights */
  secondaryLight = "secondaryLight",

  /** Text color used in combination with secondary color */
  secondaryColor = "secondaryColor",

  /** Used for tertiary buttons/cta's */
  tertiary = "tertiary",

  /** Used for errors and destructive actions */
  danger = "danger",

  /** Used for errors and destructive actions hover/active states */
  dangerDark = "dangerDark",

  /** Used for success states */
  success = "success",

  /** Used for success hover/active states */
  successDark = "successDark",

  /** Vibrant color used on images */
  vibrant = "vibrant",

  /** Translucent color used on headers */
  translucent = "translucent",

  /** Background for card like objects like input, button, package cards etc... */
  pane = "pane",

  /** Border for card like objects like input, button, package cards etc... */
  paneBorder = "paneBorder",

  /** Full black */
  black = "black",

  /** Full white */
  white = "white",

  /** Button background color */
  button = "button",

  /** Button text color */
  buttonColor = "buttonColor",

  /** Button hover background color */
  buttonHover = "buttonHover",

  /** Button hover text color */
  buttonHoverColor = "buttonHoverColor",

  /** Text selection color */
  selection = "selection",

  /** Text selection background */
  selectionBg = "selectionBg",

  /** 100% brightness */
  B100 = "B100",

  /** 90% brightness */
  B90 = "B90",

  /** 80% brightness */
  B80 = "B80",

  /** 70% brightness */
  B70 = "B70",

  /** 60% brightness */
  B60 = "B60",

  /** 50% brightness */
  B50 = "B50",

  /** 40% brightness */
  B40 = "B40",

  /** 30% brightness */
  B30 = "B30",

  /** 20% brightness */
  B20 = "B20",

  /** 10% brightness */
  B10 = "B10",

  /** 0% brightness */
  B0 = "B0"
}

export type Color = keyof typeof ColorEnum;
export type Colors = { [key in Color]: string };

export enum Tint {
  Aqua = "aqua",
  Alizarin = "alizarin",
  BlueViolet = "blue-violet",
  Cerise = "cerise",
  DeepBlue = "deep-blue",
  DeepPurple = "deep-purple",
  LightBlue = "light-blue",
  Purple = "purple",
  PurpleHeart = "purple-heart",
  Midnight = "midnight",
  Black = "black",
  GetStarted = "get-started"
}

export type Tints = { [key in Tint]: TintInfo };

export type TintInfo = {
  /** Base color */
  default: string;

  /** Used for borders, innder shadows and other darker details */
  dark: string;

  /** Used for subtle highlights, gradients and other lighter details */
  light: string;
};

export type Screens = {
  mobileS: string;
  mobileM: string;
  mobileL: string;
  tabletS: string;
  tablet: string;
  laptop: string;
  desktop: string;
  widescreen: string;
  ultrawidescreen: string;
};

export type Weight = {
  normal: number;
  medium: number;
  bold: number;
  black: number;
};

export type Tracking = {
  heading: string;
  lead: string;
  body: string;
};

export type Backdrops = {
  default: string;
  medium: string;
  heavy: string;
};

export type PagePadding = {
  bar: string;
  banner: string;
};

export type FractionTheme = {
  border: string | string[];
  backdrops: Backdrops;
  color: Colors;
  font: string;
  fontMono: string;
  pagePadding: PagePadding;
  radius: string[];
  screen: Screens;
  screenMax: Screens;
  shadow: string[];
  size: string[];
  space: string[];
  tints: Tints;
  tracking: Tracking;
  weight: Weight;
  width: string[];
};

export enum ThemeVariants {
  light = "light",
  dark = "dark",
  transparent = "transparent"
}

// Light Theme
export const light: FractionTheme = {
  color: {
    B0: "#FFF",
    B10: "#FAFAFA",
    B20: "#F3F3F3",
    B30: "#EEE",
    B40: "#CCC",
    B50: "#AAA",
    B60: "#888",
    B70: "#666",
    B80: "#444",
    B90: "#111",
    B100: "#000",
    black: "#000",
    button: "#FFF",
    buttonColor: "#000",
    buttonHover: "#FFF",
    buttonHoverColor: "#555",
    danger: "#F44",
    dangerDark: "#F34",
    vibrant: "rgba(255, 255, 255, .9)",
    translucent: "rgba(255, 255, 255, .6)",
    pane: "#FFF",
    paneBorder: "#EEE",
    primary: "#05F",
    primaryColor: "#FFF",
    primaryDark: "#04f",
    primaryLight: "#06F",
    secondary: "#09F",
    secondaryColor: "#FFF",
    secondaryDark: "#08F",
    secondaryLight: "#0AF",
    tertiary: "#60f",
    selection: "#FFF",
    selectionBg: "rgba(0, 85, 255, 0.99)",
    success: "#0C8",
    successDark: "#00c281",
    white: "#FFF"
  },
  space: [
    "0px",
    "5px",
    "10px",
    "20px",
    "40px",
    "80px",
    "120px",
    "160px",
    "200px"
  ],
  size: ["0", "14px", "18px", "26px", "36px", "48px", "58px", "72px", "110px"],
  width: [
    "0",
    "300px",
    "400px",
    "500px",
    "600px",
    "700px",
    "800px",
    "900px",
    "1000px"
  ],
  weight: {
    normal: 400,
    medium: 500,
    bold: 600,
    black: 700
  },
  tracking: {
    heading: "-4px",
    lead: "-1px",
    body: "-0.5px"
  },
  radius: ["0", "8px", "10px", "12px", "14px", "16px", "50%"],
  backdrops: {
    default: "blur(12px) saturate(120%)",
    medium: "blur(16px) saturate(120%)",
    heavy: "blur(42px) saturate(120%)"
  },
  border: ["1px solid rgba(0, 0, 0, 0.09)", "1px solid rgba(0, 0, 0, 0.07)"],
  shadow: [
    "none",
    "0px 8px 10px 0px rgba(0, 0, 0, 0.02), inset 0px 0px 0px 1px rgba(34, 34, 34, 0.07)",
    "0 1px 0 rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05)",
    "0 1px 0 rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 0, 0, 0.03), 0 20px 30px rgba(0, 0, 0, 0.1)",
    "0 1px 0 rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.2)"
  ],
  font:
    "Colfax, Neue Helvetica W02, Helvetica Neue, Helvetica, Arial, sans-serif",
  fontMono: "Input, SF Mono, Menlo, Monaco, Courier, monospace",
  screen: {
    mobileS: "min-width: 320px",
    mobileM: "min-width: 375px",
    mobileL: "min-width: 425px",
    tabletS: "min-width: 600px",
    tablet: "min-width: 768px",
    laptop: "min-width: 1024px",
    desktop: "min-width: 1280px",
    widescreen: "min-width: 1440px",
    ultrawidescreen: "min-width: 1700px"
  },
  screenMax: {
    mobileS: "max-width: 319px",
    mobileM: "max-width: 374px",
    mobileL: "max-width: 424px",
    tabletS: "max-width: 599px",
    tablet: "max-width: 767px",
    laptop: "max-width: 1023px",
    desktop: "max-width: 1279px",
    widescreen: "max-width: 1439px",
    ultrawidescreen: "min-width: 1699px"
  },
  pagePadding: {
    bar: "60px",
    banner: "32px"
  },
  tints: {
    aqua: {
      dark: "#4C00F0",
      default: "#4E01FF",
      light: "#8400FF"
    },
    purple: {
      dark: "#4204C8",
      default: "#490BDA",
      light: "#8400FF"
    },
    alizarin: {
      dark: "#3D02DE",
      default: "#4400FF",
      light: "#4A2EFF"
    },
    "deep-blue": {
      dark: "#0053fa",
      default: "#0055ff",
      light: "#0073FF"
    },
    "light-blue": {
      dark: "#0093F5",
      default: "#09F",
      light: "#33A3FF"
    },
    "deep-purple": {
      dark: "#591CD4",
      default: "#6222E2",
      light: "#8605FF"
    },
    "blue-violet": {
      dark: "#9B1ADB",
      default: "#A222E2",
      light: "#C105FF"
    },
    "purple-heart": {
      dark: "#7712C4",
      default: "#8217D3",
      light: "#970FFF"
    },
    cerise: {
      dark: "#9000F0",
      default: "#9900ff",
      light: "#C233FF"
    },
    midnight: {
      dark: "#000",
      default: "#10001A",
      light: "#2A0042"
    },
    black: {
      dark: "#000",
      default: "#111",
      light: "#222"
    },
    "get-started": {
      dark: "#5E00BD",
      default: "#8C01FF",
      light: "#A538FF"
    }
  }
};

export const dark = {
  ...light,
  color: {
    primary: "#07F",
    primaryDark: "#09F",
    primaryLight: "#0AF",
    primaryColor: "#FFF",
    secondary: "#0AF",
    secondaryDark: "#0CF",
    secondaryLight: "#09F",
    secondaryColor: "#FFF",
    tertiary: "#60f",
    danger: "#F44",
    dangerDark: "#F55",
    success: "#0D0",
    successDark: "#0C0",
    vibrant: "rgba(0, 0, 0, .8)",
    translucent: "rgba(0, 0, 0, .5)",
    pane: "#111",
    paneBorder: "#222",
    button: "#333",
    buttonColor: "#FFF",
    buttonHover: "#444",
    buttonHoverColor: "#EEE",
    black: "#000",
    white: "#FFF",
    selection: "#FFF",
    selectionBg: "rgba(0, 170, 255, 0.99)",
    B100: "#FFF",
    B90: "#DDD",
    B80: "#CCC",
    B70: "#999",
    B60: "#777",
    B50: "#555",
    B40: "#333",
    B30: "#222",
    B20: "#111",
    B10: "#0B0B0B",
    B0: "#000"
  },
  border: "1px solid rgba(255, 255, 255, 0.1)"
};

export const transparent = {
  color: {
    primary: "#FFF",
    primaryDark: "rgba(255,255,255,.8)",
    primaryLight: "rgba(255,255,255,.6)",
    primaryColor: "#000",
    secondary: "rgba(255,255,255,.2)",
    secondaryDark: "rgba(255,255,255,.4)",
    secondaryLight: "rgba(255,255,255,.3",
    secondaryColor: "#FFF",
    tertiary: "#60f",
    danger: "#F66",
    dangerDark: "#F55",
    success: "#0D0",
    successDark: "#0C0",
    translucent: "rgbaf(255,255,255,.5)",
    pane: "rgba(255,255,255,.2)",
    paneBorder: "rgba(255,255,255,.3)",
    button: "rgba(255,255,255,.25)",
    buttonColor: "#FFF",
    buttonHover: "rgba(255, 255, 255, .4)",
    buttonHoverColor: "#FFF",
    black: "#000",
    white: "#FFF",
    selection: "#FFF",
    selectionBg: "rgba(255,255,255,0.9)",
    B100: "#FFF",
    B90: "rgba(255,255,255,.9)",
    B80: "rgba(255,255,255,.8)",
    B70: "rgba(255,255,255,.7)",
    B60: "rgba(255,255,255,.6)",
    B50: "rgba(255,255,255,.5)",
    B40: "rgba(255,255,255,.4)",
    B30: "rgba(255,255,255,.3)",
    B20: "rgba(255,255,255,.2)",
    B10: "rgba(255,255,255,.1)",
    B0: "rgba(255,255,255,0)"
  },
  border: "1px solid rgba(255, 255, 255, 0.05)"
};
