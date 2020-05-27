import React from "react"
import { Development, StyleSheet } from "monobase"
import { Variables } from "fraction"

export const Page = ({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/static/style.css" />
      <Variables />
      <StyleSheet />
    </head>
    <body>
      {children}
      <Development />
    </body>
  </html>
)
