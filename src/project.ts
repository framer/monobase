import * as webpack from "webpack";
import chalk from "chalk";

import * as fs from "fs";
import * as _ from "lodash";
import * as utils from "./utils";
import * as types from "./types";
import * as server from "./server";
import * as _build from "./build";

export const build = async (project: types.Project, path: string) => {
  console.log("Exporting project");
  console.log(chalk.gray(path));

  utils.rmdir(path);
  utils.mkdir(path);

  console.log("Building pages");
  await _build.pages(project, path);

  console.log("Generating component script");
  await _build.script(project, path);

  console.log("Copying static assets");
  await _build.assets(project, path);
};

export const serve = server.serve;
