import MemoryFS from "memory-fs";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMServer from "react-dom/server";
import prettyBytes from "pretty-bytes";
import * as monobase from "./index";

import { join } from "path";
import { writeFileSync } from "fs";

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

  function cacheLoader(loaders) {
    return options.cache
      ? [
          {
            loader: "cache-loader",
            options: { cacheDirectory: join(projectPath, ".cache-loader") }
          },
          ...loaders
        ]
      : loaders;
  }

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
            monobase: {
              root: "monobase",
              commonjs2: "monobase",
              commonjs: "monobase",
              amd: "monobase"
            }
          }
        ]
      : [],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [projectPath, "node_modules"]
    },
    node: {
      fs: "empty"
    },
    module: {
      rules: [
        {
          test: /.mdx?$/,
          exclude: /(node_modules)/,
          use: cacheLoader([
            {
              loader: "babel-loader",
              options: {
                // We rely on "cached-loader" it's 10x faster
                cacheDirectory: false,
                presets: ["@babel/env", "@babel/react"],
                plugins: [
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread"
                ]
              }
            },
            "@mdx-js/loader"
          ])
        },
        {
          test: [/\.m?js$/, /\.tsx?$/],
          exclude: /(node_modules)/,
          use: cacheLoader([
            {
              loader: "babel-loader",
              options: {
                // We rely on "cached-loader" it's 10x faster
                cacheDirectory: false,
                highlightCode: false,
                presets: [
                  "@babel/preset-env",
                  "@babel/typescript",
                  "@babel/react"
                ],
                plugins: [
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread"
                ]
              }
            }
          ])
        },
        {
          test: /\.css$/i,
          use: cacheLoader([
            // This extracts the generated css and passes it so that we can use it in a <style> tag
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: false }
            },
            // This generates .d.ts files for every .css file so TypeScript pick them up
            "css-modules-typescript-loader",
            // This converts the styles into css modules with random classes for local scoping
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  mode: "local",
                  localIdentName: "[name]__[local]___[hash:base64:5]"
                }
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [
                  require("postcss-preset-env")(),
                  require("postcss-filter-rules")({
                    // Only allow class selectors in css modules
                    filter: (selector: string, parts: string[]) =>
                      selector.startsWith(".")
                  })
                ]
              }
            }
          ])
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        // https://github.com/webpack/webpack/issues/6749#issuecomment-372953473
        "process.env.context": webpack.DefinePlugin["runtimeValue"](() => {
          return JSON.stringify(contextCallback());
        }),
        "process.env.NODE_ENV": options.production
          ? JSON.stringify("production")
          : JSON.stringify("debug")
      }),
      new MiniCssExtractPlugin({ filename: "styles.css" })
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
  _styles: string = "";
  private _running: Promise<string> | null = null;

  constructor(projectPath: string, options: Partial<ConfigOptions> = {}) {
    const config: any = Config(projectPath, this._getContext, options);
    const name = "bundle";

    config.output = {
      path: "/",
      filename: `${name}.js`,
      libraryTarget: "umd",
      // This is to make UMD compatible with Node, because it normally relies on the window
      globalObject: "(typeof window !== 'undefined' ? window : this)"
    };

    config.entry = this._getEntry;

    this._config = config;
    this._webpack = webpack(this._config);
    this._webpack.outputFileSystem = new MemoryFS();
  }

  get output() {
    return this._output;
  }

  get styles() {
    return this._styles;
  }

  async compile(entries: string[], context: object) {
    this._entry = entries;
    this._context = context;
    return this._run();
  }

  get module(): any {
    // Expose the external packages to the generated script
    const require = (name: string) => {
      if (name === "react") return React;
      if (name === "react-dom" || name === "ReactDOM") return ReactDOM;
      if (name === "react-dom/server") return ReactDOMServer;
      if (name === "monobase") return monobase;
      throw Error(`[monobase.compiler]: Can't require ${name}`);
    };

    // Evaluate the generated script and return the exports from the module
    const fn = new Function("module", "exports", "require", this._output);
    const mod = { exports: {} };

    // Eval the code and grab the exports
    const t1 = Date.now();
    fn(mod, mod.exports, require);
    // console.log(`> compile.eval took ${Date.now() - t1}ms`);

    return mod.exports;
  }

  private _readFile(name: string): string | null {
    return this._webpack.outputFileSystem["data"][name]
      ? this._webpack.outputFileSystem["data"][name].toString()
      : null;
  }

  private _run = () => {
    // Make sure we never run twice
    if (this._running) {
      return this._running;
    }

    const t1 = Date.now();

    return (this._running = new Promise((resolve, reject) => {
      this._webpack.run((error, stats) => {
        this._running = null;

        if (error) {
          reject(
            `Compiler error ${stats.toString({ chunks: false, colors: false })}`
          );
        }

        // console.log(
        //   `> compile.build took ${Date.now() - t1}ms at ${prettyBytes(
        //     this._output.length
        //   )}`
        // );

        this._output = this._readFile(this._config.output.filename as string);
        this._styles = this._readFile("styles.css");

        // writeFileSync(
        //   join(this._config.context, this._entry.join("-") + ".js"),
        //   this._output
        // );

        resolve(this.output);
      });
    }));
  };

  private _getEntry = () => {
    return this._entry;
  };

  private _getContext = () => {
    return this._context;
  };
}
