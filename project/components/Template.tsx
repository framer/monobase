import * as React from "react";
import { Project } from "monobase";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// The hack starts here
import { renderToString } from "react-dom/server";
import { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS } from "styled-components";
const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS;
StyleSheet.reset(true);

const Styled: React.SFC<{ app: React.ReactNode }> = props => {
  if (typeof props.app == "string") {
    return null;
  }

  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(props.app));
  return (sheet.getStyleElement() as any) as React.ReactElement<any>;
};

const Template: React.SFC<{
  project: Project;
  children?: React.ReactNode;
}> = props => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/styles.css" />
        <Styled app={props.children} />
      </head>
      <body>
        {props.children}
        <script src={props.project.config.componentScript} />
      </body>
    </html>
  );
};

export default Template;
