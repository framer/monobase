import React from "react";
import { Development, StyleSheet } from "monobase";

function Template({ children }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
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
