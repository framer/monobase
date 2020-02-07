import React from "react";
import { Development, StyleSheet } from "monobase";
import { themeStyle } from "fraction";

export const globalStyle = themeStyle;

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
