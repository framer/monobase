import { createVariablesFromArray, Scope } from "../utils"

export const spaceTokens: number[] = [0, 4, 8, 12, 16, 24, 32, 48, 64, 88]

export const [space, spaceDeclarations] = createVariablesFromArray(
  spaceTokens,
  Scope.Space,
  (variable) => `${variable}px`
)
