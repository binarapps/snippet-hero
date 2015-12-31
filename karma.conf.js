var path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.noParse = [/node_modules\/sinon\//];
webpackConfig.resolve.alias.sinon = path.resolve(__dirname, './node_modules/sinon/pkg/sinon.js');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    // karma only needs to know about the test bundle
    files: [
      'client/tests.bundle.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'client/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    singleRun: true,
    browserNoActivityTimeout: 30000,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
