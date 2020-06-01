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
import { Style } from "../Style"
import { HTMLProps } from "../../types"

export const Variables: FC<HTMLProps<"style">> = () => (
  <Style>{`
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
  `}</Style>
)
