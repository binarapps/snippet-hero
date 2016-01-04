var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;

passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {
    User.findOne({ where: { email: email } }).then(function(user) {
      user.isPasswordValid(password , function(result) {
        if(result) {
          done(null, user);
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      });
    }).catch(function(err) {
      done(err, false, { message: 'Incorrect username.' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  }).catch(function(error) {
    done(error, false);
  });
});
