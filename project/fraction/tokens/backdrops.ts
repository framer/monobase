import { createCSSVariables, CSSVariablesScope } from "./utils"

export type Backdrops = {
  default: string
  medium: string
  heavy: string
}

export const backdropsTokens: Backdrops = {
  default: "blur(12px) saturate(120%)",
  medium: "blur(16px) saturate(120%)",
  heavy: "blur(42px) saturate(120%)",
}

export const [backdrops, backdropsCSSVariables] = createCSSVariables(
  backdropsTokens,
  CSSVariablesScope.Backdrop
)
