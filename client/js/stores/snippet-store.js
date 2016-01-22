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
      currentUserSnippets: [],
      lastCreateSuccess: false,
      snippetCreated: false,
      snippetsAvg: {},
      usersRatings: {}
    };
  }

  getAll (data) {
    if (data.ok) {
      const {snippets} = this.state;

      this.setState({
        snippets: snippets.concat(data.snippets)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }

  getAllOfCurrentUser (data){
    if (data.ok) {
      this.setState({
        currentUserSnippets: data.snippets
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
    const {snippets} = this.state;

    this.setState({
      snippets: snippets.concat(data.snippet),
      snippetCreated: true,
      lastCreateSuccess: true
    });
  }

  onCreateFail() {
    this.setState({
      snippetCreated: true,
      lastCreateSuccess: false
    });
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

  getUserSnippetRating (data) {
    if (data.ok) {
      var user = data.userId;
      var snippet = data.snippetId;
      var ratings = data.ratings;
      var userRate = this.state.usersRatings;

      if(user != null && snippet != null){
        userRate[user][snippet] = ratings;
      }

      this.setState({
        usersRatings: userRate
      });
    }
  }

  getCurrentUserRating (data) {
    if (data.ok) {
      var user_id = data.grade.user;
      var snippet_id = data.grade.snippet;
      var grade = data.grade.rate;
      var userRate = this.state.usersRatings;

      if (user_id != null) {
        var snippet_rating = {};
        if (userRate[user_id]){
          snippet_rating = userRate[user_id];
        }
        snippet_rating[snippet_id] = grade;
        userRate[user_id] = snippet_rating;

        this.setState({
          usersRatings: userRate
        });
      }
    }
  }

  destroySnippet (data) {
    if (data.ok){
      var oldSnippets = this.state.snippets;
      var oldUserSnippets = this.state.currentUserSnippets;

      oldSnippets.forEach(function (snippet) {
        if(snippet.id == data.res){
          var indexOfSnippet = oldSnippets.indexOf(snippet);
          oldSnippets.splice(indexOfSnippet, 1);
        }
      });

      oldUserSnippets.forEach(function (userSnippet) {
        if(userSnippet.id == data.res){
          var indexOfUserSnippet = oldUserSnippets.indexOf(userSnippet);
          oldUserSnippets.splice(indexOfUserSnippet, 1);
        }
      });

      this.setState({
        snippets: oldSnippets,
        currentUserSnippets: oldUserSnippets
      });
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
