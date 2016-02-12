var chai = require('chai');
var request = require('supertest');
var db = require('../models');
var factory = require('factory-girl');
require('factory-girl-sequelize')();
var app = require('../app');
var expect = chai.expect;
var passportStub = require('passport-stub');
var session = require('supertest-session');

passportStub.install(app);

var data = {
  content: 'great snippet'
};

factory.define('snippet', db.Snippet, {description: 'test', name: 'snippet', avg: 0.0});
factory.define('user', db.User, {name: 'user', email: 'test@example.com'});
factory.define('comment', db.Comment, data);
factory.define('commentWithUser', db.Comment, {
  content: 'great snippet',
  UserId: factory.assoc('user', 'id')
});

describe('Comments routes', function() {
  describe('POST /snippets/:snippetId/comments', function() {
    var user;
    before(function(done) {
      db.Comment.sync({ force : true }).then(function() {
        return db.Snippet.sync({ force : true }).then(function() {
          return db.User.sync({ force : true }).then(function() {
            factory.create('snippet', function() {
              factory.create('user', function(err, newUser) {
                user = newUser;
                if(!err) return done();
                return done(err);
              });
            });
          });
        });
      }).catch(function(err) {
        done(err);
      });
    });

    it('respond 401 if not logged in', function(done) {
      request(app)
        .post('/snippets/1/comments')
        .set('Accept', 'application/json')
        .send(data)
        .expect(401)
        .end(function(err) {
          if (err) {return done(err);}
          done();
        });
    });

    it('should save new record to database', function(done) {
      passportStub.login(user);
      session(app, {
        before: function (req) {
          req.set('user', user);
        }
      });
      request(app)
        .post('/snippets/1/comments')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .end(function(err, res) {
          if (err) {return done(err);}
          // console.log(res.body);

          expect(res.body).to.be.a.object;
          expect(res.body.id).to.be.ok;
          expect(res.body.content).to.be.equal(data.content);

          done();
        });
    });
  });
});

describe('Comment model', function() {
  before(function(done) {
    db.Comment.sync({ force : true }).then(function () {
      db.User.sync({ force : true }).then(function () {
        factory.create('commentWithUser', function(err) {
          if(!err) done();
        });
      });
    });
  });

  describe('#toJson', function() {
    it ('should return serialized model object', function(done) {
      db.Comment.scope(['withUser']).findOne().then(function(comment) {
        expect(comment.toJson).to.be.a.function;
        var json = comment.toJson();
        expect(json.content).to.be.equal(data.content);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

});
