/*eslint-disable no-unused-vars*/
import React from 'react';
import alt from '../../js/libs/alt';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import chai from 'chai';
import sinon from 'sinon';

import SnippetActions from '../../js/actions/snippet-actions';

const expect = chai.expect;

describe('SnippetActions', function() {
  var server;
  before(function() {
    server = sinon.fakeServer.create({
      autoRespond: true,
      respondImmediately: true
    });
    sinon.spy(alt, 'dispatch');
  });

  afterEach(function() {
    alt.dispatch.reset();
  });

  describe('Get snippets collection', function() {
    var snippets;
    before(function() {
      snippets = [
        { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'},
        { id: 2, content: 'test', name: 'test', description: 'test', language: 'javascript'}
      ];
    });

    it('should dispatch all snippets list from server', function(done) {
      server.respondWith('GET', '/snippets', [200, { 'Content-Type': 'application/json' }, JSON.stringify(snippets)]);
      SnippetActions.getAll();
      setTimeout(function () {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(snippets);
        done();
      });
    });

    it('should dispatch all snippets with name from server', function(done) {
      server.respondWith('GET', '/snippets/search?name=test', [200, { 'Content-Type': 'application/json' }, JSON.stringify(snippets)]);
      SnippetActions.search('test');
      setTimeout(function () {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(snippets);
        done();
      });
    });
  });

  describe('Create snippet', function() {
    var snippet;
    before( function() {
      snippet = { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'};
    });
    it('should dispatch created snippet', function(done) {
      server.respondWith('POST', '/snippets', [201, { 'Content-Type': 'application/json' }, JSON.stringify(snippet)]);
      SnippetActions.create(snippet);
      setTimeout(function() {
        expect(alt.dispatch.calledTwice).to.be.true;
        expect(alt.dispatch.getCall(1).args[1].snippet).to.deep.equal(snippet);
        done();
      });
    });
  });

});
