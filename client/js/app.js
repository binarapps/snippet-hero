/*eslint-disable no-unused-vars*/
import React from 'react';
import { Router, Route } from 'react-router';
/*eslint-enable no-unused-vars*/
import ReactTapPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import App from './components/app';
import SnippetsIndex from './components/snippets-index';


main();

function main () {
  // it is neccessary to proper work with material ui
  ReactTapPlugin();

  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(
    <App/>,
    app
  );

  ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
        <Route path="snippets" component={SnippetsIndex}/>
      </Route>
    </Router>,
    app
  );
}
