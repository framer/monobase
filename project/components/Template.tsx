import React from "react";
import { Development, StyleSheet, relative } from "monobase";
import { CSSVariables } from "./CSSVariables";
import { tokens } from "./tokens";

function Template({ children }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <CSSVariables variables={tokens} />
        <link
          rel="stylesheet"
          type="text/css"
          href={relative("/static/styles.css")}
        ></link>
        <StyleSheet />
      </head>
      <body>
        {children}
        <Development />
      </body>
    </html>
  );
}

export default Template;
