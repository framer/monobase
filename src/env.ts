import { Project } from "./types";

const project: Project = {
  path: null,
  build: "debug",
  config: {
    pages: "pages",
    static: "static",
    components: "components",
    componentScript: "/components.js"
  }
};

export const env = {
  project: project
};
