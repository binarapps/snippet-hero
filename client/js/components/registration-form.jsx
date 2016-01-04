import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import UserActions from '../actions/user-actions';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this._onRequestClose = this._onRequestClose.bind(this);
    this._onSignUpRequest = this._onSignUpRequest.bind(this);
  }

  _onRequestClose() {
    this.refs.dialog.setState({open: true});
  }

  _onSignUpRequest() {
    var password = this.refs.passwordInput.getValue();
    var userData = { email: this.refs.emailInput.getValue(),
                     password: password,
                     name: this.refs.nameInput.getValue()
                   };
    UserActions.register(userData);
  }

  render() {
    return (
      <Dialog ref="dialog" defaultOpen={true} onRequestClose={this._onRequestClose}>
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
