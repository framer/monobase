import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";
import { promisify } from "util";
import * as React from "react";
import * as ReactDOM from "react-dom";

export const ConfigDefaults = {
  production: false,
  cache: false,
  externals: true,
  context: {}
};

type ConfigOptions = typeof ConfigDefaults;

export const Config = (
  path: string,
  entries: string[],
  options?: Partial<ConfigOptions>
) => {
  options = { ...ConfigDefaults, ...options };

  const config = {
    watch: false,
    entry: entries,
    devtool: options.production ? false : "eval",
    mode: options.production ? "production" : "development",
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: true,
            keep_fnames: true,
            keep_classnames: true
          }
        })
      ]
    },
    // To execute in Node we need externals, because since React Hooks, the React instance
    // in Node and the one in the generated script need to be the same instance. So basically
    // pages always need externals but the components script does not.
    externals: options.externals
      ? [
          {
            react: {
              root: "React",
              commonjs2: "react",
              commonjs: "react",
              amd: "react"
            },
            "react-dom": {
              root: "ReactDOM",
              commonjs2: "react-dom",
              commonjs: "react-dom",
              amd: "react-dom"
            }
          }
        ]
      : [],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [path, "node_modules"],
      alias: {
        // You never want two styled component instances as that creates a mess
        // So we always alias it to the styled-components library in your project
        // https://www.styled-components.com/docs/faqs#duplicated-module-in-node_modules
        "styled-components": require.resolve("styled-components")
      }
    },
    node: {
      fs: "empty"
    },
    module: {
      rules: [
        {
          test: /.mdx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: options.cache,
                presets: ["@babel/env", "@babel/react"],
                plugins: [
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread",
                  "babel-plugin-styled-components"
                ]
              }
            },
            "@mdx-js/loader"
          ]
        },
        {
          test: [/\.m?js$/, /\.tsx?$/],
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: options.cache,
                presets: ["@babel/env", "@babel/typescript", "@babel/react"],
                plugins: [
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread",
                  "babel-plugin-styled-components"
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.context": JSON.stringify(options.context),
        "process.env.NODE_ENV": options.production
          ? JSON.stringify("production")
          : JSON.stringify("debug")
      })
    ]
  };

  return config;
};

export class Compiler {
  private _config: webpack.Configuration;
  private _webpack: webpack.Compiler;
  _output: string = "";
  private _result: Promise<string> | null = null;

  constructor(config: webpack.Configuration) {
    if (!config.output) {
      config.output = {};
    } else {
      throw Error("Compiler: config.output will be overridden");
    }

    const name = "bundle";

    config.output = {
      filename: `${name}.js`,
      path: "/",
      libraryTarget: "umd"
    };

    // This is to make UMD compatible with Node, because it normally relies on the window
    config.output["globalObject"] =
      "(typeof window !== 'undefined' ? window : this)";

    this._config = config;
    this._webpack = webpack(this._config);
    this._webpack.outputFileSystem = new MemoryFS();
  }

  get output() {
    return this._output;
  }

  async compile() {
    return await this._run();
  }

  get module() {
    // Expose the external packages to the generated script
    const require = (name: string) => {
      if (name === "react") return React;
      if (name === "react-dom" || name === "ReactDOM") return ReactDOM;
      throw Error(`Component loader: Can't require ${name}`);
    };

    // Evaluate the generated script and return the exports from the module
    const fn = new Function("module", "exports", "require", this._output);
    const mod = { exports: {} };
    fn(mod, mod.exports, require);

    return mod.exports;
  }

  private _run = () => {
    if (this._result) return this._result;

    const run: webpack.Compiler["run"] = this._webpack.run.bind(this._webpack);
    this._result = promisify(run)()
      .then(this._onReady)
      .catch(err => {
        this._result = null;
        return Promise.reject(err);
      });

    return this._result;
  };

  private _onReady = async (stats: webpack.Stats) => {
    this._result = null;

    if (stats.hasErrors()) {
      this._output = null;
      const msg =
        "Compiler error in " + stats.toString({ chunks: false, colors: true });
      throw new Error(msg);
    } else {
      this._output = this._webpack.outputFileSystem.data[
        this._config.output.filename
      ].toString();
    }

    return this._output;
  };
}
