import * as _ from "lodash";
import * as https from "https";
import * as express from "express";
import * as socketio from "socket.io";
// import * as watch from "glob-watcher";
import * as gaze from "gaze";
import * as fs from "fs";
import * as path from "path";
import * as project from "./project";
import * as types from "./types";
import * as render from "./render";
import * as middleware from "./middleware";
import * as utils from "./utils";
import * as invalidate from "invalidate-module";

const modulePath = (url: string) => {
  if (_.endsWith(url, "/")) {
    return `${url}/index`;
  }

  if (_.endsWith(url, ".html")) {
    return utils.replaceExtension(url, "");
  }
};

export const serve = async (project: types.Project, port = 3000) => {
  const app = express();
  const ssl = path.join(__dirname, "..", "extras", "ssl");
  const options = {
    key: fs.readFileSync(path.join(ssl, "key.pem")),
    cert: fs.readFileSync(path.join(ssl, "cert.pem"))
  };
  const server = https.createServer(options, app);
  const io = socketio(server);

  app.use(middleware.addslash);
  app.use(middleware.nocache);
  app.use(middleware.reload);
  app.use(middleware.logging);
  app.use("/_socket", express.static("node_modules/socket.io-client/dist"));
  app.use(
    "/static",
    express.static(path.join(project.path, project.config.static))
  );

  app.get(project.config.componentScript, async (req, res) => {
    res.send(await render.script(project));
  });

  app.get("*", (req, res) => {
    let pageModulePath = modulePath(req.url);

    if (!pageModulePath) {
      return res.status(404).send(render.page(project, "404"));
    }

    const page = render.page(project, pageModulePath);

    if (!page) {
      return res.status(404).send(render.page(project, "404"));
    }

    res.send(page);
  });

  // Error handler need to be on the bottom
  app.use(middleware.errors(project));

  server.listen(port, () => Promise.resolve());

  const withExts = (path: string, extensions: string[]) => {
    return extensions.map(ext => `${path}${ext}`);
  };

  const scriptExts = [".ts", ".tsx", ".js"];
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
      // Invalidate the changed module from the cache
      invalidate(require.resolve(filepath));

      // Reload the page in the browser
      io.emit("reload");
    });
  });
};
