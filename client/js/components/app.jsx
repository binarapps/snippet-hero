import React from 'react';
import Navbar from './navbar';
import UserStore from '../stores/user-store';
import FlashMessages from './flash-messages';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { currentUser: UserStore.getState().currentUser };

    this._onChange = this._onChange.bind(this);

    this.historyListtenerWasAttached = false;

    UserStore.listen(this._onChange);
    setTimeout(() => { this._onChange(); });
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  componentWillReceiveProps() {
    if(!this.historyListtenerWasAttached && this.props.history) {
      this.props.history.listen(this._onChange);
      this.historyListtenerWasAttached = true;
    }
  }

  _onChange() {
    this.setState({ currentUser: UserStore.getState().currentUser });
    setTimeout(() => {
      var currentPath = this.props.location.pathname;
      var currentParamPath = this.props.routes[1].path;

      if(!this.state.currentUser && currentPath != '/login' && currentPath != '/register' && currentPath != '/snippets' && currentParamPath != '/snippets/:id') {
        this.props.history.pushState(null, '/snippets');
      } else if(this.state.currentUser && (currentPath === '/login' || currentPath === '/register')) {
        this.props.history.pushState(null, '/');
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar history={this.props.history} currentUser={this.state.currentUser}/>
        {this.props.children}
        <FlashMessages />
      </div>
    );
  }
}
