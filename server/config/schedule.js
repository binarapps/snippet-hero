const schedule = require('node-schedule');
const notfier = require('../services/notifier');

// everday at 1pm
schedule.scheduleJob('0 13 * * *', () => {
  notfier.execute();
});
