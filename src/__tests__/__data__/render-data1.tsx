import * as React from "react";

import { renderToString } from "react-dom/server";
import styled, { ServerStyleSheet } from "styled-components";

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
