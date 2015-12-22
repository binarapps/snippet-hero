import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class RatingActions {
  constructor() {
    // this.generateActions(
    //   'create'
    // );
  }
  getAll () {
    axios.get('/ratings')
      .then(res => this.dispatch({ok: true, ratings: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  create(rating) {
    this.dispatch();
    axios.post('/ratings', rating)
      .then(res => this.actions.onCreateSuccess(res))
      .catch(res => this.actions.onCreateFail(res));
  }

  getSnippetRatings (snippet_id) {
    axios.get('/snippets/' + snippet_id + '/ratings')
      .then(res => this.dispatch({ok: true, ratings: res.data, snippetId: snippet_id}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  onCreateSuccess(res) {
    this.dispatch({rating: res.data});
  }

  onCreateFail() {
    this.dispatch();
  }
}
export default alt.createActions(RatingActions);
