import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class SnippetActions {
  getAll() {
    axios.get('/snippets')
      .then(res => this.dispatch({ok: true, snippets: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  create(snippet) {
    this.dispatch();
    axios.post('/snippets', snippet)
      .then(res => this.actions.onCreateSuccess(res))
      .catch(res => this.actions.onCreateFail(res));
  }

  onCreateSuccess(res) {
    this.dispatch({snippet: res.data});
  }

  onCreateFail() {
    this.dispatch();
  }
}
export default alt.createActions(SnippetActions);
