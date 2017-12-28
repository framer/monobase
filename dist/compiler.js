"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var MemoryFS = require("memory-fs");
var utils = require("./utils");
var webpack = require("webpack");
exports.getCompiler = function (project) {
    var entries = [];
    var dynamicComponentImportPath = path.join(project.path, project.config.components, "dynamic.ts");
    var clientScriptImportPathTS = path.join(__dirname, "client.ts");
    var clientScriptImportPathJS = path.join(__dirname, "client.js");
    if (fs.existsSync(dynamicComponentImportPath)) {
        entries.push(utils.replaceExtension(dynamicComponentImportPath, ""));
    }
    if (fs.existsSync(clientScriptImportPathTS)) {
        entries.push(clientScriptImportPathTS);
    }
    if (fs.existsSync(clientScriptImportPathJS)) {
        entries.push(clientScriptImportPathJS);
    }
    var compiler = webpack({
        entry: entries,
        output: {
            filename: "bundle.js",
            path: "/"
            // library: "moodbase"
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"]
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM"
        },
        // plugins: [
        //   new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        //   })
        // ],
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                { test: /\.tsx?$/, loader: "ts-loader" }
                // {
                //   test: /entry\.js$/,
                //   loader: "webpack-replace",
                //   query: {
                //     search: "{{entry}}",
                //     replace: path
                //   }
                // }
            ]
        }
    });
    compiler.outputFileSystem = new MemoryFS();
    return compiler;
};
