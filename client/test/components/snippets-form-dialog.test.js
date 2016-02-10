/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon';
import UserStore from '../../js/stores/user-store';
import SnippetFormDialog from '../../js/components/snippets/snippet-form-dialog.jsx';

const expect = chai.expect;
// test variables
const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

describe('SnippetFormDialog', () => {
  describe('open dialog', () => {
    before(() => {
      sinon.stub(UserStore, 'getState', () => {
        return { currentUser: { name: 'user', id: 1 }};
      });
    });

    it('should open dialog', () => {
      let snippetFormDialog = TestUtils.renderIntoDocument(
        <SnippetFormDialog defaultOpen={false} languages={languages} />
      );
      expect(snippetFormDialog.dialog.isOpen()).to.be.false;
      snippetFormDialog.open();
      expect(snippetFormDialog.state.isOpen).to.be.true;
      expect(snippetFormDialog.dialog.isOpen()).to.be.true;
    });
  });
});
