var chai = require('chai');
var request = require('supertest');

var db = require('../models');
var factory = require('factory-girl');
require('factory-girl-sequelize')();
var app = require('../app');

var expect = chai.expect;

var data = {
  content: 'great snippet'
};

factory.define('comment', db.Comment, data);
factory.define('snippet', db.Snippet, {description: 'test', name: 'snippet'});

describe('Comments routes', function() {
  describe('POST /snippets/:snippetId/comments', function() {
    before(function(done) {
      db.Comment.sync({ force : true }).then(function() {
        factory.create('snippet', function(err, snippet) {
          done();
        });
      }).catch(function(err) {
        done(err);
      });
    });

    it('should save new record to database', function(done) {
      request(app)
        .post('/snippets/1/comments')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .end(function(err, res) {
          if (err) {return done(err);}

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
      factory.create('comment', function(err, comment) {
        done();
      });
    });
  });

  describe('#toJson', function() {
    it ('should return serialized model object', function(done) {
      db.Comment.findOne().then(function(comment) {
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
