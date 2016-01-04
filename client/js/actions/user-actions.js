import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';

class UserActions {

  login(userData) {
    axios.post('/users/login', userData)
      .then((res) => {
        FlashMessages.pushMessage({ content: 'Successfully logged in!' });
        this.dispatch({ ok: true, user: res.data.user });
      }).catch((err) => {
        FlashMessages.pushMessage({ content: err.data });
        this.dispatch({ ok: false, error: err });
      });
  }

  logout() {
    axios.delete('/users/logout')
      .then(() => {
        FlashMessages.pushMessage({ content: 'Successfully logged out!' });
        this.dispatch({ ok: true });
      }).catch(() => {
        this.dispatch({ ok: false });
      });
  }

  register(userData) {
    axios.post('users/register', userData)
      .then((res) => {
        FlashMessages.pushMessage({ content: 'Successfully registered!' });
        this.dispatch({ ok: true, user: res.data.user });
      }).catch((err) => {
        FlashMessages.pushMessage({ content: err.data });
        this.dispatch({ ok: false, error: err });
      });
  }
}
export default alt.createActions(UserActions);
