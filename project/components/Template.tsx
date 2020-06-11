import React from "react";
import { Development, StyleSheet, relative } from "monobase";
import { CSSVariables } from "./CSSVariables";
import { tokens } from "./tokens";
import Responsive from "./examples/Responsive";

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
        <Responsive />
      </head>
      <body>
        {children}
        <Development />
      </body>
    </html>
  );
}

export default Template;
