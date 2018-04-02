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

export const page = (project: types.Project, pagePath: string) => {
  let pageModule;

  try {
    pageModule = require(pagePath);
  } catch (moduleError) {
    const error = Error();
    error.message = `The page module at \`${pagePath}\` exists, but cannot be imported: \n\n`;
    error.message += moduleError.message;
    error.stack = moduleError.stack;
    throw error;
  }

  // If we have a page module, see if it has a default error exposed
  if (typeof pageModule.default !== "function") {
    throw Error(
      `The page module at ${pagePath} does not have a [default export](https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript). You can add one by adding \`export default render;\`.`
    );
  }

  const context = {
    page: pagePath
  };

  try {
    return renderToString(pageModule.default(project, context));
  } catch (error) {
    if (error.message == "window is not defined") {
      error.message =
        "window is not defined. You are using the `window` object in a page render, which is not available in Node, only in the browser. Make sure your render function does not reference `window`. Other methods _can_ use `window`.";
    }
    throw error;
  }
};

let cmp;

export const script = async (project: types.Project) => {
  // Use a cached compiler for speed
  if (!cmp) cmp = compiler.setup(project, dynamic.entries(project));

  // Discover all the dynamic entries and add them
  // We don't have to remove the changed modules from the cache here,
  // as the page load should already have taken care of that
  cmp.options.entry = dynamic.entries(project);

  return new Promise((resolve, reject) => {
    cmp.run((err, stats: webpack.Stats) => {
      if (err) {
        console.error("ERROR:", err);
      }
      if (stats.hasErrors()) {
        console.error(stats.toString({ chunks: false, colors: true }));
      } else {
        resolve(cmp.outputFileSystem.data["bundle.js"].toString());
      }
    });
  });
};
