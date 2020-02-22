import React from "react";
import { Development, StyleSheet } from "monobase";

export const Template = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/static/style.css" />
      <StyleSheet />
    </head>
    <body>
      {children}
      <Development />
    </body>
  </html>
);
