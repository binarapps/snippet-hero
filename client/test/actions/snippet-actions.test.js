/*eslint-disable no-unused-vars*/
import React from 'react';
import alt from '../../js/libs/alt';
import axios from 'axios';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import chai from 'chai';
import sinon from 'sinon';

import SnippetActions from '../../js/actions/snippet-actions';

const expect = chai.expect;

describe('SnippetActions', function() {
  before(function() {
    sinon.spy(alt, 'dispatch');
  });

  afterEach(() => {
    alt.dispatch.reset();
  });

  describe('Get snippets collection', () => {
    let snippets;
    before(() => {
      snippets = [
        { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'},
        { id: 2, content: 'test', name: 'test', description: 'test', language: 'javascript'}
      ];
      sinon.stub(axios, 'get', () => {
        return new Promise(function(resolve) {
          resolve({data: snippets});
        });
      });
    });

    it('should dispatch all snippets list from server', (done) => {
      SnippetActions.getAll();
      setTimeout(function () {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(snippets);
        done();
      });
    });

    it('should dispatch all snippets with name from server', (done) => {
      SnippetActions.search('test');
      setTimeout(function () {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(snippets);
        done();
      });
    });
  });

  describe('Create snippet', function() {
    let snippet;
    before( function() {
      snippet = { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'};
      sinon.stub(axios, 'post', () => {
        return new Promise(function(resolve) {
          resolve({data: snippet});
        });
      });
    });

    it('should dispatch created snippet', function(done) {
      SnippetActions.create(snippet);
      setTimeout(function() {
        expect(alt.dispatch.calledTwice).to.be.true;
        expect(alt.dispatch.getCall(1).args[1].snippet).to.deep.equal(snippet);
        done();
      });
    });
  });

});
