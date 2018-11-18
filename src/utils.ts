import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import * as countFiles from "count-files";
import * as _glob from "glob";
import * as prettyBytes from "pretty-bytes";
import * as mkdirp from "mkdirp";
import { ncp } from "ncp";

export const mkdir = path => {
  mkdirp.sync(path);
  // try {
  //   fs.mkdirSync(path);
  // } catch (err) {
  //   if (err.code !== "EEXIST") throw err;
  // }
};

export const cp = (source: string, dest: string) => {
  return new Promise((resolve, reject) => {
    ncp(source, dest, function(err) {
      if (err) reject(err);
      resolve();
    });
  });
};

export const rmdir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    return;
  }

  const list = fs.readdirSync(dir);
  for (let i = 0; i < list.length; i++) {
    const filename = path.join(dir, list[i]);
    const stat = fs.statSync(filename);
    if (filename == "." || filename == "..") {
    } else if (stat.isDirectory()) {
      rmdir(filename);
    } else {
      fs.unlinkSync(filename);
    }
  }
  fs.rmdirSync(dir);
};

type PathStats = { files: number; dirs: number; bytes: number };

export const stats = (path: string) => {
  return new Promise<PathStats>((resolve, reject) => {
    countFiles(path, function(err, results) {
      resolve(results);
    });
  });
};

export const glob = (pattern: string) => {
  return _glob.sync(pattern);
};

export const replaceExtension = (dir, ext) => {
  return path.join(
    path.dirname(dir),
    path.basename(dir, path.extname(dir)) + ext
  );
};

export const hash = (str: string) => {
  var result = 0,
    i,
    chr;
  if (str.length === 0) return result;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    result = (result << 5) - result + chr;
    result |= 0; // Convert to 32bit integer
  }
  return result;
};

export const fileSize = (path: string) => {
  return prettyBytes(fs.statSync(path).size);
};

export const projectPathForPage = (pagePath: string) => {
  const pageName = path.basename(pagePath, path.extname(pagePath));
  const pagePrefix = path.dirname(pagePath);
  const pageNamePath = path.join(pagePrefix, pageName);

  if (pageNamePath === "404") return "404.html";
  if (pageNamePath === "500") return "500.html";
  if (pageName === "index") return `${pageNamePath}.html`;

  return `${pageNamePath}/index.html`;
};

const tryResolve = (path: string) => {
  try {
    return require.resolve(path);
  } catch (error) {}
};

export const projectPageForPath = (url: string) => {
  // Strip last slash
  url = _.trim(url, "/");

  // Never render the 404 and 500 pages directly
  if (url === "404" || url === "500") {
    return;
  }

  // If we have a specific file extension, keep the path as is
  if (path.extname(url)) {
    return;
  }

  // Always first try to resolve an explicit directory eg: /about -> /about/index.ts
  if (tryResolve(`${url}/index`)) {
    return `${url}/index`;
  }

  // If this is not an index url, try to resolve to path eg: /about -> /about.ts
  if (!_.endsWith(url, "index") && tryResolve(`${url}`)) {
    return `${url}`;
  }
};

export const projectURLForPath = (url: string) => {
  // pages/index -> /
  // pages/about -> /about/

  const parts = url.split("/");
  parts.shift(); // Get rid of the pages part

  url = `/${parts.join("/")}/`;
  url = url.replace("index/", "");

  return url;
};

export const removeExtension = (filePath: string) => {
  return path.basename(filePath, path.extname(filePath));
};
