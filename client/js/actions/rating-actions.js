import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class RatingActions {
  constructor() {
  }

  createRating(rating) {
    axios.post('/ratings', rating)
      .then(res =>  this.dispatch({ok: true, rating: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }
}
export default alt.createActions(RatingActions);
