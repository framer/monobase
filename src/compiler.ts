import * as fs from "fs";
import * as path from "path";
import * as MemoryFS from "memory-fs";
import * as utils from "./utils";
import * as webpack from "webpack";

import * as types from "./types";

export const getCompiler = (project: types.Project) => {
  const entries = [];

  const dynamicComponentImportPath = path.join(
    project.path,
    project.config.components,
    "dynamic.ts"
  );

  const clientScriptImportPathTS = path.join(__dirname, "client.ts");
  const clientScriptImportPathJS = path.join(__dirname, "client.js");

  if (fs.existsSync(dynamicComponentImportPath)) {
    entries.push(utils.replaceExtension(dynamicComponentImportPath, ""));
  }

  if (fs.existsSync(clientScriptImportPathTS)) {
    entries.push(clientScriptImportPathTS);
  }

  if (fs.existsSync(clientScriptImportPathJS)) {
    entries.push(clientScriptImportPathJS);
  }

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
      modules: [path.resolve("./src"), "node_modules"]
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
