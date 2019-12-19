import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import express from "express";
import socketio from "socket.io";
import gaze from "gaze";
import invalidate from "invalidate-module";
import favicon from "serve-favicon";
import { NextFunction } from "connect";
import * as types from "./types";
import * as render from "./render";
import * as middleware from "./middleware";
import * as resolve from "./resolve";

import { debounce } from "./utils";

function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<any>
): express.RequestHandler {
  return (...args) => fn(...args).catch(args[args.length - 1] as NextFunction);
}

export const serve = async (
  project: types.Project,
  cert: { cert: string; key: string },
  port = 3000
) => {
  const app = express();
  const options = { ...cert };
  const server = https.createServer(options, app);
  const io = socketio(server);

  app.use(middleware.addslash);
  // app.use(middleware.nocache);
  app.use(middleware.reload);
  app.use(middleware.logging);
  app.use("/_socket", express.static("node_modules/socket.io-client/dist"));

  const { urlPrefix, componentScript } = project.config;
  const staticPath = path.join(project.path, project.config.static);
  app.use(`${project.config.urlPrefix}/static`, express.static(staticPath));

  const favicoPath = path.join(staticPath, "favicon.ico");
  if (fs.existsSync(favicoPath)) {
    app.use(favicon(favicoPath));
  }

  app.get(
    `${urlPrefix}${componentScript}`,
    asyncHandler(async (_, res) => {
      res.send(await render.script(project));
    })
  );

  if (urlPrefix) {
    app.get("/", (_, res) => res.redirect(urlPrefix));
  }

  // Default page handler
  app.get(
    "*",
    asyncHandler(async (req, res) => {
      const path = req.path;
      const page = resolve.pageForURL(project, path);

      if (!page) {
        return res.status(404).send(await render.page(project, "404"));
      } else {
        return res.send(await render.page(project, page));
      }
    })
  );

  // Error handler needs to be on the bottom
  app.use(middleware.errors(project));

  server.listen(port, () => Promise.resolve());

  const withExts = (path: string, extensions: string[]) => {
    return extensions.map(ext => `${path}${ext}`);
  };

  const scriptExts = [".ts", ".tsx", ".js", ".mdx"];
  const staticExts = [".css", ".js", ".gif", ".png", ".jpg", ".webp"];

  const globs = [
    ...withExts(`${project.path}/${project.config.pages}/**/*`, scriptExts),
    ...withExts(
      `${project.path}/${project.config.components}/**/*`,
      scriptExts
    ),
    ...withExts(`${project.path}/${project.config.static}/**/*`, staticExts)
  ];

  // Give the file watcher a little debounce so it does not reload more then needed.
  const reload = debounce(() => {
    io.emit("reload");
  }, 50);

  gaze(globs, function(err, watcher) {
    this.on("all", function(event, filepath) {
      // We are going to assume node_module files are static
      if (filepath.includes("node_modules")) {
        return;
      }

      // Try to invalidate the changed module from the cache
      try {
        invalidate(require.resolve(filepath));
      } catch (error) {
        console.warn("inavlidate error:", error);
      }

      // Reload the page in the browser
      reload();
    });
  });
};
