#!/usr/bin/env node
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
require("ts-node/register");
var _ = require("lodash");
var path = require("path");
var minimist = require("minimist");
var openport = require("first-open-port");
var chalk_1 = require("chalk");
var browser = require("./browser");
var project = require("./project");
process.on("unhandledRejection", function (reason, p) {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
var exit = function () {
    process.exit();
};
var usage = function () {
    console.log("Usage: serve [port] | build [path]");
    exit();
};
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var argv, command, p, port, open, url, buildPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                argv = minimist(process.argv.slice(2));
                command = _.first(argv._) || "serve";
                p = {
                    path: path.resolve(argv.project || process.cwd()),
                    context: {},
                    config: {
                        pages: "pages",
                        static: "static",
                        components: "components",
                        componentScript: "/components.js"
                    }
                };
                if (!(command === "serve")) return [3 /*break*/, 3];
                port = argv.port || argv.p || 3000;
                return [4 /*yield*/, openport(port, port + 100)];
            case 1:
                // See if we can actually use the port
                port = _a.sent();
                open = argv.browser || true;
                url = "https://localhost:" + port;
                return [4 /*yield*/, project.serve(p, port)];
            case 2:
                _a.sent();
                if (open)
                    browser.open(url);
                console.log(chalk_1.default.green("Serving on " + url));
                return [3 /*break*/, 4];
            case 3:
                if (command === "build") {
                    buildPath = argv.path || argv.p || path.join(p.path, "build");
                    project.build(p, buildPath);
                }
                else {
                    usage();
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
main();
