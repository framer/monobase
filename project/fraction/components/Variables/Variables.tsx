import * as React from "react"
import { FC } from "react"
import {
  backdropValues,
  colorValues,
  colorValuesDark,
  depthValues,
  dimensionValues,
  familyValues,
  paletteValues,
  sizeValues,
  spaceValues,
  weightValues,
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
      ${familyValues}
      ${paletteValues}
      ${sizeValues}
      ${spaceValues}
      ${weightValues}
      ${widthValues}
    }

    [data-theme="light"], [data-navigation-theme="light"] .navigation {
      ${colorValues}
    }

    [data-theme="dark"], [data-navigation-theme="dark"] .navigation {
      ${colorValuesDark}
    }
  `}</Style>
)
