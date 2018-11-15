import * as React from "react";
import { renderToString } from "react-dom/server";
import * as styled from "styled-components";
import { env } from "./env";

// The hack starts here
const { StyleSheet } = styled[
  "__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS"
];
StyleSheet.reset(true);

// Component to inline styled component css
export const StyledSheet: React.SFC<{ app: React.ReactNode }> = props => {
  if (typeof props.app == "string") {
    return null;
  }

  const sheet = new styled.ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(props.app));
  return (sheet.getStyleElement() as any) as React.ReactElement<any>;
};

export const Development = () => {
  if (env.project.build === "debug") {
    return <script src={env.project.config.componentScript} />;
  } else {
    return null;
  }
};

// Hook to use the current project
export const useProject = () => {
  return env.project;
};
