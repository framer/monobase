import * as webpack from "webpack";
import chalk from "chalk";

import * as fs from "fs";
import * as path from "path";
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

export const check = (project: types.Project) => {
  if (!fs.existsSync(path.join(project.path, project.config.pages))) {
    return console.log(
      `The path "${
        project.path
      }" does not look like a project folder, the pages directory is missing.`
    );
  }
};

export const serve = server.serve;
