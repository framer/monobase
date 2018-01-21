"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryFS = require("memory-fs");
var webpack = require("webpack");
exports.setup = function (project, entries) {
    if (entries === void 0) { entries = []; }
    var compiler = webpack({
        entry: entries,
        output: {
            filename: "bundle.js",
            path: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [project.path, "node_modules"]
        },
        module: {
            rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
        },
        plugins: project.build === "production" ? productionPlugins : []
    });
    compiler.outputFileSystem = new MemoryFS();
    return compiler;
};
var productionPlugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        }
    })
];
