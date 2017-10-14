var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var webpack = require('webpack');

module.exports = [{
  entry: './src/index.js',

  output: {
    filename: './lib/standalone/react-sortable.js',
    libraryTarget: 'umd',
    library: 'Sortable'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  externals: {
    react: 'React'
  }
}, {
  entry: './src/index.js',

  output: {
    filename: './lib/standalone/react-sortable.min.js',
    libraryTarget: 'umd',
    library: 'Sortable'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  externals: {
    react: 'React'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin()
  ]
}];
