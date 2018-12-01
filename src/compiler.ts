import * as MemoryFS from "memory-fs";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";

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
  private _config: any;
  private _webpack: any;
  private _output: string = "";
  private _running = false;
  private _resolvers = [];

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
      this._resolvers.push(resolve);
      this._run();
    });
  }

  get module() {
    const script = `${this._config.output.library}`;
    return eval([this._output, script].join("\n"));
  }

  private _run = () => {
    if (this._running) return;
    this._running = true;
    this._webpack.run(this._onReady);
  };

  private _onReady = (err, stats: webpack.Stats) => {
    this._running = false;
    if (err) {
      console.error("Compiler error:", err);
      this._output = null;
    }
    if (stats.hasErrors()) {
      console.error(stats.toString({ chunks: false, colors: true }));
      this._output = null;
    } else {
      this._output = this._webpack.outputFileSystem.data[
        this._config.output.filename
      ].toString();

      while (this._resolvers.length) {
        this._resolvers.pop()(this._output);
      }
    }
  };
}
