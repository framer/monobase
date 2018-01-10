import * as fs from "fs";
import * as path from "path";
import * as countFiles from "count-files";
import * as _glob from "glob";
import { ncp } from "ncp";

export const mkdir = path => {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
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
  return _glob(pattern);
};

export const replaceExtension = (dir, ext) => {
  return path.join(
    path.dirname(dir),
    path.basename(dir, path.extname(dir)) + ext
  );
};
