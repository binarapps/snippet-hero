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
    if(!this.currentUser) {
      return (
        <div>
          <RegistrationForm />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar history={this.props.history}/>
          <div className="page-wrapper" style={{padding: '20px 10px'}}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}
