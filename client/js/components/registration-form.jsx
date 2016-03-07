import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import UserActions from '../actions/user-actions';
import FlashMessages from '../actions/flash-messages-actions';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
    this._onRequestClose = this._onRequestClose.bind(this);
    this._onSignUpRequest = this._onSignUpRequest.bind(this);
  }

  _onRequestClose() {
    this.setState({open: true});
  }

  _onSignUpRequest() {
    var formData = { email: this.refs.emailInput.getValue(),
                     password: this.refs.passwordInput.getValue(),
                     repeatPassword: this.refs.repeatPasswordInput.getValue(),
                     name: this.refs.nameInput.getValue()
                   };

    var validationErrors = this._validateForm(formData);

    if(validationErrors.length) {
      FlashMessages.pushMessage({ content: validationErrors.join(', ') });
    } else {
      UserActions.register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
    }
  }

  _validateForm(data) {
    var errors = [];

    var _presentValidator = (field, fieldName) => {
      if(data[field].length === 0) { errors.push(fieldName + ' can\'t be blank'); }
    };

    if(data.password !== data.repeatPassword) {
      errors.push('Repeated password is incorrect');
    }
    _presentValidator('email', 'E-mail');
    _presentValidator('name', 'Name');
    _presentValidator('password', 'Password');
    return errors;
  }

  render() {
    return (
      <Dialog ref="dialog" defaultOpen={true} open={this.state.open} onRequestClose={this._onRequestClose}>
        <form className="registration-form" onSubmit={this._onSignUpRequest}>
          <h1>Sign up</h1>

          <div>
            <TextField
              ref="nameInput"
              floatingLabelText="Name:"
              type="text"
            />
          </div>

          <div>
            <TextField
              ref="emailInput"
              floatingLabelText="E-mail:"
              type="text"
            />
          </div>

          <div>
            <TextField
              ref="passwordInput"
              floatingLabelText="Password"
              type="password"
            />
          </div>

          <div>
            <TextField
              ref="repeatPasswordInput"
              floatingLabelText="Repeat password"
              type="password"
            />
          </div>

          <div>
            <RaisedButton label="Sign up" primary={true} onClick={this._onSignUpRequest} />

            <RaisedButton label="Sign in" href="/login" onClick={() => { this.props.history.pushState(null, '/login'); }} />
          </div>
        </form>
      </Dialog>
    );
  }
}
