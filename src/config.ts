import * as types from "./types";

export const project = (
  path: string,
  build: "debug" | "production" = "debug"
): types.Project => {
  return {
    path: path,
    build: build,
    config: {
      pages: "pages",
      static: "static",
      components: "components",
      componentScript: "/components.js",
      extensions: ["js", "ts", "tsx", "mdx"]
    }
  };
};
