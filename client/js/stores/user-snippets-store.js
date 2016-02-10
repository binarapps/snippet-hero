import alt from '../libs/alt';
import update from 'react-addons-update';
import _ from 'lodash';
import UserSnippetsActions from '../actions/user-snippets-actions';
import RatingActions from '../actions/rating-actions';

class UserSnippetsStore {
  constructor(){
    this.bindActions(UserSnippetsActions);
    this.bindActions(RatingActions);
    this.state = {
      currentUserSnippets: [],
      snippetsAvg: {},
      totalCount: 0
    };
  }

  getPaginatedUserSnippets(data) {
    if(data.ok){
      const pageSnippets = data.results.snippets;
      const count = data.results.count;

      this.setState({
        currentUserSnippets: pageSnippets,
        totalCount: count
      });
    }
  }

  getAllComments(data) {
    const {currentUserSnippets} = this.state;
    if (data.ok) {
      let snippetIndex = _.findIndex(currentUserSnippets, 'id', data.snippetId);
      let newSnippets = update(currentUserSnippets, {[snippetIndex]: {comments: {$unshift: data.comments}}});
      this.setState({
        currentUserSnippets: newSnippets
      });
    }
  }

  getSnippetRatings (data) {
    if (data.ok) {
      var snippetsAverage = this.state.snippetsAvg;
      const snippetId = data.avg.snippetId;
      const avarage = data.avg.avg;

      snippetsAverage[snippetId] = avarage;

      this.setState({
        snippetsAvg: snippetsAverage
      });
    }
  }

  destroySnippet (data) {
    if (data.ok) {
      var oldUserSnippets = this.state.currentUserSnippets;

      oldUserSnippets.forEach(function (userSnippet) {
        if(userSnippet.id == data.res){
          var indexOfUserSnippet = oldUserSnippets.indexOf(userSnippet);
          oldUserSnippets.splice(indexOfUserSnippet, 1);
        }
      });

      this.setState({
        currentUserSnippets: oldUserSnippets
      });
    }
  }
}
export default alt.createStore(UserSnippetsStore, 'UserSnippetsStore');
