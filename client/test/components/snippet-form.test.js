/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import chai from 'chai';

import SnippetForm from '../../js/components/snippets/snippet-form.jsx';

const expect = chai.expect;
const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

describe('SnippetForm', () => {
  describe('submit', () => {
    it('without content should render error', () => {
      let snippetForm = TestUtils.renderIntoDocument(
        <SnippetForm languages={languages} />
      );

      let errorSnackbar = snippetForm.refs.error;
      errorSnackbar.show = sinon.spy();

      const errorMessage = 'Are you sure you want to publish snippet without code?';
      snippetForm.showError(errorMessage);

      expect(errorSnackbar.show.calledOnce).to.be.true;
      expect(errorSnackbar.props.message).to.be.equal(errorMessage);
    });
  });
});
