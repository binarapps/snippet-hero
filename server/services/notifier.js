'use strict';

const models = require('../models');
const Snippet = models.Snippet;
const Comment = models.Comment;
const slack = require('./slack-integration');
const appLogger = require('../lib/logger');

function randomPositiveAdjs() {
  const positiveAdjs = ['amazing', 'awesome', 'blithesome', 'excellent', 'fabulous', 'fantastic', 'favorable',
    'fortuitous', 'great', 'incredible', 'ineffable', 'mirthful', 'outstanding', 'perfect', 'propitious', 'remarkable',
    'smart', 'spectacular', 'splendid', 'stellar', 'stupendous', 'super', 'ultimate', 'unbelievable', 'wondrous'];
  return positiveAdjs[Math.floor(positiveAdjs.length * Math.random())];
}

class Notifier {
  getNewSnippets() {
    return Snippet.scope(['withAuthor']).findAll({
      where: {
        createdAt: { $gte: (Date.now() - 24 * 3600 * 1000) }
      }
    });
  }

  getNewComments() {
    return Comment.scope(['withUser', 'withSnippet']).findAll({
      where: {
        createdAt: { $gte: (Date.now() - 24 * 3600 * 1000) }
      }
    });
  }

  textifySnippet(snippet) {
    return `New ${ randomPositiveAdjs() } ${ snippet.get('language') } snippet named "${ snippet.get('name') }" was added by ${ snippet.User.get('name') }`;
  }

  textifyComment(comment) {
    return `"${ comment.Snippet.get('name') }" was commented by ${ comment.User.get('name') }`;
  }

  execute() {
    var output;
    Promise.all([this.getNewSnippets(), this.getNewComments()]).then((values) => {
      let snippets = values[0];
      let comments = values[1];
      let snippetEvents = snippets.map(this.textifySnippet);
      let commentEvents = comments.map(this.textifyComment);

      if(snippetEvents.length + commentEvents.length > 0) {
        output = ['Some serious events happened in last 24h on SnippetHero', '---']
          .concat(snippetEvents)
          .concat(commentEvents)
          .join('\n');
        slack.notify(output);
      }
    }).catch((err) => {
      appLogger.debug(err.message);
    });
  }
}

module.exports = new Notifier();
