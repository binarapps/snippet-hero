import alt from '../libs/alt';
import UserActions from '../actions/user-actions';

// TODO create tests
class UserStore {
  constructor() {
    this.state = { currentUser: [] };

    this.bindListeners({
      login: UserActions.LOGIN,
      logout: UserActions.LOGOUT
    });
  }

  login(data) {
    if (data.ok) {
      this.setState({ currentUser: data.user });
    }
  }

  logout(data) {
    if (data.ok) {
      this.setState({ currentUser: false });
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
