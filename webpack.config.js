'use strict';
let path = require('path');
let webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'client', 'js');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

const config = {
  entry: path.resolve(APP_PATH, 'app.js'),
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      codemirror: path.resolve(NODE_MODULES_PATH, 'react-codemirror/node_modules/codemirror')
    }
  },
  output: {
    path: BUILD_PATH,
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.jsx?$/,
        exclude: [NODE_MODULES_PATH],
        loader: 'babel-loader'
      }
    ]
  }
};

// Setup environment config

let env = process.env.NODE_ENV;

if(env === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      sourceMap: false
    })
  ];
} else {
  config.debug = true;
  config.devtool = 'eval-source-map';
}

module.exports = config;
