import { createVariables, Scope } from "../utils"

export type Weight = {
  thin: string
  light: string
  regular: string
  medium: string
  bold: string
  black: string
}

export const weight: Weight = {
  thin: "200",
  light: "300",
  regular: "400",
  medium: "500",
  bold: "600",
  black: "700",
}

export const [weightVariables, weightValues] = createVariables(
  weight,
  Scope.Weight
)
