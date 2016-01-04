var chai = require('chai');
var request = require('supertest');

var db = require('../models');
var app = require('../app');

var expect = chai.expect;

var createSingleComment = function(data, done) {
  db.Comment.sync({ force : true }).then(function() {
    db.Comment.create(data).then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });
  }).catch(function(err) {
    done(err);
  });
};

var commentData = {
  content: 'great snippet'
};

describe('Comments routes', function() {
  describe('POST /snippets/:snippetId/comments', function() {
    before(function(done) {
      db.Comment.sync({ force : true }).then(function() {
        db.Snippet.create({description: 'test', name: 'test'}).then(function () {
          done();
        }).catch(function (err) {
          done(err);
        });
      }).catch(function(err) {
        done(err);
      });
    });

    it('should save new record to database', function(done) {
      request(app)
        .post('/snippets/1/comments')
        .set('Accept', 'application/json')
        .send(commentData)
        .expect(201)
        .end(function(err, res) {
          if (err) {return done(err);}

          expect(res.body).to.be.a.object;
          expect(res.body.id).to.be.ok;
          expect(res.body.content).to.be.equal(commentData.content);

          done();
        });
    });
  });
});

describe('Comment model', function() {
  before(function(done) {
    createSingleComment(commentData, done);
  });

  describe('#toJson', function() {
    it ('should return serialized model object', function(done) {
      db.Comment.findOne().then(function(comment) {
        expect(comment.toJson).to.be.a.function;

        var json = comment.toJson();
        expect(json.content).to.be.equal(commentData.content);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

});
