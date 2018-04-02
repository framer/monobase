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

export const page = (project: types.Project, page: string) => {
  if (!page) {
    return;
  }

  let pageModule, pageModuleError;

  try {
    pageModule = require(page);
  } catch (error) {
    pageModuleError = error;
  }

  // If we could not import a page, let's find out what happened
  if (!pageModule) {
    // If there was no page named like it, throw a 404 not found.
    if (utils.glob(`${page}.ts{,x}`).length === 0) {
      return null;
    }

    // If there is a page at that path, some other error occured.
    const error = Error();
    error.message = `The page module at \`${page}\` exists, but cannot be imported: \n\n`;
    error.message += pageModuleError.message;
    error.stack = pageModuleError.stack;
    throw error;
  }

  // If we have a page module, see if it has a default error exposed
  if (typeof pageModule.default !== "function") {
    throw Error(
      `The page module at ${page} does not have a [default export](https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript). You can add one by adding \`export default render;\`.`
    );
  }

  const context = {
    page: page
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
