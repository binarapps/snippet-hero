import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';

class ProfileActions {
  constructor() {}

  getProfile(userId) {
    axios.get('/profiles/' + userId)
      .then((res) => {
        FlashMessages.pushMessage({ content: 'Here are all the stats!' });
        this.dispatch({ ok: true, profile: res.data });
      }).catch((err) => {
        FlashMessages.pushMessage({ content: err.data});
        this.dispatch({ ok: false, error: err });
      });
  }
}
export default alt.createActions(ProfileActions);
