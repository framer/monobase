import { createVariablesFromArray, Scope } from "../utils"

export const iconTokens: number[] = [0, 12, 16, 20, 24, 28, 32, 36, 40]

export const [icon, iconDeclarations] = createVariablesFromArray(
  iconTokens,
  Scope.Icon,
  (variable) => `${variable}px`
)
