import * as _ from "lodash";
import * as path from "path";
import * as inject from "connect-inject";
import * as morgan from "morgan";
import * as express from "express";
import * as types from "./types";
import chalk from "chalk";
import { token } from "morgan";
import { renderToString } from "react-dom/server";
import * as error from "./error";

export const reload = inject({
  snippet: `
    <script src="/_socket/socket.io.min.js"></script>
    <script>var socket = io(); socket.on("reload", function(msg) { location.reload() });</script>
    `
});

export const nocache = (req, res, next) => {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  next();
};

export const addslash = (req, res, next) => {
  const extension = path.extname(req.path);

  if (!extension && req.path.substr(-1) !== "/") {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path + "/" + query);
  } else {
    next();
  }
};

export const logging = morgan((tokens, req, res) => {
  // Filter out all paths starting with /_ like socket.io
  if (_.startsWith(tokens.url(req, res), "/_")) {
    return null;
  }

  let status = tokens.status(req, res);

  if (status !== "200") {
    status = chalk.red(status);
  }

  return chalk.gray(
    [
      tokens.method(req, res),
      status,
      tokens.url(req, res),
      tokens.res(req, res, "content-length"),
      `(${Math.round(parseFloat(tokens["response-time"](req, res)) || 0)}ms)`
    ].join(" ")
  );
});

export const errors = (project: types.Project) => {
  return (err: Error, req, res, next) => {
    const shortStack =
      _.slice(err.stack.split("\n"), 1, 4).join("\n") + "\n    [...]";

    console.error(chalk.white("Error:"), chalk.red(err.message));
    console.error(chalk.gray(shortStack));

    res.status("500").send(renderToString(error.render(err, project)));
  };
};
