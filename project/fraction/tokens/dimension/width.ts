import { createVariablesFromArray, Scope } from "../utils"

export const widthTokens: number[] = [
  0,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1200,
  1400,
]

export const [width, widthDeclarations] = createVariablesFromArray(
  widthTokens,
  Scope.Width,
  (variable) => `${variable}px`
)
