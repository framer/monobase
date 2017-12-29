import * as _ from "lodash";
import * as http from "http";
import * as express from "express";
import * as socketio from "socket.io";
import * as watch from "glob-watcher";
import * as path from "path";
import * as project from "./project";
import * as types from "./types";
import * as render from "./render";
import * as middleware from "./middleware";
import * as utils from "./utils";

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
  const server = new http.Server(app);
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

  server.listen(port, () => Promise.resolve());

  watch(
    [
      `${project.path}/${project.config.pages}/**/*.(js|ts|tsx)`,
      `${project.path}/${project.config.components}/**/*.(js|ts|tsx)`,
      `${project.path}/${project.config.static}/**/*.(js|css)`
    ],
    done => {
      io.emit("reload");
      done();
    }
  );
};
