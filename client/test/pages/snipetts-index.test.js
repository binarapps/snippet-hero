// /*eslint-disable no-unused-vars*/
// import React from 'react';
// import ReactDOM from 'react-dom';
// /*eslint-enable no-unused-vars*/
// import TestUtils from 'react-addons-test-utils';
// import chai from 'chai';
//
// import SnippetsIndex from '../../js/components/pages/snippets-index';
// import SnippetFormDialog from '../../js/components/snippets/snippet-form-dialog';
//
// const expect = chai.expect;
//
// describe('SnippetsIndex', () => {
//   let snippetsIndex;
//   before(function() {
//     snippetsIndex = TestUtils.renderIntoDocument(
//       <SnippetsIndex snippets={[]}/>
//     );
//   });
//
//   describe('open new snippet dialog', () => {
//     it('should open new snippet dialog on click', () => {
//       const dialog = TestUtils.findRenderedComponentWithType(snippetsIndex, SnippetFormDialog);
//       const button = TestUtils.findRenderedDOMComponentWithClass(snippetsIndex, 'openDialog');
//       expect(dialog.refs.dialog.isOpen()).to.be.false;
//       TestUtils.Simulate.click(button);
//       expect(dialog.refs.dialog.isOpen()).to.be.true;
//     });
//   });
// });
