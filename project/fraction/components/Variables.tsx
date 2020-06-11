import React from "react"
import { color } from "../tokens"
import { backdropDeclarations } from "../tokens/backdrop"
import {
  colorDeclarations,
  paletteDeclarations,
  colorDeclarationsDark,
} from "../tokens/color"
import {
  depthDeclarations,
  dimensionDeclarations,
  iconDeclarations,
  spaceDeclarations,
  widthDeclarations,
} from "../tokens/dimension"
import {
  familyDeclarations,
  sizeDeclarations,
  weightDeclarations,
} from "../tokens/typography"
import { Style } from "./Style"
import { Component } from "../types"

export interface Props {
  accent?: string
  tint?: string
  navigationAccent?: string
  navigationTint?: string
}

export const Variables: Component<"style", Props> = ({
  accent = color.primary,
  tint = color.primary,
  navigationAccent,
  navigationTint,
  ...props
}) => (
  <Style {...props}>{`
    :root {
      --page-accent: ${typeof accent === "string" ? accent : color.primary};
      --page-tint: ${typeof tint === "string" ? tint : color.primary};
      --navigation-accent: ${
        typeof navigationAccent === "string"
          ? navigationAccent
          : "var(--page-accent)"
      };
      --navigation-tint: ${
        typeof navigationTint === "string" ? navigationTint : "var(--page-tint)"
      };

      ${backdropDeclarations}
      ${colorDeclarations}
      ${depthDeclarations}
      ${dimensionDeclarations}
      ${familyDeclarations}
      ${iconDeclarations}
      ${paletteDeclarations}
      ${sizeDeclarations}
      ${spaceDeclarations}
      ${weightDeclarations}
      ${widthDeclarations}
    }

    [data-theme="light"], [data-navigation-theme="light"] .navigation {
      ${colorDeclarations}
    }

    [data-theme="dark"], [data-navigation-theme="dark"] .navigation {
      ${colorDeclarationsDark}
    }
  `}</Style>
)
