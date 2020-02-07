export const variablePrefix = "--framer-fraction-";

export type ValueMap<K extends string> = { readonly [key in K]: string };

export interface TokenCategory {
  tokens: { [key: string]: string };
  scope: string;
}

export function variableName(key: string, scope: string) {
  return `${variablePrefix}${key}-${scope}`;
}

export function createCSSVariables<T extends { [key: string]: string }>(
  values: T,
  scopeKey: string
): T {
  const result: { [key: string]: string } = {};

  for (const key in values) {
    result[key] = `var(${variableName(key, scopeKey)}, ${values[key]})`;
  }

  return result as T;
}

export function createCSSVariableValues(
  tokenCategories: TokenCategory[]
): string {
  const lines: string[] = [];

  for (const tokenCategory of tokenCategories) {
    for (const tokenKey in tokenCategory.tokens) {
      lines.push(
        `${variableName(tokenKey, tokenCategory.scope)}: ${
          tokenCategory.tokens[tokenKey]
        };`
      );
    }
  }

  return `
        ${lines.join("\n")}
    `;
}
