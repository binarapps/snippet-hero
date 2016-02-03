import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';
import {buildUrl} from '../libs/paginate';

// TODO create tests
class SnippetActions {
  constructor() {}

  getPaginatedSnippets(page, perPage){
    axios.get('/snippets?'+ buildUrl(perPage, page))
      .then(res => this.dispatch({ok: true, results: res.data}));
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
      .catch(() => this.actions.onCreateFail());
  }

  countSnippetAverage(snippetId, avg, userRating){
    this.dispatch({snippetId: snippetId, avarage: avg, userRate: userRating});
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
