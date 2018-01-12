"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var countFiles = require("count-files");
var _glob = require("glob");
var ncp_1 = require("ncp");
exports.mkdir = function (path) {
    try {
        fs.mkdirSync(path);
    }
    catch (err) {
        if (err.code !== "EEXIST")
            throw err;
    }
};
exports.cp = function (source, dest) {
    return new Promise(function (resolve, reject) {
        ncp_1.ncp(source, dest, function (err) {
            if (err)
                reject(err);
            resolve();
        });
    });
};
exports.rmdir = function (dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    var list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        if (filename == "." || filename == "..") {
        }
        else if (stat.isDirectory()) {
            exports.rmdir(filename);
        }
        else {
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};
exports.stats = function (path) {
    return new Promise(function (resolve, reject) {
        countFiles(path, function (err, results) {
            resolve(results);
        });
    });
};
exports.glob = function (pattern) {
    return _glob.sync(pattern);
};
exports.replaceExtension = function (dir, ext) {
    return path.join(path.dirname(dir), path.basename(dir, path.extname(dir)) + ext);
};
