import React from "react"
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
import { Component } from "../../types"

export interface Props {
  accent?: string
  tint?: string
  navigationAccent?: string
  navigationTint?: string
}

export const Variables: Component<"style", Props> = ({
  accent = colorVariables.primary,
  tint = colorVariables.primary,
  navigationAccent,
  navigationTint,
  ...props
}) => (
  <Style {...props}>{`
    :root {
      --page-accent: ${
        typeof accent === "string" ? accent : colorVariables.primary
      };
      --page-tint: ${typeof tint === "string" ? tint : colorVariables.primary};
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
