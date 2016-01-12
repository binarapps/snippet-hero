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

  getSnippetRatings (snippet_id) {
    axios.get('/snippets/' + snippet_id + '/avg')
      .then(res => this.dispatch({ok: true, avg: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getUserSnippetRating (snippet_id, user_id) {
    axios.get('/snippets/' + snippet_id + '/users/' + user_id)
      .then(res => this.dispatch({ok: true, ratings: res.data, userId: user_id, snippetId: snippet_id}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getCurrentUserRating (snippet_id) {
    axios.get('/snippets/' + snippet_id + '/user')
    .then(res => this.dispatch({ ok: true, grade: res.data }))
    .catch(err => this.dispatch({ ok: false, error: err}));
  }
}
export default alt.createActions(RatingActions);
