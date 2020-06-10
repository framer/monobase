import { color } from "./light"
import { colorDark } from "./dark"
import { createVariables, Scope } from "../utils/variables"

export const [colorVariables, colorValues] = createVariables(color, Scope.Color)

export const [colorVariablesDark, colorValuesDark] = createVariables(
  colorDark,
  Scope.Color
)

export * from "./light"
export * from "./dark"
export * from "./palette"
export * from "./types"
