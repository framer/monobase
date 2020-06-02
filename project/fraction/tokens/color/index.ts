import { color } from "./light"
import { colorDark } from "./dark"
import { createVariables, Scope } from "../utils/variables"

export type Color = {
  border: string
  borderHighlight: string
  toolbarIcon: string
  translucent: string
  wireframe: string

  // Page
  pageBackground: string
  pageColor: string

  // Navigation
  navigationBackground: string
  navigationBorder: string
  navigationColor: string

  // Button
  buttonBackground: string
  buttonColor: string
  buttonHoverBackground: string
  buttonFocusOutline: string
  buttonPrimaryBackground: string
  buttonPrimaryColor: string
  buttonPrimaryHoverBackground: string
  buttonPrimaryFocusOutline: string
  buttonSecondaryBackground: string
  buttonSecondaryColor: string
  buttonSecondaryHoverBackground: string
  buttonSecondaryFocusOutline: string
  buttonSuccessBackground: string
  buttonSuccessColor: string
  buttonSuccessHoverBackground: string
  buttonSuccessFocusOutline: string
  buttonDangerBackground: string
  buttonDangerColor: string
  buttonDangerHoverBackground: string
  buttonDangerFocusOutline: string
  buttonIconColor: string
  buttonIconHoverColor: string

  // Footer
  footerBackground: string
  footerCookiesLink: string
  footerCopyrightLink: string
  footerIcon: string
  footerIconHover: string
  footerLink: string

  // Input
  inputBackground: string
  inputBackgroundTransparent: string
  inputDisabledColor: string
  inputHoverBackground: string
  inputColor: string
  inputPlaceholderColor: string
  inputFocusBorder: string
  inputDangerFocusBorder: string
  inputDangerColor: string

  // List
  listActiveBackground: string
  listColor: string
  listBorder: string

  // Sheet
  sheetBackground: string
  sheetColor: string

  // Tint
  danger: string
  dangerDark: string
  primary: string
  primaryColor: string
  primaryDark: string
  primaryLight: string
  secondary: string
  secondaryColor: string
  secondaryDark: string
  secondaryLight: string
  success: string
  successDark: string
  tertiary: string
  vibrant: string

  // Search
  searchBackground: string
  selection: string
  selectionBackground: string
  selectionBackgroundFaint: string
  sidebarLink: string

  // Text
  textHeadline: string
  textBody: string
  textDimmed: string
  textLight: string

  // Tooltip
  tooltipBackground: string

  // Overlay
  overlayColor: string
}

export const [colorVariables, colorValues] = createVariables(color, Scope.Color)

export const [colorVariablesDark, colorValuesDark] = createVariables(
  colorDark,
  Scope.Color
)

export * from "./light"
export * from "./dark"
export * from "./palette"
