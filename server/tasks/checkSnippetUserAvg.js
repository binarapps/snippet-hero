var models = require('../models');
Promise.all([
  models.Snippet.findAll()
    .then(function(snippets) {
      snippets.map(function(snippet) {
        models.Rating.aggregate('value', 'avg', {where: {SnippetId: snippet.id}})
        .then(average => {
          snippet.avg = average;
          return snippet.save();
        });
      });
    }),

  models.User.findAll()
    .then(function(users) { 
      users.map(function(user) {
        models.Snippet.aggregate('avg', 'avg', {where: {UserId: user.id}})
        .then(function(average) {
          user.avg = average;
          return user.save();
        });
      });
    })
]).then(function(){
  /*eslint-disable no-console*/
  console.log('all ok');
  /*eslint-enable no-console*/
}).catch(function(err){
  /*eslint-disable no-console*/
  console.error(err);
  /*eslint-enable no-console*/
});