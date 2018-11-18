import * as React from "react";
import { relative, Development, StyledSheet, useContext } from "monobase";

export default function Template(props) {
  const context = useContext();
  return (
    <html>
      <head>
        <StyledSheet app={props.children} />
        <link rel="stylesheet" href={relative("/static/styles.css")} />
      </head>
      <body>
        {props.children}
        {/* The Development component adds auto reloading */}
        <Development />
      </body>
    </html>
  );
}
