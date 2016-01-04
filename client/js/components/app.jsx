import React from 'react';
import Navbar from './navbar';
import UserStore from '../stores/user-store';
import UserActions from '../actions/user-actions';
import FlashMessages from './flash-messages';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { currentUser: UserStore.state.currentUser };

    this._onChange = this._onChange.bind(this);

    this.historyListtenerWasAttached = false;

    UserActions.fetchCurrent();
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
    this.setState({ currentUser: UserStore.state.currentUser });
    setTimeout(() => {
      var currentPath = this.props.location.pathname;

      if(!this.state.currentUser && currentPath != '/login' && currentPath != '/register') {
        this.props.history.pushState(null, '/login');
      } else if(this.state.currentUser && (currentPath === '/login' || currentPath === '/register')) {
        this.props.history.pushState(null, '/');
      }
    });
  }

  render() {
    let menuItems = [
      { route: '/', text: 'Dashboard' },
      { route: '/snippets', text: 'All snippets' },
      { route: '/logout', text: 'Sign Out' }
    ];

    return (
      <div>
        <Navbar history={this.props.history} menuItems={menuItems}/>
        {this.props.children}
        <FlashMessages />
      </div>
    );
  }
}
