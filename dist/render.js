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
var server_1 = require("react-dom/server");
var utils = require("./utils");
var compiler = require("./compiler");
var dynamic = require("./dynamic");
exports.page = function (project, page, cache) {
    if (cache === void 0) { cache = false; }
    var pagesPath = path.join(project.path, project.config.pages);
    var pageImportPath = path.join(pagesPath, page);
    var componentsPath = path.join(project.path, project.config.components);
    if (cache === false) {
        // Make sure we delete the page from the cache
        delete require.cache[require.resolve(pageImportPath)];
        // Delete all the components from the cache
        for (var _i = 0, _a = Object.keys(require.cache); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.indexOf(componentsPath) !== -1) {
                delete require.cache[key];
            }
        }
    }
    var pageModule, pageModuleError;
    try {
        pageModule = require(pageImportPath);
    }
    catch (error) {
        pageModuleError = error;
    }
    // If we could not import a page, let's find out what happened
    if (!pageModule) {
        // If there was no page named like it, throw a 404 not found.
        if (utils.glob(pageImportPath + ".ts{,x}").length === 0) {
            return null;
        }
        // If there is a page at that path, some other error occured.
        var error = Error();
        error.message = "The page module at `" + pageImportPath + "` exists, but cannot be imported: \n\n";
        error.message += pageModuleError.message;
        error.stack = pageModuleError.stack;
        throw error;
    }
    // If we have a page module, see if it has a default error exposed
    if (typeof pageModule.default !== "function") {
        throw Error("The page module at " + pageImportPath + " does not have a [default export](https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript). You can add one by adding `export default render;`.");
    }
    return server_1.renderToString(pageModule.default(project));
};
var cmp;
exports.script = function (project) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Use a cached compiler for speed
        if (!cmp)
            cmp = compiler.setup(project, dynamic.entries(project));
        // Discover all the dynamic entries and add them
        // We don't have to remove the changed modules from the cache here,
        // as the page load should already have taken care of that
        cmp.options.entry = dynamic.entries(project);
        return [2 /*return*/, new Promise(function (resolve, reject) {
                cmp.run(function (err, stats) {
                    if (err) {
                        console.error("ERROR:", err);
                    }
                    if (stats.hasErrors()) {
                        var _a = stats["compilation"], errors = _a.errors, warnings = _a.warnings;
                        console.error(errors.map(function (e) { return e.message; }).join("\n"));
                    }
                    else {
                        resolve(cmp.outputFileSystem.data["bundle.js"].toString());
                    }
                });
            })];
    });
}); };
