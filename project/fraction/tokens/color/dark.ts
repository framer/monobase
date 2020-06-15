import { paletteTokens as palette } from "./palette"
import { transparent } from "../utils"
import { Color } from "."

export const colorTokensDark: Color = {
  primary: palette.blue,
  wireframe: transparent(palette.red, 0.08),
  overlay: palette.black50,
  border: palette.white05,
  page: palette.gray06,
  pageColor: palette.white,
  selection: transparent(palette.blue, 0.99),
  selectionFaint: transparent(palette.blue, 0.4),
  selectionColor: palette.white,
  navigation: palette.gray06,
  navigationBorder: palette.white05,
  navigationColor: palette.white90,
  navigationHamburger: palette.white60,
  footerColor: palette.white80,
  footerHeadingColor: palette.white90,
  footerSecondaryColor: palette.white60,
}
