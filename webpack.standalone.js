var path = require('path');
var webpack = require('webpack');

module.exports = [{
  entry: './src/index.js',

  output: {
    filename: './lib/standalone/react-sortable.js',
    libraryTarget: 'umd',
    library: 'Sortable'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src')
      ]
    }]
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
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src')
      ]
    }]
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
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
}];
