import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";
import { promisify } from "util";

export const ConfigDefaults = {
  production: false,
  cache: false,
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
          use: {
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
  private _output: string = "";
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
    return await this._run();
  }

  get module() {
    const script = `${this._config.output.library}`;
    return eval([this._output, script].join("\n"));
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
