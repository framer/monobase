"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var path = require("path");
var inject = require("connect-inject");
var morgan = require("morgan");
var unmarkdown = require("remove-markdown");
var prettyBytes = require("pretty-bytes");
var chalk_1 = require("chalk");
var server_1 = require("react-dom/server");
var error = require("./error");
exports.reload = inject({
    snippet: "\n    <script src=\"/_socket/socket.io.min.js\"></script>\n    <script>var socket = io(); socket.on(\"reload\", function(msg) { location.reload() });</script>\n    "
});
exports.nocache = function (req, res, next) {
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
};
exports.addslash = function (req, res, next) {
    var extension = path.extname(req.path);
    if (!extension && req.path.substr(-1) !== "/") {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path + "/" + query);
    }
    else {
        next();
    }
};
exports.logging = morgan(function (tokens, req, res) {
    // Filter out all paths starting with /_ like socket.io
    if (_.startsWith(tokens.url(req, res), "/_")) {
        return null;
    }
    var status = tokens.status(req, res);
    if (status !== "200") {
        status = chalk_1.default.red(status);
    }
    return chalk_1.default.gray([
        tokens.method(req, res),
        status,
        chalk_1.default.rgb(170, 170, 170)(tokens.url(req, res)),
        prettyBytes(parseInt(tokens.res(req, res, "content-length") || "0")),
        "(" + Math.round(parseFloat(tokens["response-time"](req, res)) || 0) + "ms)"
    ].join(" "));
});
exports.errors = function (project) {
    return function (err, req, res, next) {
        var shortStack = _.slice(err.stack.split("\n"), 1, 4).join("\n") + "\n    [...]";
        console.error(chalk_1.default.white("Error:"), chalk_1.default.red(unmarkdown(err.message)));
        console.error(chalk_1.default.gray(shortStack));
        res.status("500").send(server_1.renderToString(error.render(err, project)));
    };
};
