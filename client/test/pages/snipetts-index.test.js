/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

import SnippetsIndex from '../../js/components/pages/snippets-index';

const expect = chai.expect;

describe('SnippetsIndex', () => {
  describe('add snippet', () => {
    it('should open new snippet dialog on click', () => {
      let snippetsIndex = TestUtils.renderIntoDocument(
        <SnippetsIndex/>
      );
      expect(snippetsIndex.snippetDialog.dialog.isOpen()).to.be.false;
      snippetsIndex.setState({dialogOpen: true});
      expect(snippetsIndex.snippetDialog.dialog.isOpen()).to.be.true;
    });
  });
});
