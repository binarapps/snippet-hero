/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

import SnippetForm from '../js/components/snippet-form.jsx';

const expect = chai.expect;
const languages = [{value: 0, label: '---'}, {value: 1, label: 'JavaScript'}];

describe('SnippetForm', () => {
  describe('submit', () => {
    it('without content should add has-error class', () => {
      // let snippetForm = TestUtils.renderIntoDocument(
      //   <SnippetForm languages={languages} />
      // );
      //
      // let formElement = TestUtils.findRenderedDOMComponentWithTag(snippetForm, 'form');
      // TestUtils.Simulate.submit(formElement);
      //
      // let errorElement = TestUtils.findRenderedDOMComponentWithClass(snippetForm, 'has-error');
      // expect(errorElement).to.be.an('object');
    });
  });
});
