import { paletteTokens as palette } from "./palette"
import { rgba } from "../utils"
import { Color } from "."

export const colorTokensDark: Color = {
  primary: palette.blue,
  wireframe: "rgba(255, 0, 0, 0.06)", // rgba(palette.red, 0.08)
  overlay: palette.black50,
  page: palette.gray06,
  pageColor: palette.white,
  selection: "rgba(0, 170, 255, 0.99)",
  selectionFaint: "rgba(0, 170, 255, 0.4)",
  selectionColor: palette.white,
  navigation: palette.gray06,
  navigationBorder: palette.white05,
  navigationColor: palette.white90,
  navigationHamburger: palette.white60,
  footerColor: palette.white80,
  footerHeadingColor: palette.white90,
  footerSecondaryColor: palette.white60,
}
