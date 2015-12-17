import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class UserActions {

  login(userData) {
    axios.post('/users/login', userData)
      .then(res => this.dispatch({ ok: true, user: res.data.user }))
      .catch(err => this.dispatch({ ok: false, error: err }));
  }

  logout() {
    axios.delete('/users/logout')
      .then(res => this.dispatch({ ok: true }))
      .catch(err => this.dispatch({ ok: false }));
  }
}
export default alt.createActions(UserActions);
