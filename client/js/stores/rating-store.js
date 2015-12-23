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
      const createdRating = data.rating.data;
      // // Counting new rating average for snippet
      // var snippetsAverage = this.state.snippetsAvg;
      // var old_avg = this.state.snippetsAvg[createdRating.SnippetId];
      // var index = 0;
      // var new_avg = 0.0;

      // // // if there was no avg, then new avg equals new rating value. if there was, we need to count ratings for snippet
      // if(old_avg != null && old_avg != 0.0){
      //   ratings.forEach(function (rate) {
      //     if(rate.SnippetId == createdRating.SnippetId){
      //       index++;
      //     }
      //   });
      //   if(index != 0){
      //     new_avg = ((old_avg + createdRating.value)/(index+1)).toFixed(2);
      //   }
      // } else {
      //   new_avg = (createdRating.value).toFixed(2);
      // }
      // console.log(ratings);
      // console.log(new_avg);
      // // snippetsAverage[createdRating.SnippetId] = new_avg;
      // // end counting new avarage

      this.setState({
        ratings: ratings.concat(createdRating)
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
      var ratings = dara.ratings;
      var userRate = this.state.usersRatings;

      if(user != null && snippet != null){
        // TODO: get last rating, not all of them
        userRate[user][snippet] = ratings;
      }

      this.setState({
        usersRatings: userRate
      });
    }
  }
}

export default alt.createStore(RatingStore, 'RatingStore');
