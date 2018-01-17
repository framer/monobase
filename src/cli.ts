#!/usr/bin/env node

require("ts-node/register");

const tsConfig = require("../tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";
import * as minimist from "minimist";
import * as openport from "first-open-port";
import chalk from "chalk";

import * as browser from "./browser";
import * as project from "./project";
import * as types from "./types";

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const exit = () => {
  process.exit();
};

const usage = () => {
  console.log(`Usage: serve [port] | build [path]`);
  exit();
};

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  const command = _.first(argv._) || "serve";

  const p: types.Project = {
    path: path.resolve(argv.project || process.cwd()),
    context: {},
    config: {
      pages: "pages",
      static: "static",
      components: "components",
      componentScript: "/components.js"
    }
  };

  if (!fs.existsSync(path.join(p.path, p.config.pages))) {
    return console.log(
      `The path "${
        p.path
      }" does not look like a project folder, the pages directory is missing.`
    );
  }

  tsConfigPaths.register({
    baseUrl: p.path,
    paths: {}
  });

  if (command === "serve") {
    let port = argv.port || argv.p || 3000;

    // See if we can actually use the port
    port = await openport(port, port + 100);

    const open = argv.browser || true;
    const url = `https://localhost:${port}`;
    await project.serve(p, port);

    if (open) browser.open(url);

    console.log(chalk.bgWhite.black(" MONOBASE "), chalk.green(url));
  } else if (command === "build") {
    const buildPath = argv.path || argv.p || path.join(p.path, "build");
    project.build(p, buildPath);
  } else {
    usage();
  }
};

main();
