import React from 'react';
import Navbar from './navbar';
import UserStore from '../stores/user-store';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { currentUser: UserStore.state.currentUser };

    this._onChange = this._onChange.bind(this);

    this.historyListtenerWasAttached = false;
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

  _onChange(data, locationData) {
    this.setState({ currentUser: UserStore.state.currentUser });

    if(locationData && locationData.location) {
      var newPath = locationData.location.pathname;
    } else {
      var newPath = '/'
    }

    if(!this.state.currentUser && newPath != '/login') {
      this.props.history.pushState(null, '/login')
    } else if(this.state.currentUser && newPath === '/login') {
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
