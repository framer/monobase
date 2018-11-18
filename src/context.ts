import * as path from "path";
import * as utils from "./utils";
import * as types from "./types";

export const create = (project: types.Project, path: string): types.Context => {
  return { project: project, path: path, url: utils.projectURLForPath(path) };
};
