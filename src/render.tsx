import * as path from "path";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Compiler } from "./compiler";
import * as types from "./types";
import * as dynamic from "./dynamic";
import * as context from "./context";
import { memoize } from "lodash";
import React from "react";
import { PageContext, PageContextType } from "./contexts";

// We memoize the script compiler based on the config for fast reloads
// as long as the dynamic components have not changed on disk.

const getCachedCompiler = memoize(({ name, projectPath, config }) => {
  return new Compiler(projectPath, config);
}, JSON.stringify);

export const page = async (project: types.Project, page: string) => {
  const pagePath = path.join(project.config.pages, page);
  const compiler = getCachedCompiler({
    name: "page",
    projectPath: project.path,
    config: {
      cache: true,
      externals: true
    }
  });

  // A syntax error could occur here
  await compiler.compile([pagePath], context.create(project, pagePath));

  const compilerModule = compiler.module;

  // Temporary write the generated javascript for this page for debug purposes
  // const pageScriptPath = path.join(project.path, "build", page + ".js");
  // fs.writeFileSync(pageScriptPath, compiler._output);

  if (!compilerModule["default"]) {
    throw Error(
      `Missing default export for page ${page}. Did you maybe forget to add "export default"`
    );
  }

  const pageContext: PageContextType = {
    project,
    path: pagePath,
    styles: compiler.styles
  };

  const PageModule = compilerModule["default"];

  const Page = function() {
    return (
      <PageContext.Provider value={pageContext}>
        <PageModule />
      </PageContext.Provider>
    );
  };

  const html = renderToString(React.createElement(Page));

  // Clean up the generated javascript file
  // fs.unlinkSync(pageScriptPath);

  return html;
};

export const script = async (project: types.Project) => {
  const entries = dynamic.entries(project);

  const compiler = getCachedCompiler({
    name: "script",
    projectPath: project.path,
    config: {
      production: project.build === "production",
      cache: true,
      externals: false
    }
  });

  return compiler.compile(entries, {});
};
