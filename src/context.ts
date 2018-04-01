import * as path from "path";
import * as utils from "./utils";
import * as types from "./types";

export const page = path => {
  try {
    return require(path).context;
  } catch (error) {
    return {};
  }
};

export const project = (project: types.Project) => {
  return utils
    .glob(path.join(project.path, project.config.pages))
    .map(pagePath => {
      return {};
    });
};
