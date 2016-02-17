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
  console.log('all ok');
}).catch(function(err){
  console.error(err);
});