import * as path from "path";
import * as fs from "fs";
import { renderToString } from "react-dom/server";
import { Compiler, Config } from "./compiler";
import * as types from "./types";
import * as dynamic from "./dynamic";
import * as context from "./context";
import { memoize } from "lodash";

// We memoize the script compiler based on the config for fast reloads
// as long as the dynamic components have not changed on disk.

const getCachedCompiler = memoize(config => {
  return new Compiler(config);
}, JSON.stringify);

export const page = async (
  project: types.Project,
  page: string,
  cache = false
) => {
  const pagePath = path.join(project.config.pages, page);

  const config = Config(project.path, [pagePath], {
    context: context.create(project, pagePath),
    cache: true,
    externals: true
  });

  const compiler = new Compiler(config as any);

  // A syntax error could occur here
  await compiler.compile();

  // Temporary write the generated javascript for this page for debug purposes
  // const pageScriptPath = path.join(project.path, "build", page + ".js");
  // fs.writeFileSync(pageScriptPath, compiler._output);

  if (!compiler.module["default"]) {
    throw Error(
      `Missing default export for page ${page}. Did you maybe forget to add "export default"`
    );
  }

  // An eval runtime could happen here
  const pageModule = compiler.module["default"](project);
  const html = renderToString(pageModule);

  // Clean up the generated javascript file
  // fs.unlinkSync(pageScriptPath);

  return html;
};

export const script = async (project: types.Project) => {
  const entries = dynamic.entries(project);
  const config = Config(project.path, entries, {
    production: project.build === "production",
    cache: true,
    externals: false
  });

  const compiler = getCachedCompiler(config);
  return compiler.compile();
};
