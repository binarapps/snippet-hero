/*eslint-disable no-unused-vars*/
import React from 'react';
import SnippetStore from './stores/snippet-store';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import SnippetForm from './components/snippet-form.jsx';

main();

function main () {
  const app = document.createElement('div');
  document.body.appendChild(app);
  // ReactDOM.render(<div>Hello world!</div>, app);
  ReactDOM.render(
    <SnippetForm languages={[{value: 0, label: '---'}, {value: 1, label: 'JavaScript'}]}/>,
    app
  );
}
