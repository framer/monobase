import { createVariables, Scope } from "./utils"

export type Backdrop = {
  default: string
  medium: string
  heavy: string
}

export const backdropTokens: Backdrop = {
  default: "blur(12px) saturate(120%)",
  medium: "blur(16px) saturate(120%)",
  heavy: "blur(42px) saturate(120%)",
}

export const [backdrop, backdropDeclarations] = createVariables(
  backdropTokens,
  Scope.Backdrop
)
