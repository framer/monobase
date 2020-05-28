import { createVariables, VariableScope } from "../utils"

export type Depth = {
  negative: number
  zero: number
  default: number
  high: number
  higher: number
  highest: number
  navigation: number
  overlay: number
}

export const depth: Record<string, number> = {
  negative: -1,
  zero: 0,
  default: 1,
  high: 10,
  higher: 20,
  highest: 30,
  navigation: 10000,
  overlay: 20000,
  wireframe: 30000,
}

export const [depthVariables, depthValues] = createVariables(
  depth,
  VariableScope.Depth
)
