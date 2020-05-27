import { createVariables, VariableScope } from "./utils"

export type Backdrops = {
  default: string
  medium: string
  heavy: string
}

export const backdrops: Backdrops = {
  default: "blur(12px) saturate(120%)",
  medium: "blur(16px) saturate(120%)",
  heavy: "blur(42px) saturate(120%)",
}

export const [backdropsVariables, backdropsValues] = createVariables(
  backdrops,
  VariableScope.Backdrop
)
