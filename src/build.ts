import * as path from "path";
import * as fs from "fs";
import * as prettyBytes from "pretty-bytes";
import * as unmarkdown from "remove-markdown";
import chalk from "chalk";

import * as utils from "./utils";
import * as render from "./render";
import * as types from "./types";

export const pages = async (project: types.Project, root) => {
  const pagesPath = path.join(project.path, project.config.pages);
  const pages = utils.glob(`${pagesPath}/**/*.ts{,x}`);

  for (let pagePath of pages) {
    const relativePagePath = path.relative(pagesPath, pagePath);
    try {
      page(project, relativePagePath, root);
    } catch (error) {
      console.error(
        `${chalk.red("\nerror")} /${relativePagePath}\n\n${unmarkdown(
          error.message
        )}\n\n`
      );
      console.error(chalk.grey(error.stack));
      process.exit();
    }
  }
};

const page = (project: types.Project, dir, root) => {
  const time = Date.now();
  const pageRelativePath = utils.replaceExtension(dir, ".html");
  const pagePath = path.join(root, pageRelativePath);

  utils.mkdir(path.dirname(pagePath));

  fs.writeFileSync(pagePath, render.page(project, dir, true));

  console.log(
    chalk.gray(`/${pageRelativePath}`),
    chalk.gray(utils.fileSize(pagePath)),
    chalk.gray(`(${Math.round(Date.now() - time)}ms)`)
  );
};

export const assets = async (project: types.Project, root) => {
  const time = Date.now();
  const source = path.join(project.path, project.config.static);
  const dest = path.join(root, project.config.static);
  await utils.cp(source, dest);
  const stats = await utils.stats(dest);
  console.log(
    chalk.gray(`${stats.files} files, ${prettyBytes(stats.bytes)}`),
    chalk.gray(`(${Math.round(Date.now() - time)}ms)`)
  );
};

export const script = async (project: types.Project, root) => {
  const time = Date.now();
  const script = await render.script(project);
  const scriptPath = path.join(root, project.config.componentScript);
  fs.writeFileSync(scriptPath, script);
  console.log(
    chalk.gray(`${project.config.componentScript}`),
    chalk.gray(utils.fileSize(scriptPath)),
    chalk.gray(`(${Math.round(Date.now() - time)}ms)`)
  );
};
