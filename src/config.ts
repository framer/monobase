import * as types from "./types";

type ProjectOptions = {
  path: string;
  build?: "debug" | "production";
  urlPrefix?: string;
};

export const project = ({
  path,
  build = "production",
  urlPrefix = ""
}: ProjectOptions): types.Project => {
  urlPrefix = urlPrefix.replace(/^\/+|\/+$/g, "");
  return {
    path: path,
    build: build,
    config: {
      pages: "pages",
      static: "static",
      components: "components",
      componentScript: "/components.js",
      extensions: ["js", "ts", "tsx", "mdx"],
      urlPrefix: urlPrefix.length > 0 ? `/${urlPrefix}` : ""
    }
  };
};
