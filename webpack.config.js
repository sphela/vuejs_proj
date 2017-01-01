const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        loader: 'vue'
      },
    ],
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      scss: ExtractTextPlugin.extract('css!sass'),
      sass: ExtractTextPlugin.extract('css!sass'),
    }
  },
  output: {
    filename: 'main.js',
  },
  plugins: [
    new ExtractTextPlugin('vue.css')
  ],
};