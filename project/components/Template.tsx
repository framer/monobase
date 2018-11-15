import * as React from "react";
import { Development, StyledSheet } from "monobase";

export default function Template(props) {
  return (
    <html>
      <head>
        <StyledSheet app={props.children} />
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        {props.children}
        {/* The Development component adds auto reloading */}
        <Development />
      </body>
    </html>
  );
}
