import React from "react"
import { Development, StyleSheet } from "monobase"
import { VariableStyle } from "fraction"

export const Template = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/static/style.css" />
      <VariableStyle />
      <StyleSheet />
    </head>
    <body>
      {children}
      <Development />
    </body>
  </html>
)
