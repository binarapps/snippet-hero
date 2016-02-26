import alt from '../libs/alt';
import UserActions from '../actions/user-actions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.state = { currentUser: null };
  }

  login(data) {
    console.log('user store login');
    if (data.ok) {
      console.log('user store login data ok');
      this.setState({ currentUser: data.user });
    }
  }

  fetchCurrent(data) {
    console.log('user store fetch current');
    if (data.ok) {
      console.log('user store fetch current data ok');
      this.setState({ currentUser: data.user });
    }
  }

  setUser(user) {
    console.log('user store setUser');
    this.setState({ currentUser: user });
  }

  logout(data) {
    console.log('user store logout');
    if (data.ok) {
      console.log('user store logout data ok');
      this.setState({ currentUser: null });
    }
  }

  register(data) {
    console.log('user store register');
    if (data.ok) {
      console.log('user store register data ok');
      this.setState({ currentUser: data.user });
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
