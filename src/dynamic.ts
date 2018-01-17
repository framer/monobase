import * as path from "path";
import * as fs from "fs";
import * as utils from "./utils";
import * as types from "./types";

import { isDynamicComponent } from "./client";

const getClientScriptImportPath = () => {
  const clientScriptImportPathTS = path.join(__dirname, "client.ts");
  const clientScriptImportPathJS = path.join(__dirname, "client.js");

  if (fs.existsSync(clientScriptImportPathTS)) {
    return clientScriptImportPathTS;
  }

  if (fs.existsSync(clientScriptImportPathJS)) {
    return clientScriptImportPathJS;
  }
};

export const discover = (dir: string) => {
  const results = {};
  const paths = utils.glob(`${dir}/**/*.ts{,x}`);

  for (let modulePath of paths) {
    try {
      const module = require(modulePath);
    } catch (error) {
      continue;
    }

    for (let key of Object.keys(module)) {
      if (isDynamicComponent(module[key])) {
        if (!results[modulePath]) {
          results[modulePath] = [];
        }
        results[modulePath].push(module[key]);
      }
    }
  }

  return results;
};

let clientScriptImportPath;

export const entries = (project: types.Project) => {
  if (!clientScriptImportPath) {
    clientScriptImportPath = getClientScriptImportPath();
  }

  if (!clientScriptImportPath) {
    throw Error(
      "Could not locate client script (client.ts or client.js in monobase"
    );
  }

  return [
    ...Object.keys(
      discover(path.join(project.path, project.config.components))
    ),
    clientScriptImportPath
  ];
};
