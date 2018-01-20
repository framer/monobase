import * as fs from "fs";
import * as path from "path";
import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as types from "./types";
import * as utils from "./utils";

export const setup = (project: types.Project, entries: string[] = []) => {
  const compiler = webpack({
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

const productionPlugins = [
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
