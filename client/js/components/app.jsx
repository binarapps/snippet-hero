import React from 'react';
import Navbar from './navbar';
import RegistrationForm from './registration-form';
import UserStore from '../stores/user-store';

export default class App extends React.Component {


  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({currentUser: UserStore.currentUser});
  }

  render() {
    let menuItems = [
      { route: '/', text: 'Dashboard' },
      { route: 'snippets', text: 'All snippets' }
    ];

    if(!this.currentUser) {
      return (
        <div>
          <RegistrationForm />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar history={this.props.history} menuItems={menuItems}/>
          {this.props.children}
        </div>
      );
    }
  }
}
