import React from 'react';
import LoginForm from '../login-form';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<LoginForm {...this.props} />);
  }
}

export default Login;
