import { createVariables, Scope } from "../utils"

export type Family = {
  default: string
  mono: string
  scribble: string
  interface: string
}

export const familyTokens: Family = {
  default: "GT Walsheim, Helvetica Neue, Helvetica, Arial, sans-serif",
  mono: "Input, SF Mono, Menlo, Monaco, Courier, monospace",
  scribble: "Nanum Pen Script, cursive",
  interface:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
}

export const [family, familyDeclarations] = createVariables(
  familyTokens,
  Scope.Family
)
