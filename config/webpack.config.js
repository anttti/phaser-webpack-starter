const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === "dev";

const nodeModulesPath = path.join(__dirname, "../node_modules");
const srcPath = path.join(__dirname, "../src");
const assetsPath = path.join(__dirname, "../assets");

const title = "";

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    bundle: path.join(srcPath, "index.js"),
    vendor: ["phaser"]
  },
  resolve: {
    modules: [nodeModulesPath, srcPath, assetsPath]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../index.html"),
      title
    })
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: srcPath,
        exclude: nodeModulesPath,
        options: {
          compact: true
        }
      },
      // STYLES
      {
        test: /\.css$/,
        include: assetsPath,
        exclude: nodeModulesPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },
      // CSS / SASS
      {
        test: /\.scss/,
        include: assetsPath,
        exclude: nodeModulesPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },
      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: "file-loader",
        include: assetsPath,
        exclude: nodeModulesPath,
        options: {
          name: "[path][name].[ext]"
        }
      },
      // RAW
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all"
    }
  }
};
