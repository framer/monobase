import { paletteTokens as palette } from "./palette"
import { rgba } from "../utils"
import { Color } from "."

export const colorTokens: Color = {
  primary: palette.blue,
  wireframe: "rgba(255, 0, 0, 0.06)", // rgba(palette.red, 0.08)
  overlay: palette.black50,
  page: palette.white,
  pageColor: palette.black,
  selection: "rgba(0, 170, 255, 0.99)",
  selectionFaint: "rgba(0, 170, 255, 0.4)",
  selectionColor: palette.white,
  navigation: palette.white,
  navigationBorder: palette.black05,
  navigationColor: palette.black,
  navigationHamburger: palette.black60,
  footerColor: palette.black80,
  footerHeadingColor: palette.black,
  footerSecondaryColor: palette.black60,
}
