import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class DashboardActions {
  getDashboardFeed () {
    axios.get('/dashboard')
    .then(res => this.dispatch({ ok: true, feed: res.data }));
  }
}
export default alt.createActions(DashboardActions);
