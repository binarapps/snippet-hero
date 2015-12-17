import React from 'react';
import Navbar from './navbar';
import UserStore from '../stores/user-store';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { currentUser: UserStore.state.currentUser };

    this._onChange = this._onChange.bind(this);
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState({ currentUser: UserStore.state.currentUser });

    if(!this.state.currentUser && this.props.location.pathname != '/login') {
      this.props.history.pushState(null, '/login')
    } else if(this.state.currentUser && this.props.location.pathname === '/login') {
      this.props.history.pushState(null, '/')
    }
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
      </div>
    );
  }
}
