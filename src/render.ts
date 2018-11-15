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
import * as dynamic from "./dynamic";

export const page = async (project: types.Project, pagePath: string) => {
  const cmp = compiler.setup(project, [pagePath]);
  await cmp.compile();
  const pageModule = cmp.module.default(project);

  return new Promise((resolve, reject) => {
    resolve(renderToString(pageModule));
  });
};

export const script = async (project: types.Project) => {
  const cmp = compiler.setup(project, dynamic.entries(project));
  return cmp.compile();
};
