import { createVariablesFromArray, Scope } from "../utils"

export const icon: number[] = [0, 12, 16, 20, 24, 28, 32, 36, 40]

export const [iconVariables, iconValues] = createVariablesFromArray(
  icon,
  Scope.Icon,
  (variable) => `${variable}px`
)
