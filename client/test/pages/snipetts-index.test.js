/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

import SnippetsIndex from '../../js/components/pages/snippets-index';
import SnippetFormDialog from '../../js/components/snippets/snippet-form-dialog';

const expect = chai.expect;

describe('SnippetsIndex', () => {
  var snippetsIndex;
  before(function() {
    snippetsIndex = TestUtils.renderIntoDocument(
      <SnippetsIndex snippets={[]}/>
    );
  });

  describe('open new snippet dialog', () => {
    it('should open new snippet dialog on click', () => {
      var dialog = TestUtils.findRenderedComponentWithType(snippetsIndex, SnippetFormDialog);
      expect(dialog.dialog.isOpen()).to.be.false;
      snippetsIndex.setState({dialogOpen: true});
      expect(dialog.dialog.isOpen()).to.be.true;
    });
  });
});
