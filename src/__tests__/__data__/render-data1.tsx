import * as React from "react";
import styled from "styled-components";

import { urlFor, Development, StyledSheet, useContext } from "../../";

const Button = styled.button`
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

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
        <div>
          <Button />
        </div>
      </body>
    </html>
  );
}
