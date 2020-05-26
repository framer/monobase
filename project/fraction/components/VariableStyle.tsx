import * as React from "react"
import {
  backdropsCSSVariables,
  dimensionsCSSVariables,
  paletteCSSVariables,
  colorsCSSVariables,
  colorsDarkCSSVariables,
  widthCSSVariables,
} from "../tokens"

const createMarkup = (html: string) => ({
  __html: html,
})

export const variableStyle = `
  :root {
    ${backdropsCSSVariables}
    ${colorsCSSVariables}
    ${dimensionsCSSVariables}
    ${paletteCSSVariables}
    ${widthCSSVariables}
  }

  [data-theme="light"] {
    ${colorsCSSVariables}
  }

  [data-theme="dark"] {
    ${colorsDarkCSSVariables}
  }
`

export const VariableStyle = () => (
  <style dangerouslySetInnerHTML={createMarkup(variableStyle)} />
)
