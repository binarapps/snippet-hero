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
      current: null
    };
  }

  getPaginatedSnippets(data) {
    if(data.ok){
      const pageSnippets = data.results.snippets;
      const count = data.results.count;
      const currentUserId = data.currentUser.id;

      let user = data.results.userId ? data.results.userId : null;
      let snippetsAverage = this.state.snippetsAvg;
      let usersRatings = this.state.usersRatings;
      let snippetRating = {};

      pageSnippets.forEach(function (snippet) {
        snippetsAverage[snippet.id] = snippet.avg;

        let curentUserRating = snippet.ratings.filter(function(rating){
          return rating.UserId == currentUserId;
        });

        if(curentUserRating.length){
          let rating = curentUserRating[0];

          if(usersRatings[currentUserId] !== undefined){
            snippetRating = usersRatings[currentUserId];
          }
          snippetRating[rating.SnippetId] = rating.value;
          usersRatings[currentUserId] = snippetRating;
        }
      });

      this.setState({
        snippets: pageSnippets,
        totalCount: count,
        current: user,
        snippetsAvg: snippetsAverage,
        usersRatings: usersRatings
      });
    }
  }

  create() {
    this.setState({
      snippetCreated: false
    });
    this.preventDefault();
  }

  createRating(data) {
    if (data.ok) {
      const ratings = this.state.ratings;
      const createdRating = data.rating.rating;
      var snippetsAverage = this.state.snippetsAvg;
      snippetsAverage[createdRating.SnippetId] = data.rating.avg;

      var allRatings = this.state.usersRatings;
      var userRating = allRatings[createdRating.UserId];
      userRating[createdRating.SnippetId] = createdRating.value;
      allRatings[createdRating.UserId] = userRating;

      this.setState({
        ratings: ratings.concat(createdRating),
        snippetsAvg: snippetsAverage,
        usersRatings: allRatings
      });
    } else {
      // TODO
    }
  }

  onCreateSuccess(data) {
    const newSnippets = update(this.state.snippets, { $unshift: [data.snippet] });
    const counter = this.state.totalCount;

    this.setState({
      snippets: newSnippets,
      totalCount: counter+1
    });
  }

  onCreateFail() {
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
      let newSnippets;
      let indexOfSnippet = _.findIndex(snippets, _.find(snippets, { id: data.snippetId }));
      newSnippets = update(snippets, { $splice: [[indexOfSnippet, 1]] });

      this.setState({
        snippets: newSnippets
      });
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
