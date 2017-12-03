var path = require("path");
var webpack = require("webpack");

module.exports = {
  //entry: "./examples/basic/index.js",
  //entry: "./examples/html-table/index.js",
  //entry: "./examples/real-world-grid/index.js",
  //entry: "./examples/real-world-list/index.js",
  entry: "./examples/redux/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './examples',
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader' },
    ]
  },
  watch: true
};
