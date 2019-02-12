import * as path from "path";
import * as fs from "fs";
import * as utils from "./utils";
import * as types from "./types";

export const isDynamicComponent = Component => {
  return (
    typeof Component["dynamicName"] !== "undefined" &&
    typeof Component["dynamicComponent"] !== "undefined"
  );
};

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
    // Ignore files that have an obvious test pattern
    if (modulePath.includes(".test.")) continue;

    let importedModule;

    try {
      importedModule = require(modulePath);
    } catch (error) {
      console.error(
        `Could not import module for Dynamic() discovery:\n${modulePath}\n> ${
          error.message
        }`
      );
      continue;
    }

    for (let key of Object.keys(importedModule)) {
      if (isDynamicComponent(importedModule[key])) {
        if (!results[modulePath]) {
          results[modulePath] = [];
        }
        results[modulePath].push(importedModule[key]);
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
    throw new Error(
      "Could not locate client script client.ts or client.js in monobase"
    );
  }

  const dynamicComponents = discover(
    path.join(project.path, project.config.components)
  );

  return [...Object.keys(dynamicComponents), clientScriptImportPath];
};
