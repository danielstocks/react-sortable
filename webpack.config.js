var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./examples/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './examples'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader' },
    ]
  },
  watch: true
};
