import * as React from "react";
import * as _relative from "relative";
import { renderToString } from "react-dom/server";
import * as styled from "styled-components";
import * as types from "./types";

// Allow us to mock context under test. Cannot assign objects to process.env
// in node, the value is always stringified.
let __testContext: types.Context | null = null;
export function __setContextForTest(ctx: types.Context | null) {
  __testContext = ctx;
}


const getContext = (): types.Context | null => {
  if (__testContext) return __testContext;
  if (!process.env["context"]) return null;
  if (Object.keys(process.env["context"]).length === 0) return null;
  return (process.env["context"] as any) as types.Context;
};

// Component to inline styled component css
export const StyledSheet: React.FunctionComponent<{
  app: React.ReactNode;
}> = props => {
  const sheet = new styled.ServerStyleSheet();

  renderToString(sheet.collectStyles(<>{props.app}</>));

  return (sheet.getStyleElement() as any) as React.ReactElement<any>;
};

export const Development: React.FunctionComponent = () => {
  const project = useProject();
  const { componentScript, urlPrefix } = project.config;
  const src = urlPrefix ? urlFor(componentScript) : relative(componentScript);
  return <script src={src} />;
};

export const useContext = (): types.Context => {
  const context = getContext();
  if (!context) {
    throw Error(
      "process.env.context is missing. You might be using useContext in a Dynamic component? "
    );
  }
  // This gets inserted by webpack on build
  return context as types.Context;
};

export const usePath = (): string => {
  const context = getContext();
  if (context) {
    return context.url;
  }
  return window.location.pathname;
};

export const useProject = (): types.Project => {
  return useContext().project;
};

export const urlFor = (path: string) => {
  const project = useProject();
  const { urlPrefix, static: staticPath, pages: pagesPath } = project.config;

  // Strip preceding slashes.
  path = path.replace(/^\/+/g, "");

  // Match static path and return as is.
  if (path.startsWith(staticPath + "/")) {
    return `${urlPrefix}/${path}`;
  }

  // Otherwise match pages path.
  if (path.startsWith(pagesPath + "/")) {
    // Remove the /pages prefix
    path = path.substr(pagesPath.length + 1);
    // Remove the extension.
    path = path
      .split(".")
      .slice(0, -1)
      .join(".");
    // Remove any trailing /index
    path = path.replace(/^index$|\/index$/, "");

    // Apply urlPrefix and append trailing slash if needed.
    return `${urlPrefix}/${path}${path.length ? "/" : ""}`;
  }

  // Otherwise just add the prefix.
  return `${urlPrefix}/${path}`;
};

export const relative = (from: string, url?: string) => {
  return _relative(url || usePath(), from);
};
