import * as React from "react";
import { Development, StyleSheet } from "monobase";

export default function Template({ children }) {
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
