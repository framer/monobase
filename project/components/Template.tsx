import * as React from "react";
import { urlFor, Development, StyledSheet, useContext } from "monobase";

export default function Template(props) {
  const context = useContext();
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <StyledSheet app={props.children} />
        <link rel="stylesheet" href={urlFor("/static/styles.css")} />
      </head>
      <body>
        {props.children}
        <Development />
      </body>
    </html>
  );
}
