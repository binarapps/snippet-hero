import alt from '../libs/alt';
import UserActions from '../actions/user-actions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.state = { currentUser: null };
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

  setUser(user) {
    this.setState({ currentUser: user });
  }

  logout(data) {
    if (data.ok) {
      this.setState({ currentUser: null });
    }
  }

  register(data) {
    if (data.ok) {
      this.setState({ currentUser: data.user });
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
