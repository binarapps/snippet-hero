import alt from '../libs/alt';
import RatingActions from '../actions/rating-actions';

// TODO create tests
class RatingStore {
  constructor() {
    this.bindActions(RatingActions);
    this.state = {
      ratings: [],
      snippetsAvg: {},
      usersRatings: {}
    };
  }

  getAll (data) {
    if (data.ok) {
      const ratings = this.state.ratings;
      const createdRating = data.rating.data;
      this.setState({
        ratings: ratings.concat(createdRating)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }


  create(data) {
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


  getSnippetRatings (data) {
    if (data.ok) {
      var snippetsAverage = this.state.snippetsAvg;
      var sum = 0.0;
      var index = 0;
      data.ratings.forEach(function (rating) {
        sum += rating.value;
        index++;
      });
      if(sum == 0.0 || index == 0) {
        snippetsAverage[data.snippetId] = sum.toFixed(2);
      } else {
        snippetsAverage[data.snippetId] = ( sum/index ).toFixed(2);
      }

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
}

export default alt.createStore(RatingStore, 'RatingStore');
