var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "index_bundle.js"
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