import * as path from "path";
import * as fs from "fs";
import * as utils from "./utils";
import * as types from "./types";

export const isDynamicComponent = Component => {
  return (
    typeof Component !== "undefined" &&
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

  // console.log(require("linaria/react").styled.div);

  for (let modulePath of paths) {
    // Ignore files that have an obvious test pattern
    if (modulePath.includes(".test.")) continue;

    let importedModule;

    // We need to special case linaria imports
    const unpatch = patchLinaria();

    try {
      importedModule = require(modulePath);
    } catch (error) {
      console.error(
        `Could not import module for Dynamic() discovery:\n${modulePath}\n> ${error.message}`
      );
      continue;
    }

    unpatch();

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

const patchLinaria = function() {
  // Linaria replaces the `styled` tag with babel on compilation time and
  // throws an error if you call it on runtime. This "fixes" that.
  const linaria = require("linaria/react");
  if (!linaria) return;
  const { css, styled } = linaria;
  // linaria.css = function() {};
  linaria.styled = new Proxy(
    {},
    {
      get(target, name) {
        return function() {};
      }
    }
  );

  return function unpatchLinaria() {
    // linaria.css = css;
    linaria.styled = styled;
  };
};
