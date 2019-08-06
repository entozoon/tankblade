const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  ExtractTextPlugin = require(`extract-text-webpack-plugin`),
  path = require("path");
module.exports = (env, argv) => {
  const extractCss = new ExtractTextPlugin({
    filename: `app.css`
  });

  return {
    entry: {
      main: [`${__dirname}/src/main.js`, `${__dirname}/src/app.scss`]
    },
    resolve: {
      modules: [`node_modules`, `src`],
      extensions: [".js", ".scss"]
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
    module: {
      rules: [
        {
          test: /\.scss$/,
          // use: extractCss.extract({
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
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
};
