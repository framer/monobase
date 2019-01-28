import * as React from "react";
import { renderToString } from "react-dom/server";
import * as styled from "styled-components";
import * as types from "./types";
import * as _relative from "relative";

// The hack starts here
const { StyleSheet } = styled[
  "__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS"
];
StyleSheet.reset(true);

// Component to inline styled component css
export const StyledSheet: React.SFC<{ app: React.ReactNode }> = props => {
  const sheet = new styled.ServerStyleSheet();

  renderToString(sheet.collectStyles(<>{props.app}</>));

  return (sheet.getStyleElement() as any) as React.ReactElement<any>;
};

export const Development = () => {
  const context = useContext();
  return <script src={relative(context.project.config.componentScript)} />;
};

export const useContext = (): types.Context => {
  if (!process.env["context"]) {
    throw Error(
      "process.env.context is missing. You might be using useContext in a Dynamic component? "
    );
  }
  // This gets inserted by webpack on build
  return (process.env["context"] as any) as types.Context;
};

export const useProject = (): types.Project => {
  return useContext().project;
};

export const relative = (from: string, url?: string) => {
  return _relative(url || useContext().url, from);
};
