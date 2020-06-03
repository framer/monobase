import {
  backdrop,
  backdropVariables,
  backdropValues,
  family,
  familyVariables,
  familyValues,
  color,
  colorVariables,
  colorValues,
  colorDark,
  colorVariablesDark,
  colorValuesDark,
  depth,
  depthVariables,
  depthValues,
  dimension,
  dimensionVariables,
  dimensionValues,
  palette,
  paletteVariables,
  paletteValues,
  size,
  sizeVariables,
  sizeValues,
  space,
  spaceVariables,
  spaceValues,
  weight,
  weightVariables,
  weightValues,
  width,
  widthVariables,
  widthValues,
} from "./tokens"

export const tokens = {
  backdrop,
  color,
  colorDark,
  depth,
  dimension,
  family,
  palette,
  size,
  space,
  width,
  weight,
}

export const variables = {
  backdrop: backdropVariables,
  color: colorVariables,
  colorDark: colorVariablesDark,
  depth: depthVariables,
  dimension: dimensionVariables,
  family: familyVariables,
  palette: paletteVariables,
  size: sizeVariables,
  space: spaceVariables,
  width: widthVariables,
  weight: weightVariables,
}

export const values = {
  backdrop: backdropValues,
  color: colorValues,
  colorDark: colorValuesDark,
  depth: depthValues,
  dimension: dimensionValues,
  family: familyValues,
  palette: paletteValues,
  size: sizeValues,
  space: spaceValues,
  width: widthValues,
  weight: weightValues,
}

export * from "./components"
export * from "./hooks"
export * from "./tokens"
export * from "./types"
