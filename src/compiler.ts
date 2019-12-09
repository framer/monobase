import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";
import { promisify } from "util";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMServer from "react-dom/server";
import * as styled from "styled-components";
import { join } from "path";

export const ConfigDefaults = {
  production: false,
  cache: false,
  externals: true
};

type ConfigOptions = typeof ConfigDefaults;

export const Config = (
  projectPath: string,
  contextCallback = () => {
    return {};
  },
  options?: Partial<ConfigOptions>
) => {
  options = { ...ConfigDefaults, ...options };

  const cachePath = join(projectPath, ".babel-cache");

  const config = {
    context: projectPath,
    watch: false,
    devtool: options.production ? false : "eval",
    mode: options.production ? "production" : "development",
    optimization: options.production
      ? {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                mangle: true,
                keep_fnames: true,
                keep_classnames: true
              }
            })
          ]
        }
      : {},
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
            },
            "react-dom/server": {
              root: "react-dom/server",
              commonjs2: "react-dom/server",
              commonjs: "react-dom/server",
              amd: "react-dom/server"
            },
            "styled-components": {
              root: "styled-components",
              commonjs2: "styled-components",
              commonjs: "styled-components",
              amd: "styled-components"
            }
          }
        ]
      : [],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [projectPath, "node_modules"],
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
                cacheDirectory: options.cache ? cachePath : false,
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
                cacheDirectory: options.cache ? cachePath : false,
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
        // https://github.com/webpack/webpack/issues/6749#issuecomment-372953473
        "process.env.context": webpack.DefinePlugin["runtimeValue"](() => {
          return JSON.stringify(contextCallback());
        }, true),
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
  private _entry = [];
  private _context = {};
  _output: string = "";
  private _result: Promise<string> | null = null;

  constructor(projectPath: string, options: Partial<ConfigOptions> = {}) {
    const config: any = Config(projectPath, this._getContext, options);
    const name = "bundle";

    config.output = {
      filename: `${name}.js`,
      path: "/",
      libraryTarget: "umd"
    };

    // This is to make UMD compatible with Node, because it normally relies on the window
    config.output["globalObject"] =
      "(typeof window !== 'undefined' ? window : this)";

    config.entry = this._getEntry;

    this._config = config;
    this._webpack = webpack(this._config);
    this._webpack.outputFileSystem = new MemoryFS();
  }

  get output() {
    return this._output;
  }

  async compile(entries: string[], context: object) {
    this._entry = entries;
    this._context = context;
    return await this._run();
  }

  get module(): any {
    // Expose the external packages to the generated script
    const require = (name: string) => {
      if (name === "react") return React;
      if (name === "react-dom" || name === "ReactDOM") return ReactDOM;
      if (name === "react-dom/server") return ReactDOMServer;
      if (name === "styled-components") return styled;
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

  private _getEntry = () => {
    return this._entry;
  };

  private _getContext = () => {
    return this._context;
  };

  private _onReady = async (stats: webpack.Stats) => {
    this._result = null;

    if (stats.hasErrors()) {
      this._output = null;
      const msg =
        "Compiler error in " + stats.toString({ chunks: false, colors: false });
      throw new Error(msg);
    } else {
      this._output = this._webpack.outputFileSystem["data"][
        this._config.output.filename
      ].toString();
    }

    return this._output;
  };
}
