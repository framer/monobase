"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var utils = require("./utils");
var client_1 = require("./client");
var getClientScriptImportPath = function () {
    var clientScriptImportPathTS = path.join(__dirname, "client.ts");
    var clientScriptImportPathJS = path.join(__dirname, "client.js");
    if (fs.existsSync(clientScriptImportPathTS)) {
        return clientScriptImportPathTS;
    }
    if (fs.existsSync(clientScriptImportPathJS)) {
        return clientScriptImportPathJS;
    }
};
exports.discover = function (dir) {
    var results = {};
    var paths = utils.glob(dir + "/**/*.ts{,x}");
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var modulePath = paths_1[_i];
        try {
            var module_1 = require(modulePath);
        }
        catch (error) {
            continue;
        }
        for (var _a = 0, _b = Object.keys(module); _a < _b.length; _a++) {
            var key = _b[_a];
            if (client_1.isDynamicComponent(module[key])) {
                if (!results[modulePath]) {
                    results[modulePath] = [];
                }
                results[modulePath].push(module[key]);
            }
        }
    }
    return results;
};
var clientScriptImportPath;
exports.entries = function (project) {
    if (!clientScriptImportPath) {
        clientScriptImportPath = getClientScriptImportPath();
    }
    if (!clientScriptImportPath) {
        throw Error("Could not locate client script (client.ts or client.js in monobase");
    }
    return Object.keys(exports.discover(path.join(project.path, project.config.components))).concat([
        clientScriptImportPath
    ]);
};
