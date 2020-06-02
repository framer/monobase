import { createVariablesFromArray, Scope } from "../utils"

export const size: number[] = [
  0,
  0.6,
  0.7,
  0.8,
  1,
  1.3,
  1.7,
  2.2,
  2.8,
  3.5,
  4.3,
]

export const [sizeVariables, sizeValues] = createVariablesFromArray(
  size,
  Scope.Size,
  (variable) => `${variable}rem`
)
