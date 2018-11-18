import * as _ from "lodash";
import { renderToString } from "react-dom/server";
import * as types from "./types";
import * as dynamic from "./dynamic";
import { Compiler, Config } from "./compiler";

export const page = async (project: types.Project, pagePath: string) => {
  const compiler = new Compiler(
    Config(project.path, [pagePath], { cache: true })
  );
  await compiler.compile();
  const pageModule = compiler.module.default(project);

  return new Promise((resolve, reject) => {
    resolve(renderToString(pageModule));
  });
};

// We memoize the script compiler based on the config for fast reloads
// as long as the dynamic components have not changed on disk.
const scriptCompiler = _.memoize(config => {
  return new Compiler(config);
}, JSON.stringify);

export const script = async (project: types.Project) => {
  const config = Config(project.path, dynamic.entries(project), {
    cache: true,
    production: project.build === "production"
  });

  const compiler = scriptCompiler(config);
  return compiler.compile();
};
