import alt from '../libs/alt';
import UserActions from '../actions/user-actions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.state = { currentUser: false };
  }

  login(data) {
    if (data.ok) {
      this.setState({ currentUser: data.user });
    }
  }

  fetchCurrent(data) {
    if (data.ok) {
      this.setState({ currentUser: data.user });
    }
  }

  logout(data) {
    if (data.ok) {
      this.setState({ currentUser: false });
    }
  }

  register(data) {
    if (data.ok) {
      this.setState({ currentUser: data.user });
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
