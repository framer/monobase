import React from "react";
import _relative from "relative";
import * as types from "./types";
import { PageContext, PageContextType } from "./contexts";

// Allow us to mock context under test. Cannot assign objects to process.env
// in node, the value is always stringified.
let __testContext: types.Context | null = null;
export function __setContextForTest(ctx: types.Context | null) {
  __testContext = ctx;
}

export const Development: React.FunctionComponent = () => {
  const { project } = usePageContext();
  const { componentScript, urlPrefix } = project.config;

  const src = urlPrefix ? urlFor(componentScript) : relative(componentScript);

  return <script src={src} />;
};

// Styles rendered from webpack css
export const StyleSheet = () => {
  const { styles } = usePageContext();
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
};

export const usePageContext = (): PageContextType => {
  return React.useContext(PageContext);
};

export const urlFor = (path: string) => {
  const { project } = usePageContext();
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
  const { path } = usePageContext();
  return _relative(url || urlFor(path), from);
};
