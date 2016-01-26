/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import alt from '../../js/libs/alt';
import axios from 'axios';
import chai from 'chai';
import sinon from 'sinon';

import SnippetActions from '../../js/actions/snippet-actions';
import FlashMessages from '../../js/actions/flash-messages-actions';

const expect = chai.expect;

describe('SnippetActions', function() {
  before(function() {
    sinon.spy(alt, 'dispatch');
    sinon.stub(FlashMessages, 'pushMessage', () => {
      return;
    });
  });

  afterEach(function() {
    alt.dispatch.reset();
  });

  describe('Get snippets collection', () => {
    before(() => {
      this.snippets = [
        { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'},
        { id: 2, content: 'test', name: 'test', description: 'test', language: 'javascript'}
      ];
      sinon.stub(axios, 'get', () => {
        return new Promise((resolve) => {
          resolve({data: this.snippets});
        });
      });
    });

    it('should dispatch all snippets list from server', (done) => {
      SnippetActions.getAll();
      setTimeout(() => {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(this.snippets);
        done();
      });
    });

    it('should dispatch all snippets with name from server', (done) => {
      SnippetActions.search('test');
      setTimeout(() => {
        expect(alt.dispatch.calledOnce).to.be.true;
        expect(alt.dispatch.getCall(0).args[1].snippets).to.deep.equal(this.snippets);
        done();
      });
    });
  });

  describe('Create snippet', function() {
    before(() => {
      this.snippet = { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'};
      sinon.stub(axios, 'post', () => {
        return new Promise((resolve) => {
          resolve({data: this.snippet});
        });
      });
    });

    it('should dispatch created snippet', (done) => {
      SnippetActions.create(this.snippet);
      setTimeout(() => {
        // Twice for create and success callback
        expect(alt.dispatch.calledTwice).to.be.true;
        expect(alt.dispatch.getCall(1).args[1].snippet).to.deep.equal(this.snippet);
        done();
      });
    });
  });

  describe('Delete snippet', function(){
    before(() => {
      sinon.stub(axios, 'delete', () => {
        return new Promise((resolve) => {
          resolve({ok: true});
        });
      });
    });

    it('should destroy snippet', (done) => {
      SnippetActions.destroySnippet();
      setTimeout(() => {
        // TODO fix calling action twice
        expect(alt.dispatch.calledTwice).to.be.true;
        done();
      });
    });
  });

  describe('Edit snippet', function() {
    before(() => {
      this.snippet = { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'};
      sinon.stub(axios, 'put', () => {
        return new Promise((resolve) => {
          resolve({data: this.snippet});
        });
      });
    });

    it('should dispatch updated snippet', (done) => {
      SnippetActions.update(this.snippet);
      setTimeout(() => {
        // Twice for create and success callback
        expect(alt.dispatch.calledTwice).to.be.true;
        expect(alt.dispatch.getCall(1).args[1].snippet).to.deep.equal(this.snippet);
        done();
      });
    });
  });
});
