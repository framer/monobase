import * as React from "react"
import { FC } from "react"
import {
  backdropValues,
  colorValues,
  colorValuesDark,
  depthValues,
  dimensionValues,
  paletteValues,
  spaceValues,
  widthValues,
} from "../../tokens"
import { HTMLProps } from "../../types"

const createMarkup = (html: string) => ({
  __html: html,
})

const variables = `
  :root {
    ${backdropValues}
    ${colorValues}
    ${depthValues}
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

export const Variables: FC<HTMLProps<"style">> = () => (
  <style dangerouslySetInnerHTML={createMarkup(variables)} />
)
