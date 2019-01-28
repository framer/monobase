import * as path from "path";
import * as resolve from "./resolve";
import * as types from "./types";

export const create = (project: types.Project, path: string): types.Context => {
  return {
    project: project,
    path: path,
    url: resolve.urlForPage(project.config.pages, path)
  };
};
