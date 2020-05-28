type variableModifier = (variable?: string | number) => string

export enum VariableScope {
  Backdrop = "backdrop",
  Color = "color",
  Dimensions = "dimension",
  Palette = "palette",
  Space = "space",
  Width = "width",
}

export const variableName = (variable: string, scope: string) => {
  return `--fraction-${scope}-${variable}`
}

export const createVariables = <T extends Record<string, string | number>>(
  tokens: T,
  scope: string,
  modifier: variableModifier = (variable) => String(variable)
): [T, string] => {
  const variables: Record<string, string | number> = {}
  const values: string[] = []

  for (const token in tokens) {
    const name = variableName(token, scope)
    const value = modifier(tokens[token])

    values.push(`${name}: ${value};`)
    variables[token] = `var(${name}, ${value})`
  }

  return [variables as T, values.join("\n")]
}

export const createVariablesFromArray = <T extends string | number>(
  arrayTokens: T[],
  scope: string,
  modifier: variableModifier = (variable) => String(variable)
): [Record<string, T>, string] => {
  const tokens: Record<string, T> = arrayTokens.reduce(
    (tokens, token, index) => ({ ...tokens, [index]: token }),
    {}
  )

  return createVariables(tokens, scope, modifier)
}
