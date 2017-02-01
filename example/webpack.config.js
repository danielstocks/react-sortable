var path = require("path");
var webpack = require("webpack");


module.exports = {
  entry: path.resolve(__dirname, "./index.js"),
  output: {
        path: __dirname,
        filename: "bundle.js"
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  //watch: true,
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
