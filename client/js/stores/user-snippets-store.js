import alt from '../libs/alt';
import update from 'react-addons-update';
import _ from 'lodash';
import SnippetActions from '../actions/snippet-actions';
import RatingActions from '../actions/rating-actions';

class UserSnippetsStore {
  constructor(){
    this.bindActions(SnippetActions);
    this.bindActions(RatingActions);
    this.state = {
      currentUserSnippets: [],
      snippetsAvg: {}
    };
  }

  getAllOfCurrentUser (data){
    if (data.ok) {
      this.setState({
        currentUserSnippets: data.snippets
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
      const snippet_id = data.avg.snippetId;
      const avarage = data.avg.avg;

      snippetsAverage[snippet_id] = avarage;

      this.setState({
        snippetsAvg: snippetsAverage
      });
    }
  }

  destroyUserSnippet (data) {
    if (data.ok){
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
