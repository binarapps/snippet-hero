var chai = require('chai');
var request = require('supertest');

var db = require('../models');
var app = require('../app');

var factory = require('factory-girl');
require('factory-girl-sequelize')();

var expect = chai.expect;

// For creating snippets with version
factory.define('snippetVersion', db.SnippetVersion, {
  content: 'hura',
  SnippetId: factory.assoc('snippet', 'id')
});

var data = {
  name: 'example name',
  content: 'hura',
  description: 'some description'
};

var today = new Date(Date.now());
var month = today.getMonth();
var year = today.getFullYear();

factory.define('snippet', db.Snippet, data);

describe('Snippets routes', function() {
  describe('POST /snippets', function () {
    before(function (done) {
      db.Snippet.sync({ force : true }).then(function () {
        db.SnippetVersion.sync({ force : true }).then(function () {
          done();
        }).catch(function (err) {
          done(err);
        });
      }).catch(function (err) {
        done(err);
      });
    });

    it('should save new record to database', function (done) {
      request(app)
        .post('/snippets')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .end(function (err, res) {
          if (err) {return done(err);}

          expect(res.body).to.be.a.object;
          expect(res.body.id).to.be.ok;
          expect(res.body.description).to.be.equal(data.description);
          expect(res.body.content).to.be.equal(data.content);

          done();
        });
    });
  });

  describe('GET /snippets', function () {
    before(function (done) {
      db.Snippet.sync({ force : true }).then(function () {
        db.SnippetVersion.sync({ force : true }).then(function () {
          factory.createMany('snippetVersion', 2, function(err) {
            if(!err) done();
          });
        }).catch(function (err) {
          done(err);
        });
      });
    });

    it('should return array of snippets', function (done) {
      request(app)
        .get('/snippets?year='+year+'&month='+month)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) {return done(err);}
          expect(res.body.snippets).to.be.an.array;
          expect(res.body.snippets.length).to.be.equal(2);

          var snippet  = res.body.snippets[0];

          expect(snippet).to.be.a.object;
          expect(snippet.id).to.be.ok;
          expect(snippet.content).to.be.equal(data.content);
          expect(snippet.description).to.be.equal(data.description);

          done();
        });
    });
  });
});

describe('Snippet model', function () {
  before(function (done) {
    db.Snippet.sync({ force : true }).then(function () {
      factory.create('snippet', function(err) {
        if(!err) done();
      });
    });
  });

  describe('#toJson', function () {
    it ('should return serilized model object', function (done) {
      db.Snippet.scope('withVersions').findOne().then(function (snippet) {
        expect(snippet.toJson).to.be.a.function;

        var json = snippet.toJson();
        expect(json.name).to.be.equal(data.name);
        expect(json.content).to.be.equal(data.content);
        expect(json.description).to.be.equal(data.description);

        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });
});
