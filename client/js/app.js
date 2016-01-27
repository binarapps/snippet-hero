/*eslint-disable no-unused-vars*/
import React from 'react';
import { Router, Route } from 'react-router';
/*eslint-enable no-unused-vars*/
import ReactTapPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import App from './components/app';
import SnippetsIndex from './components/pages/snippets-index';
import Logout from './components/pages/logout';
import Login from './components/pages/login';
import Register from './components/pages/register';
import createHistory from 'history/lib/createHashHistory';
import UserSnippets from './components/pages/user-snippets';

main();

function main () {
  // it is neccessary to proper work with material ui
  ReactTapPlugin();

  const app = document.createElement('div');

  document.body.appendChild(app);

  const history = createHistory({ queryKey: false });

  ReactDOM.render(
    <Router history={history}>
      <Route path="/" component={App} >

        <Route path="/snippets" component={SnippetsIndex} perPage={2}/>
        <Route path="/snippets/user" component={UserSnippets}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Route>
    </Router>,
    app
  );
}
