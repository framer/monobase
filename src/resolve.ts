import * as fs from "fs";
import * as path from "path";
import * as types from "./types";
import * as utils from "./utils";
import trim from "lodash/trim";

export const fileExistsWithExtensions = (
  root: string,
  filePath: string,
  extensions: string[]
) => {
  for (let ext of extensions) {
    const fileName = `${filePath}.${ext}`;
    const fullPath = path.join(root, fileName);
    if (fs.existsSync(fullPath)) {
      return fileName;
    }
  }
};

/**
 * Looks up a page path for a project.
 */
export const pageForURL = (project: types.Project, url: string) => {
  // Strip out the urlPrefix
  if (url.indexOf(project.config.urlPrefix) === 0) {
    url = url.substr(project.config.urlPrefix.length);
  }

  // Strip last slash
  url = trim(url, "/");

  // Never render the 404 and 500 pages directly
  if (url === "404" || url === "500") {
    return;
  }

  const pagesPath = path.join(project.path, project.config.pages);
  const extensions = project.config.extensions;

  // If we have a specific file extension, there is little point in checking others
  const ext = trim(path.extname(url), ".");

  if (ext) {
    if (extensions.indexOf(ext) !== -1) {
      return url;
    }
    return;
  }

  // Always first try to resolve an explicit directory eg: /about -> /about/index.ts
  const indexPagePath = fileExistsWithExtensions(
    pagesPath,
    `${url}/index`,
    extensions
  );
  if (indexPagePath) return trim(indexPagePath, "/");

  // If that doesn't work directly resolve: /about -> /about.tsx
  const pagePath = fileExistsWithExtensions(pagesPath, url, extensions);
  if (pagePath) return trim(pagePath, "/");
};

export const urlForPage = (project: types.Project, page: string) => {
  // pages/index -> /
  // pages/about -> /about/

  let pagePath = utils.replaceBegin(trim(page, "/"), project.config.pages);
  pagePath = utils.removeExtension(pagePath);
  pagePath = `${project.config.urlPrefix}/${trim(pagePath, "/")}/`;
  pagePath = pagePath.replace("index/", "");

  return pagePath;
};

export const pathForPage = (project: types.Project, page: string) => {
  const pageUrl = urlForPage(project, page);

  if (pageUrl === "/404/") return "/404.html";
  if (pageUrl === "/500/") return "/500.html";

  return path.join(pageUrl, "index.html");
};
