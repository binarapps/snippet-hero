import alt from '../libs/alt';
import DashboardActions from '../actions/dashboard-actions';

// TODO create tests
class DashboardStore {
  constructor() {
    this.bindActions(DashboardActions);
    this.state = {
      thisMonthSnippetsCount: null,
      lastComments: [],
      lastSnippets: []
    };
  }

  getDashboardFeed (data) {
    if (data.ok) {
      this.setState({
        thisMonthSnippetsCount: data.feed.count,
        lastComments: data.feed.comments,
        lastSnippets: data.feed.snippets
      });
    }
  }
}

export default alt.createStore(DashboardStore, 'DashboardStore');
