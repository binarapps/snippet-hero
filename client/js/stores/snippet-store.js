import alt from '../libs/alt';
import update from 'react-addons-update';
import _ from 'lodash';
import SnippetActions from '../actions/snippet-actions';
import RatingActions from '../actions/rating-actions';

// TODO create tests
class SnippetStore {
  constructor() {
    this.bindActions(SnippetActions);
    this.bindActions(RatingActions);
    this.state = {
      snippets: []
    };
  }

  getMonthSnippets(data) {
    if (data.ok) {
      const monthSnippets = data.results.snippets;
      this.setState({
        snippets: monthSnippets
      });
    }
  }

  sortSnippets(data) {
    if(data.ok){
      let sortMethod = data.sortMethod;
      const {snippets} = this.state;
      let newSnippets = _.extend([], snippets);
      if(sortMethod == 'date'){
        newSnippets.sort( function(a,b) {
          var aDate = new Date(a.createdAt).getTime();
          var bDate = new Date(b.createdAt).getTime();
          return (bDate > aDate) ? 1 : ((aDate > b) ? -1 : 0);
        }); 
      } else {
        newSnippets.sort(function(a,b) {
          return (b.avg > a.avg) ? 1 : ((a.avg > b.avg) ? -1 : 0);
        });
      }
      this.setState({
        snippets: newSnippets
      });
    }
  }

  getSnippet(data){
    if(data.ok){
      const addedSnippet = data.snippet;
      let snippets = this.state.snippets;
      0 == snippets.filter(s => s.id === addedSnippet.id).length ? this.setState({ snippets: snippets.concat(addedSnippet)}) : null;
    }
  }

  createRating(data) {
    if (data.ok) {
      const createdRating = data.rating.rating;
      const snippetId = createdRating.SnippetId;
      const {snippets} = this.state;
      let snippetIndex = _.findIndex(snippets, 'id', snippetId);
      if(snippetIndex >= 0){
        let newSnippets = update(snippets, {[snippetIndex]: {$merge: {avg: data.rating.avg, currentUserRating: data.rating.rating.value}}});
        this.setState({
          snippets: newSnippets
        });
      }
    } 
  }

  create(data) {
    if (data.ok) {
      const newSnippets = update(this.state.snippets, { $unshift: [data.snippet] });
      this.setState({
        snippets: newSnippets
      });
    }
  }

  update(data) {
    if (data.ok) {
      const {snippets} = this.state;
      let snippetIndex = _.findIndex(snippets, 'id', data.snippet.id);
      let newSnippets = update(snippets, {[snippetIndex]: {$set: data.snippet}});
      this.setState({
        snippets: newSnippets
      });
    }
  }

  getAllComments(data) {
    const {snippets} = this.state;
    if (data.ok) {
      let snippetIndex = _.findIndex(snippets, 'id', data.snippetId);
      let newSnippets = update(snippets, {[snippetIndex]: {comments: {$set: data.comments}}});
      this.setState({
        snippets: newSnippets
      });
    }
  }

  commentSnippet(data) {
    const {snippets} = this.state;
    if (data.ok) {
      let snippetIndex = _.findIndex(snippets, 'id', data.comment.SnippetId);
      let newSnippets = update(snippets, {[snippetIndex]: {comments: {$unshift: [data.comment]}}});
      this.setState({
        snippets: newSnippets
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }

  destroySnippet (data) {
    if (data.ok){
      let snippets = this.state.snippets;
      let indexOfSnippet = _.findIndex(snippets, _.find(snippets, { id: data.snippetId }));
      let newSnippets = update(snippets, { $splice: [[indexOfSnippet, 1]] });

      this.setState({
        snippets: newSnippets
      });
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
