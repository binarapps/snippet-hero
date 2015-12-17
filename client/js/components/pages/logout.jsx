import React from 'react';
import UserActions from '../../actions/user-actions';

class Logout extends React.Component {

  componentDidMount() {
    UserActions.logout();
  }

  render() {
    return (<div></div>);
  }
}

export default Logout;
