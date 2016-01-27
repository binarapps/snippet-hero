import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';

// TODO create tests
class SnippetActions {
  constructor() {
    // this.generateActions(
    //   'create'
    // );
  }

  getPaginatedSnippets(page, perPage){
    var start = (perPage*(page-1));
    axios.get('/snippets?results='+ perPage +'&start='+ start)
      .then(res => this.dispatch({ok: true, results: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getCount(){
    axios.get('/snippets/count')
      .then(res => this.dispatch({ok: true, count: res.data.count}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getAllOfCurrentUser() {
    axios.get('/snippets/user')
      .then(res => {
        FlashMessages.pushMessage({ content: 'Here are your own snippets!' });
        this.dispatch({ok: true, snippets: res.data});
      }).catch(err => {
        FlashMessages.pushMessage({ content: 'Oops! Something went wrong :(' });
        this.dispatch({ok: false, error: err});
      });
  }

  search(name) {
    axios.get('/snippets/search', {params: { name: name }})
      .then(res => this.dispatch({ok: true, snippets: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getAllComments(snippetId) {
    axios.get('/snippets/' + snippetId + '/comments')
      .then(res => this.dispatch({ok: true, comments: res.data, snippetId: snippetId}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  commentSnippet(comment, snippetId) {
    axios.post('/snippets/' + snippetId + '/comments', comment)
      .then(res => this.dispatch({ok: true, comment: res.data}))
      .catch(res => this.dispatch({ok: false, comment: res.data}));
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

  destroySnippet(snippet_id) {
    axios.delete('/snippets/' + snippet_id)
      .then(res => {
        FlashMessages.pushMessage({ content: 'Successfully deleted snippet!' });
        this.dispatch({ok: true, res: res.data.snippet});
      }).catch(() => {
        FlashMessages.pushMessage({ content: 'Something went wrong. Could not delete that snippet :(' });
        this.dispatch({ok: false});
      });
  }
}
export default alt.createActions(SnippetActions);
