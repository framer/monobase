import * as path from "path";
import inject from "connect-inject";
import morgan from "morgan";
import express from "express";
import prettyBytes from "pretty-bytes";
import chalk from "chalk";
import { renderToString } from "react-dom/server";
import * as types from "./types";
import * as error from "./error";
import { suggestions } from "./suggestions";

const reloadScript = `
<script src="/_socket/socket.io.js"></script>
<script>var socket = io(); socket.on("reload", function(msg) { location.reload() });</script>
`;

export const reload = inject({
  snippet: reloadScript
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

export const logging: express.RequestHandler = morgan((tokens, req, res) => {
  // Filter out all paths starting with /_ like socket.io
  if (tokens.url(req, res).startsWith("/_")) {
    return null;
  }

  let status = tokens.status(req, res);

  // Filter out all entries that have no status for some reason
  // Todo: maybe investigate this further
  if (!status) {
    return null;
  }

  if (status.startsWith("4") || status.startsWith("5")) {
    status = chalk.red(status);
  }

  const responseSize = parseInt(tokens.res(req, res, "content-length")) || 0;

  return chalk.gray(
    [
      tokens.method(req, res),
      status,
      chalk.rgb(170, 170, 170)(tokens.url(req, res)),
      prettyBytes(responseSize),
      `(${Math.round(parseFloat(tokens["response-time"](req, res)) || 0)}ms)`,
      status === "304" ? "(cached)" : ""
    ].join(" ")
  );
});

export const errors = (project: types.Project) => {
  return (err: Error, req, res: express.Response, next) => {
    const shortStack = err.stack
      ? err.stack
          .split("\n")
          .slice(1, 4)
          .join("\n") + "\n    [...]"
      : `${err}`;

    console.error(chalk.white("Error:"), chalk.red(`${err.message}`));
    console.error(chalk.gray(shortStack));

    const title =
      err.message.split("\n").length > 1
        ? err.message.split("\n")[0]
        : err.message;

    const body = err.stack
      .replace("Error: ", "")
      .replace(title, "")
      .trim();

    // Try to render a nice error page, which might fail if we're for example missing a dependency to actually render the page.
    try {
      res
        .status(500)
        .send(renderToString(error.render(err.message, shortStack, project)));
    } catch (error) {
      res.status(500).send(errorTemplate(title, body, suggestions(err)));
    }
  };
};

function errorTemplate(title, body, suggestions) {
  return `
 <html>
  <body>
    <h3>${title}</h3>
    <p>${suggestions}</p>
    <pre style="white-space:pre-wrap">${body}</pre>
    ${reloadScript}
  </body>
</html>
 `;
}
