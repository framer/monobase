import * as React from "react"
import {
  backdropsValues,
  dimensionsValues,
  paletteValues,
  colorsValues,
  colorsValuesDark,
  widthValues,
} from "../tokens"

const createMarkup = (html: string) => ({
  __html: html,
})

const variables = `
  :root {
    ${backdropsValues}
    ${colorsValues}
    ${dimensionsValues}
    ${paletteValues}
    ${widthValues}
  }

  [data-theme="light"] {
    ${colorsValues}
  }

  [data-theme="dark"] {
    ${colorsValuesDark}
  }
`

export const Variables = () => (
  <style dangerouslySetInnerHTML={createMarkup(variables)} />
)
