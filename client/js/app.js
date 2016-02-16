/*eslint-disable no-unused-vars*/
import React from 'react';
import { Router, Route } from 'react-router';
/*eslint-enable no-unused-vars*/
import ReactTapPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
import App from './components/app';
import UserActions from './actions/user-actions';
import SnippetsIndex from './components/pages/snippets-index';
import Logout from './components/pages/logout';
import Login from './components/pages/login';
import Register from './components/pages/register';
import UserSnippets from './components/pages/user-snippets';
import Dashboard from './components/pages/dashboard';
import SnippetPage from './components/pages/snippet-page';

window.main = function (options) {
  // it is neccessary to proper work with material ui
  ReactTapPlugin();

  const app = document.createElement('div');

  document.body.appendChild(app);
  UserActions.setUser(options.currentUser);

  const history = createHistory({ queryKey: false });

  ReactDOM.render(
    <Router history={history}>
      <Route path="" component={App}>
        <Route path="/" component={Dashboard}/>
        <Route path="/snippets" component={SnippetsIndex} perPage={10}/>
        <Route path="/snippets/user" component={UserSnippets} perPage={10}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/snippets/:id" component={SnippetPage}/>
      </Route>
    </Router>,
    app
  );
};
