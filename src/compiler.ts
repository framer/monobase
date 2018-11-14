import * as fs from "fs";
import * as path from "path";
import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as types from "./types";
import * as utils from "./utils";

export const Config = (
  path: string,
  entries: string[],
  production = false,
  cache = false
) => {
  return {
    watch: false,
    entry: entries,
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [path, "node_modules"]
    },
    module: {
      rules: [
        {
          test: [/\.m?js$/, /\.tsx?$/],
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: cache,
              presets: ["@babel/env", "@babel/typescript", "@babel/react"],
              plugins: [
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread"
              ]
            }
          }
        }
      ]
    },
    plugins: production ? productionPlugins : []
  };
};

export class Compiler {
  private _config: any;
  private _webpack: any;
  private _output: string = "";

  constructor(config) {
    if (!config.output) {
      config.output = {};
    } else {
      throw Error("Compiler: config.output will be overridden");
    }

    const name = "bundle";

    config.output = {
      filename: `${name}.js`,
      path: "/",
      libraryTarget: "var",
      library: name
    };

    this._config = config;
    this._webpack = webpack(this._config);
    this._webpack.outputFileSystem = new MemoryFS();
  }

  get output() {
    return this._output;
  }

  async compile() {
    return new Promise((resolve, reject) => {
      this._webpack.run((err, stats: webpack.Stats) => {
        if (err) {
          console.error("Compiler error:", err);
        }
        if (stats.hasErrors()) {
          console.error(stats.toString({ chunks: false, colors: true }));
        } else {
          this._output = this._webpack.outputFileSystem.data[
            this._config.output.filename
          ].toString();
          resolve(this._output);
        }
      });
    });
  }
}

export const setup = (project: types.Project, entries: string[] = []) => {
  return new Compiler(Config(project.path, entries));
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
