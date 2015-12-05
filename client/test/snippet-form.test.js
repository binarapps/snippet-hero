/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

// import TextField from 'material-ui/lib/text-field';
import SnippetForm from '../js/components/snippet-form.jsx';

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

      let formElement = TestUtils.findRenderedDOMComponentWithTag(snippetForm, 'form');
      TestUtils.Simulate.submit(formElement);

      expect(errorSnackbar.show.calledOnce).to.be.true;
      expect(errorSnackbar.props.message).to.be.equal('Are you sure you want to omit code section?');
    });
  });
});
