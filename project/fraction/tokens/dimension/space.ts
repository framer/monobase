import { createVariablesFromArray, Scope } from "../utils"

export const space: number[] = [0, 4, 8, 12, 16, 24, 32, 48, 64, 88]

export const [spaceVariables, spaceValues] = createVariablesFromArray(
  space,
  Scope.Space,
  (variable) => `${variable}px`
)
