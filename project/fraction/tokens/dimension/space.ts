import { createVariablesFromArray, VariableScope } from "../utils"

export const space: number[] = [0, 4, 8, 16, 24, 32, 48, 64, 88, 128]

export const [spaceVariables, spaceValues] = createVariablesFromArray(
  space,
  VariableScope.Space,
  (variable) => `${variable}px`
)
