import { createVariables, VariableScope } from "./utils"

export type Backdrop = {
  default: string
  medium: string
  heavy: string
}

export const backdrop: Backdrop = {
  default: "blur(12px) saturate(120%)",
  medium: "blur(16px) saturate(120%)",
  heavy: "blur(42px) saturate(120%)",
}

export const [backdropVariables, backdropValues] = createVariables(
  backdrop,
  VariableScope.Backdrop
)
