import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UserActions from '../actions/user-actions';

// TODO create tests
export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this._onRequestClose = this._onRequestClose.bind(this);
    this._onSignInRequest = this._onSignInRequest.bind(this);
  }

  _onRequestClose(button) {
    this.refs.dialog.setState({open: true});
  }

  _onSignInRequest(e) {
    var userData = { email: this.refs.emailInput.getValue(),
                     password: this.refs.passwordInput.getValue() };
    UserActions.login(userData);
  }

  render() {
    return (
      <Dialog ref="dialog" defaultOpen={true} onRequestClose={this._onRequestClose}>
        <form className="registration-form">
          <h1>Sign in</h1>

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
            <RaisedButton label="Sign in" primary={true} onClick={this._onSignInRequest}/>

            <RaisedButton label="Sign up"/>
          </div>
        </form>
      </Dialog>
    );
  }
}
