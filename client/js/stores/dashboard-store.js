import alt from '../libs/alt';
import update from 'react-addons-update';
import _ from 'lodash';
import DashboardActions from '../actions/dashboard-actions';
import RatingActions from '../actions/rating-actions';

// TODO create tests
class DashboardStore {
  constructor() {
    this.bindActions(DashboardActions);
    this.bindActions(RatingActions);
    this.state = {
      thisMonthSnippetsCount: null,
      lastComments: [],
      lastSnippets: [],
      bestSnippets: []
    };
  }

  getDashboardFeed (data) {
    if (data.ok) {
      this.setState({
        thisMonthSnippetsCount: data.feed.count,
        lastComments: data.feed.comments,
        lastSnippets: data.feed.snippets,
        bestSnippets: data.feed.bestSnippets
      });
    }
  }

  createRating(data) {
    if (data.ok) {
      const createdRating = data.rating.rating;
      const snippetId = createdRating.SnippetId;
      const {bestSnippets} = this.state;
      let snippetIndex = _.findIndex(bestSnippets, 'id', snippetId);
      if(snippetIndex >= 0){
        let newSnippets = update(bestSnippets, {[snippetIndex]: {$merge: {avg: data.rating.avg, currentUserRating: data.rating.rating.value}}});
        this.setState({
          bestSnippets: newSnippets
        });
      }
    } 
  }
}

export default alt.createStore(DashboardStore, 'DashboardStore');
