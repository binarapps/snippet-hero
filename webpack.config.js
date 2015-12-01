'use strict';

let path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'client', 'js');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const config = {
  entry: path.resolve(APP_PATH, 'app.js'),
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: BUILD_PATH,
    filename: 'app.js'
  },
  debug: true,
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
