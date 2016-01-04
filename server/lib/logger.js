var winston = require('winston');
var winstonDailyRotate = require('winston-daily-rotate-file');

var logger = new winston.Logger({
  transports: [
    new winstonDailyRotate({
      level: 'info',
      filename: './server/log/server.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message){
    logger.info(message);
  }
};

module.exports = logger;
