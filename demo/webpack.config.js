var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./js/App.js",
  output: {
        path: __dirname,
        filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};