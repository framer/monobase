import React from "react";
import { Development, StyleSheet } from "monobase";
import { fractionStyle } from "fraction";

export const globalStyle = fractionStyle;

export const Template = ({ children }) => (
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
