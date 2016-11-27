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
  output: {
    filename: 'main.js'
  }
};