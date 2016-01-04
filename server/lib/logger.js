var log4js = require('log4js');
log4js.configure({
  appenders: [
    {
      type: 'dateFile',
      filename: './server/log/server.log',
      pattern: '-yyyy-MM-dd'
    },
    { type: 'console' }
  ]
});
var appLogger = log4js.getLogger();

module.exports = appLogger;
