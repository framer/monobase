import * as path from "path";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Compiler } from "./compiler";
import * as types from "./types";
import * as dynamic from "./dynamic";
import * as context from "./context";
import { memoize } from "lodash";
import React from "react";
import { PageContext, PageContextType } from "./contexts";
import { writeFileSync } from "fs";

// We memoize the script compiler based on the config for fast reloads
// as long as the dynamic components have not changed on disk.

const getCachedCompiler = memoize(({ name, projectPath, config }) => {
  return new Compiler(projectPath, config);
}, JSON.stringify);

export const page = async (
  project: types.Project,
  page: string,
  compilerCacheKey?: string
) => {
  const pagePath = path.join(project.config.pages, page);
  const cacheKey = compilerCacheKey || `page/${page}`;
  const compiler = getCachedCompiler({
    name: compilerCacheKey,
    projectPath: project.path,
    config: {
      cache: true,
      externals: true,
    },
  });

  // A syntax error could occur here
  await compiler.compile([pagePath], context.create(project, pagePath));

  let PageModule;
  const compilerModule = compiler.module;
  const pageModuleKeys = Object.keys(compilerModule);

  // Always try to use the default export
  if (compilerModule["default"]) {
    PageModule = compilerModule["default"];
  }

  // If there is no default export, use the first exported function
  if (!PageModule && pageModuleKeys.length > 0) {
    if (pageModuleKeys.length > 1) {
      console.warn(
        `We found multiple render functions in page ${page}: ${pageModuleKeys}. We are selecting the first one: ${pageModuleKeys[0]}`
      );
    }
    PageModule = compilerModule[pageModuleKeys[0]];
  }

  // If we still don't have a render function here, we can't really render
  if (!PageModule) {
    throw Error(
      `Missing render function for page ${page}. Did you maybe forget to export it?`
    );
  }

  const pageContext: PageContextType = {
    project,
    path: pagePath,
    styles: compiler.styles,
  };

  const Page = function () {
    return (
      <PageContext.Provider value={pageContext}>
        <PageModule />
      </PageContext.Provider>
    );
  };

  return renderToString(React.createElement(Page));
};

export const script = async (project: types.Project) => {
  const entries = dynamic.entries(project);

  const compiler = getCachedCompiler({
    name: "script",
    projectPath: project.path,
    config: {
      production: project.build === "production",
      cache: true,
      externals: false,
    },
  });

  return compiler.compile(entries, {});
};
