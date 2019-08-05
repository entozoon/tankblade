"use strict";
const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  path = require("path");
module.exports = {
  entry: "./src/main.js",
  resolve: {
    extensions: [".js"]
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    globalObject: "this"
  },
  devServer: {
    contentBase: "./build"
  },
  plugins: [
    // new CleanWebpackPlugin([path.resolve(__dirname, "build")]),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: "static" }]),
    new HtmlWebpackPlugin({
      template: "static/index.html"
    })
  ],
  performance: { hints: false }
};
