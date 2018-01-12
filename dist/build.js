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
var path = require("path");
var fs = require("fs");
var prettyBytes = require("pretty-bytes");
var unmarkdown = require("remove-markdown");
var chalk_1 = require("chalk");
var utils = require("./utils");
var render = require("./render");
exports.pages = function (project, root) { return __awaiter(_this, void 0, void 0, function () {
    var pagesPath, pages, _i, pages_1, pagePath, relativePagePath;
    return __generator(this, function (_a) {
        pagesPath = path.join(project.path, project.config.pages);
        pages = utils.glob(pagesPath + "/**/*.ts{,x}");
        for (_i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            pagePath = pages_1[_i];
            relativePagePath = path.relative(pagesPath, pagePath);
            try {
                page(project, relativePagePath, root);
            }
            catch (error) {
                console.error(chalk_1.default.red("\nerror") + " /" + relativePagePath + "\n\n" + unmarkdown(error.message) + "\n\n");
                console.error(chalk_1.default.grey(error.stack));
                process.exit();
            }
        }
        return [2 /*return*/];
    });
}); };
var page = function (project, dir, root) {
    var time = Date.now();
    var pageRelativePath = utils.replaceExtension(dir, ".html");
    var pagePath = path.join(root, pageRelativePath);
    utils.mkdir(path.dirname(pagePath));
    fs.writeFileSync(pagePath, render.page(project, dir, true));
    console.log(chalk_1.default.gray("/" + pageRelativePath), chalk_1.default.gray("(" + Math.round(Date.now() - time) + "ms)"));
};
exports.assets = function (project, root) { return __awaiter(_this, void 0, void 0, function () {
    var time, source, dest, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                time = Date.now();
                source = path.join(project.path, project.config.static);
                dest = path.join(root, project.config.static);
                return [4 /*yield*/, utils.cp(source, dest)];
            case 1:
                _a.sent();
                return [4 /*yield*/, utils.stats(dest)];
            case 2:
                stats = _a.sent();
                console.log(chalk_1.default.gray(stats.files + " files, " + prettyBytes(stats.bytes)), chalk_1.default.gray("(" + Math.round(Date.now() - time) + "ms)"));
                return [2 /*return*/];
        }
    });
}); };
exports.script = function (project, root) { return __awaiter(_this, void 0, void 0, function () {
    var time, script, scriptPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                time = Date.now();
                return [4 /*yield*/, render.script(project)];
            case 1:
                script = _a.sent();
                scriptPath = path.join(root, project.config.componentScript);
                fs.writeFileSync(scriptPath, script);
                console.log(chalk_1.default.gray("" + project.config.componentScript), chalk_1.default.gray("(" + Math.round(Date.now() - time) + "ms)"));
                return [2 /*return*/];
        }
    });
}); };
