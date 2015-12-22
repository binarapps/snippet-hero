import alt from '../libs/alt';
import RatingActions from '../actions/rating-actions';

// TODO create tests
class RatingStore {
  constructor() {
    this.bindActions(RatingActions);
    this.state = {
      ratings: [],
      snippetsAvg: {}
    };
  }

  getAll (data) {
    if (data.ok) {
      const ratings = this.state.ratings;

      this.setState({
        ratings: ratings.concat(data.ratings)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }

  create(data) {
    if (data.ok) {
      const ratings = this.state.ratings;

      this.setState({
        ratings: ratings.concat(data.rating)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
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
      if(sum == 0.0){
        snippetsAverage[data.snippetId] = sum.toFixed(2);
      }
      else{
        snippetsAverage[data.snippetId] = ( sum/index ).toFixed(2);
      }

      this.setState({
        snippetsAvg: snippetsAverage
      });
    }
  }
}

export default alt.createStore(RatingStore, 'RatingStore');
