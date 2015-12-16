import alt from '../libs/alt';
import UserActions from '../actions/user-actions';

// TODO create tests
class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.currentUser = [];
  }

  login(data) {
    if (data.ok) {
      const snippets = this.snippets;

      this.setState({
        currentUser: data.user
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
