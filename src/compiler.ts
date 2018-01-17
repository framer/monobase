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
      // library: "moodbase"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      modules: [project.path, "node_modules"]
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
