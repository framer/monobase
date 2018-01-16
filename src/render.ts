import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { renderToString } from "react-dom/server";
import * as webpack from "webpack";
import * as prettyBytes from "pretty-bytes";
import * as utils from "./utils";
import * as types from "./types";
import * as compiler from "./compiler";

export const page = (project: types.Project, page: string, cache = false) => {
  if (cache === false) {
    // Make sure we clear all the cache for this project
    for (let path in require.cache) {
      if (path.indexOf(project.path) !== -1) {
        delete require.cache[path];
      }
    }
  }

  const projectPagesPath = path.join(project.path, project.config.pages);
  const projectPageImportPath = path.join(projectPagesPath, page);

  console.log(projectPageImportPath);

  let pageModule, pageModuleError;

  try {
    pageModule = require(projectPageImportPath);
  } catch (error) {
    pageModuleError = error;
  }

  // If we could not import a page, let's find out what happened
  if (!pageModule) {
    // If there was no page named like it, throw a 404 not found.
    if (utils.glob(`${projectPageImportPath}.ts{,x}`).length === 0) {
      return null;
    }

    // If there is a page at that path, some other error occured.
    const error = Error();
    error.message = `The page module at \`${projectPageImportPath}\` exists, but cannot be imported: \n\n`;
    error.message += pageModuleError.message;
    error.stack = pageModuleError.stack;
    throw error;
  }

  // If we have a page module, see if it has a default error exposed
  if (typeof pageModule.default !== "function") {
    throw Error(
      `The page module at ${projectPageImportPath} does not have a [default export](https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript). You can add one by adding \`export default render;\`.`
    );
  }

  return renderToString(pageModule.default(project));
};

let cmp;

export const script = async (project: types.Project) => {
  if (!cmp) cmp = compiler.getCompiler(project);

  return new Promise((resolve, reject) => {
    cmp.run((err, stats: webpack.Stats) => {
      if (err) {
        console.error("ERROR:", err);
      }
      if (stats.hasErrors()) {
        const { errors, warnings } = stats["compilation"];
        console.error(errors.map(e => e.message).join("\n"));
      } else {
        resolve(cmp.outputFileSystem.data["bundle.js"].toString());
      }
    });
  });
};
