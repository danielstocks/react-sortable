module.exports = {
  entry: "./demo/gridlist/App.js",
  output: {
    path: __dirname,
    filename: "build/bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};