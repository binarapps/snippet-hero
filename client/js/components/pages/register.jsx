import React from 'react';
import RegistrationForm from '../registration-form';

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<RegistrationForm {...this.props} />);
  }
}

export default Register;
