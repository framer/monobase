import * as types from "./types";

type ProjectOptions = {
  path: string;
  build: "debug" | "production";
  urlPrefix: string;
}

export const project = ({path, build="production", urlPrefix=""}: ProjectOptions): types.Project => {
  return {
    path: path,
    build: build,
    config: {
      pages: "pages",
      static: "static",
      components: "components",
      componentScript: "/components.js",
      extensions: ["js", "ts", "tsx", "mdx"],
      urlPrefix: `/${urlPrefix.replace(/^\/+|\/+$/g, '')}`,
    }
  };
};
