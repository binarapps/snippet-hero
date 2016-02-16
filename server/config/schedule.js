'use strict';

const schedule = require('node-schedule');
const notfier = require('../services/notifier');
const slack = require('../services/slack-integration');
const pathsHelper = require('../services/paths-helper');

module.exports = () => {
  // notice about new snippets and comments everday at 1pm
  schedule.scheduleJob('0 13 * * *', () => {
    notfier.execute();
  });

  // remind that there is only 3 days left to rate snippets
  schedule.scheduleJob('0 11 26-30 * *', () => {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let targetDate = new Date(now.getFullYear(), now.getMonth() + 1, -2);
    if(targetDate.valueOf() == today.valueOf()) {
      slack.notify(`Only 3 days left to vote for snippets! ${ slack.link(pathsHelper.snippetsUrl() ,'Visit SnippetHero') }`);
    }
  });
};
