import React from "react";
import { Development, StyleSheet } from "monobase";
import * as styles from "./Template.styles";

export const Template = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <StyleSheet />
    </head>
    <body className={styles.template}>
      {children}
      <Development />
    </body>
  </html>
);
