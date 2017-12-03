var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./examples/main.js",
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
