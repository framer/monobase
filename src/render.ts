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

export const page = (project: types.Project, page: string) => {
  for (let path in require.cache) {
    if (path.indexOf(project.path) !== -1) {
      delete require.cache[path];
    }
  }

  const projectPageImportPath = path.join(
    project.path,
    project.config.pages,
    page
  );

  let pageModule;

  try {
    pageModule = require(projectPageImportPath);
  } catch (error) {
    return null;
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
