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
      snippets: [],
      snippetsAvg: {},
      usersRatings: {},
      totalCount: 0,
      bestSnippets: []
    };
  }

  getPaginatedSnippets(data) {
    if (data.ok) {
      const pageSnippets = data.results.snippets;
      const count = data.results.count;
      const currentUserId = data.currentUser.id;

      let snippetsAverage = this.state.snippetsAvg;
      let usersRatings = this.state.usersRatings;
      let snippetRating = {};

      pageSnippets.forEach(function (snippet) {
        snippetsAverage[snippet.id] = snippet.avg;

        let curentUserRating = snippet.currentUserRating;

        if (usersRatings[currentUserId] !== undefined) {
          snippetRating = usersRatings[currentUserId];
        }
        snippetRating[snippet.id] = curentUserRating;
        usersRatings[currentUserId] = snippetRating;
      });

      this.setState({
        snippets: pageSnippets,
        totalCount: count,
        snippetsAvg: snippetsAverage,
        usersRatings: usersRatings
      });
    }
  }

  getBestSnippets(data) {
    if(data.ok){
      const foundSnippets = data.snippets.snippets;
      const currentUserId = data.currentUserId;
      let currentBest = this.state.bestSnippets;
      let usersRatings = this.state.usersRatings;
      let snippetRating = {};
      //console.log(foundSnippets);


      foundSnippets.forEach(function (snippet) {
        let currentUserRating = snippet.currentUserRating;
        if(usersRatings[currentUserId] !== undefined){
          snippetRating = usersRatings[currentUserId];
        }
        snippetRating[snippet.id] = currentUserRating;
        usersRatings[currentUserId] = snippetRating;
      });

      this.setState({
        bestSnippets: foundSnippets,
        usersRatings: usersRatings
      });
    }
  }

  createRating(data) {
    if (data.ok) {
      const createdRating = data.rating.rating;
      let snippetsAverage = this.state.snippetsAvg;
      snippetsAverage[createdRating.SnippetId] = data.rating.avg;

      let allRatings = this.state.usersRatings;
      let userRating = allRatings[createdRating.UserId];
      userRating[createdRating.SnippetId] = createdRating.value;
      allRatings[createdRating.UserId] = userRating;

      this.setState({
        snippetsAvg: snippetsAverage,
        usersRatings: allRatings
      });
    } 
  }

  create(data) {
    if (data.ok) {
      const newSnippets = update(this.state.snippets, { $unshift: [data.snippet] });
      this.setState({
        snippets: newSnippets,
        totalCount: this.state.totalCount + 1
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
