import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class UserActions {

  login(userData) {
    axios.post('/users/login', userData)
      .then(res => this.dispatch({ok: true, user: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }
}
export default alt.createActions(UserActions);
