import axios from 'axios';
import alt from '../libs/alt';

class UserActions {

  login(userData) {
    axios.post('/users/login', userData)
      .then(res => this.dispatch({ ok: true, user: res.data.user }))
      .catch(err => this.dispatch({ ok: false, error: err }));
  }

  logout() {
    axios.delete('/users/logout')
      .then(() => { this.dispatch({ ok: true }); })
      .catch(() => { this.dispatch({ ok: false }); });
  }

  register(userData) {
    axios.post('users/register', userData)
      .then(res => this.dispatch({ ok: true, user: res.data.user }))
      .catch(err => this.dispatch({ ok: false, error: err }));
  }
}
export default alt.createActions(UserActions);
