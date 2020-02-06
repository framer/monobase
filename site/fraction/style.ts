import { css } from "linaria";
import * as theme from "./theme";

const fontLocation = "/static/fonts";

export const fractionStyle = () => css`
  :global() {
    /* Resets */
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
      font-family: ${theme.light.font};
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      background-color: ${theme.light.color.B0};
      color: ${theme.light.color.B100};
      padding: 0;
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 2em;
    }

    /* Themes */
    ::selection {
      color: ${theme.light.color.selection};
      background: ${theme.light.color.selectionBg};
    }

    body.theme-dark {
      background-color: ${theme.dark.color.B0};
      color: ${theme.dark.color.B0};

      ::selection {
        color: ${theme.dark.color.selection};
        background: ${theme.dark.color.selectionBg};
      }
    }

    body.theme-transparent {
      ::selection {
        color: ${theme.transparent.color.selection};
        background: ${theme.transparent.color.selectionBg};
      }
    }

    /* Type */
    a {
      text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-rendering: geometricPrecision;
    }
  }
`;
