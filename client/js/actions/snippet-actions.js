// import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class SnippetActions {
  constructor() {
    // this.generateActions(
    //   'create'
    // );
  }
  create(snippet) {
    // axios.post('/snippets', snippet)
    //   .then(res => this.dispatch({ok: true, snippet: res.data}))
    //   .catch(err => this.dispatch({ok: false, error: err}));
    this.dispatch({ok: true, snippet: snippet});
  }
}
export default alt.createActions(SnippetActions);
