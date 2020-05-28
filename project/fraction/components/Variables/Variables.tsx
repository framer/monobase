import * as React from "react"
import {
  backdropValues,
  colorValues,
  colorValuesDark,
  dimensionValues,
  paletteValues,
  spaceValues,
  widthValues,
} from "../../tokens"

const createMarkup = (html: string) => ({
  __html: html,
})

const variables = `
  :root {
    ${backdropValues}
    ${colorValues}
    ${dimensionValues}
    ${paletteValues}
    ${spaceValues}
    ${widthValues}
  }

  [data-theme="light"] {
    ${colorValues}
  }

  [data-theme="dark"] {
    ${colorValuesDark}
  }
`

export const Variables = () => (
  <style dangerouslySetInnerHTML={createMarkup(variables)} />
)
