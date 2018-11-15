import * as React from "react";

import { renderToString } from "react-dom/server";
import styled, { ServerStyleSheet } from "styled-components";

// The hack starts here
import { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS } from "styled-components";
const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS;
StyleSheet.reset(true);

const Styled: React.SFC<{ app: React.ReactNode }> = props => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(props.app));
  return (sheet.getStyleElement() as any) as React.ReactElement<any>;
};

const Button = styled.button`
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const app = (
  <div>
    <Button />
  </div>
);

export default () => {
  return (
    <html>
      <head>
        <Styled app={app} />
      </head>
      <body>{app}</body>
    </html>
  );
};
