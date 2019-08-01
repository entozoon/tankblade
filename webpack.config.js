"use strict";
const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  path = require("path");
module.exports = {
  entry: "./src/main.js",
  resolve: {
    extensions: [".js"]
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./docs"
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, "docs")]),
    new HtmlWebpackPlugin({
      template: "static/index.html"
    })
  ],
  performance: { hints: false }
};
