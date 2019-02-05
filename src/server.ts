import * as _ from "lodash";
import * as https from "https";
import * as express from "express";
import * as socketio from "socket.io";
import * as gaze from "gaze";
import * as path from "path";
import * as types from "./types";
import * as render from "./render";
import * as middleware from "./middleware";
import * as resolve from "./resolve";
import * as invalidate from "invalidate-module";
import * as favicon from "serve-favicon";

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
  app.use(middleware.nocache);
  app.use(middleware.reload);
  app.use(middleware.logging);
  app.use("/_socket", express.static("node_modules/socket.io-client/dist"));

  const staticPath = path.join(project.path, project.config.static);
  app.use("/static", express.static(staticPath));
  app.use(favicon(path.join(staticPath, "favicon.ico")));

  app.get(project.config.componentScript, async (req, res) => {
    res.send(await render.script(project));
  });

  // Default page handler
  app.get("*", async (req, res) => {
    const page = resolve.pageForURL(project, req.url);

    if (!page) {
      const page404 = await render.page(project, "404");
      return res.status(404).send(page404);
    }

    res.send(await render.page(project, page));
  });

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

  gaze(globs, function(err, watcher) {
    this.on("all", function(event, filepath) {
      // Try to invalidate the changed module from the cache
      try {
        invalidate(require.resolve(filepath));
      } catch (error) {}

      // Reload the page in the browser
      io.emit("reload");
    });
  });
};
