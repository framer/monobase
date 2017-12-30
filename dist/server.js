"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var https = require("https");
var express = require("express");
var socketio = require("socket.io");
var watch = require("glob-watcher");
var fs = require("fs");
var path = require("path");
var render = require("./render");
var middleware = require("./middleware");
var utils = require("./utils");
var modulePath = function (url) {
    if (_.endsWith(url, "/")) {
        return url + "/index";
    }
    if (_.endsWith(url, ".html")) {
        return utils.replaceExtension(url, "");
    }
};
exports.serve = function (project, port) {
    if (port === void 0) { port = 3000; }
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var app, ssl, options, server, io;
        return __generator(this, function (_a) {
            app = express();
            ssl = path.join(__dirname, "..", "extras", "ssl");
            options = {
                key: fs.readFileSync(path.join(ssl, "key.pem")),
                cert: fs.readFileSync(path.join(ssl, "cert.pem"))
            };
            server = https.createServer(options, app);
            io = socketio(server);
            app.use(middleware.addslash);
            app.use(middleware.nocache);
            app.use(middleware.reload);
            app.use(middleware.logging);
            app.use("/_socket", express.static("node_modules/socket.io-client/dist"));
            app.use("/static", express.static(path.join(project.path, project.config.static)));
            app.get(project.config.componentScript, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = res).send;
                            return [4 /*yield*/, render.script(project)];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); });
            app.get("*", function (req, res) {
                var pageModulePath = modulePath(req.url);
                if (!pageModulePath) {
                    return res.status(404).send(render.page(project, "404"));
                }
                var page = render.page(project, pageModulePath);
                if (!page) {
                    return res.status(404).send(render.page(project, "404"));
                }
                res.send(page);
            });
            server.listen(port, function () { return Promise.resolve(); });
            watch([
                project.path + "/" + project.config.pages + "/**/*.(js|ts|tsx)",
                project.path + "/" + project.config.components + "/**/*.(js|ts|tsx)",
                project.path + "/" + project.config.static + "/**/*.(js|css)"
            ], function (done) {
                io.emit("reload");
                done();
            });
            return [2 /*return*/];
        });
    });
};
