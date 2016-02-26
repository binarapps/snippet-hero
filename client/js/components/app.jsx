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
    setTimeout(() => { 
      console.log('timeout');
      this._onChange();
    });
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  componentWillReceiveProps() {
    console.log('WILL RECEIVE PROPS')
    // if(!this.historyListtenerWasAttached && this.props.history) {
    //   this.props.history.listen(this._onChange);
    //   this.historyListtenerWasAttached = true;
    // }
  }

  _onChange() {
    console.log('app on change');
    this.setState({ currentUser: UserStore.getState().currentUser });
    setTimeout(() => {
      var currentPath = this.props.location.pathname;
      var currentParamPath = this.props.routes[1].path;

      if(!this.state.currentUser && currentPath != '/login' && currentPath != '/register' && currentParamPath != '/snippets/:id') {
        this.props.history.pushState(null, '/snippets');
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
