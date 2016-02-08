var request = require('request');
var settings = require('../config/settings');
var appLogger = require('../lib/logger');
var env = process.env.NODE_ENV;
var secrets;

if (env === 'production') {
  secrets = require('../config/secrets-production');
} else {
  secrets = require('../config/secrets');
}

var SlackIntegration = {
  link: function(url, linkName) {
    var link = '<' + url;
    if(linkName) {
      link += '|' + linkName;
    }
    link += '>';
    return link;
  },
  notify: function(text) {
    this.send({ text: text });
  },
  send: function(data)  {
    if(!secrets.slackHookUrl) { throw new Error('No slackHookUrl was provided in \'config/secrets.json\'.'); }
    var payload = {
      channel: data.channel || settings.slack.defaultChannel,
      username: data.username || settings.slack.defaultUsername,
      text: data.text,
      icon_emoji: data.iconEmoji || settings.slack.defaultIconEmoji
    };
    var options = {
      url: secrets.slackHookUrl,
      body: JSON.stringify(payload)
    };
    request.post(options, function(err) {
      if(err) {
        appLogger.debug(err);
      }
    });
  }
};

module.exports = SlackIntegration;
