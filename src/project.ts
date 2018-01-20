import * as webpack from "webpack";
import chalk from "chalk";

import * as fs from "fs";
import * as _ from "lodash";
import * as prettyBytes from "pretty-bytes";
import * as utils from "./utils";
import * as types from "./types";
import * as server from "./server";
import * as _build from "./build";

export const build = async (project: types.Project, path: string) => {
  console.log("\nExporting project", chalk.gray(`(${project.build})`));
  console.log(chalk.gray(path));

  utils.rmdir(path);
  utils.mkdir(path);

  console.log("\nBuilding pages");
  await _build.pages(project, path);

  console.log("\nGenerating component script");
  await _build.script(project, path);

  console.log("\nCopying static assets");
  await _build.assets(project, path);

  const stats = await utils.stats(path);
  console.log(chalk.green("\nBuild completed"));
  console.log(path);
  console.log(chalk.gray(`${stats.files} files, ${prettyBytes(stats.bytes)}`));
};

export const serve = server.serve;
