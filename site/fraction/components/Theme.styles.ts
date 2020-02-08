import { css } from "linaria";
import { createCSSVariableValues } from "../tokens/utils/variables";
import { shadowTokensLight } from "../tokens/shadows";
import { colorTokensLight, colorTokensDark } from "../tokens/colors";

const lightCSSVariables = createCSSVariableValues([
  colorTokensLight,
  shadowTokensLight
]);

const darkCSSVariables = createCSSVariableValues([colorTokensDark]);

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
      ${lightCSSVariables};
      font-family: Colfax, sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      padding: 0;
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 2em;
    }

    body.dark {
      ${darkCSSVariables};
    }
  }
`;
