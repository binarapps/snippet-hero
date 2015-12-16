import React from 'react';
import Navbar from './navbar';
import RegistrationForm from './registration-form';

export default class App extends React.Component {

  render() {
    if(true) {
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
