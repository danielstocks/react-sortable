var path = require("path");
module.exports = {
  entry: {
    gridlist: "./demo/gridlist/App.js",
    nested: "./demo/nested/App.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name]_bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
};