/*eslint-disable no-unused-vars*/
import React from 'react';
import alt from '../../js/libs/alt';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
// import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon';

import SnippetActions from '../../js/actions/snippet-actions';

const expect = chai.expect;

describe('SnippetActions', () => {
  it('should dispatch all snippets list from server', (done) => {
    var snippets = [
      { id: 1, content: 'test', name: 'test', description: 'test', language: 'javascript'},
      { id: 2, content: 'test', name: 'test', description: 'test', language: 'javascript'}
    ];

    var server = sinon.fakeServer.create({
      autoRespond: true,
      respondImmediately: true
    });
    sinon.spy(alt, 'dispatch');
    server.respondWith('GET', '/snippets', [200, { 'Content-Type': 'application/json' }, JSON.stringify(snippets)]);
    SnippetActions.getAll();
    setTimeout(function () {
      expect(alt.dispatch.calledOnce).to.be.true;
      done();
    });
  });
});
