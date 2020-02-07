import { css } from "linaria";
import {
  createCSSVariableValues,
  TokenCategory
} from "../tokens/utils/variables";
import { colorsLight } from "../tokens/colors/colorsLight";
import { colorsScope } from "../tokens/colors/colorsScope";

export const colorTokensLight: TokenCategory = {
  tokens: colorsLight,
  scope: colorsScope
};
const lightCSSVariables = createCSSVariableValues([colorTokensLight]);

export const themeStyle = css`
  :global() {
    html {
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
    }
    * {
      box-sizing: inherit;
    }
    html,
    body {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    body {
      ${lightCSSVariables}
      font-family: Colfax, sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      padding: 0;
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 2em;
    }
  }
`;
