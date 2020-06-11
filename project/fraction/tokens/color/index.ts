import { colorTokens } from "./light"
import { colorTokensDark } from "./dark"
import { createVariables, Scope } from "../utils/variables"

export const [color, colorDeclarations] = createVariables(
  colorTokens,
  Scope.Color
)

export const [colorDark, colorDeclarationsDark] = createVariables(
  colorTokensDark,
  Scope.Color
)

export * from "./light"
export * from "./dark"
export * from "./palette"
export * from "./types"
