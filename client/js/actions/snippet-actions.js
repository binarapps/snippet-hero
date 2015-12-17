import axios from 'axios';
import alt from '../libs/alt';

// TODO create tests
class SnippetActions {
  constructor() {
    // this.generateActions(
    //   'create'
    // );
  }

  getAll() {
    return axios.get('/snippets')
      .then(res => this.dispatch({ok: true, snippets: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  // search(name) {
  //   axios.get('/snippets/search?name=' + name)
  //     .then(res => this.dispatch({ok: true, snippets: res.data}))
  //     .catch(err => this.dispatch({ok: false, error: err}));
  // }

  search(name) {
    this.dispatch(name);
  }

  receivedResults(response) {
    this.dispatch({ok: true, snippets: response.data});
  }

  fetchingResultsFailed() {
    console.log('failed receivedResults');
  }

  create(snippet) {
    return axios.post('/snippets', snippet)
      .then(res => this.dispatch({ok: true, snippet: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }
}
export default alt.createActions(SnippetActions);
