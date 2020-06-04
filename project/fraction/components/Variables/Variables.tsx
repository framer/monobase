import React, { FC } from "react"
import {
  backdropValues,
  colorValues,
  colorValuesDark,
  colorVariables,
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

export interface Props {
  accent?: string
  tint?: string
  navigationAccent?: string
  navigationTint?: string
}

export const Variables: FC<HTMLProps<"style"> & Props> = ({
  accent = colorVariables.primary,
  tint = colorVariables.primary,
  navigationAccent,
  navigationTint,
}) => (
  <Style>{`
    :root {
      ${typeof accent === "string" ? `--page-accent: ${accent};` : ""}
      ${typeof tint === "string" ? `--page-tint: ${tint};` : ""}
      --navigation-accent: ${
        typeof navigationAccent === "string"
          ? navigationAccent
          : "var(--page-accent)"
      };
      --navigation-tint: ${
        typeof navigationTint === "string" ? navigationTint : "var(--page-tint)"
      };

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
