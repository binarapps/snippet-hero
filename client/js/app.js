/*eslint-disable no-unused-vars*/
import React from 'react';
import SnippetStore from './stores/snippet-store';
/*eslint-enable no-unused-vars*/
import ReactTapPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import SnippetForm from './components/snippet-form.jsx';

main();

function main () {
  // it is neccessary to proper work with material ui
  ReactTapPlugin();

  const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];
  const app = document.createElement('div');

  document.body.appendChild(app);
  ReactDOM.render(
    <SnippetForm languages={languages} />,
    app
  );
}
