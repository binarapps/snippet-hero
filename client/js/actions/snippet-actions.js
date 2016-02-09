import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';
import {buildUrl} from '../libs/paginate';

// TODO create tests
class SnippetActions {
  constructor() {}

  getPaginatedSnippets(page, perPage, currentUser){
    axios.get('/snippets?'+ buildUrl(perPage, page))
      .then(res => this.dispatch({ok: true, results: res.data, currentUser: currentUser}))
      .catch(err => this.dispatch({ok: false, error: err}));
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
      .then(res => {
        FlashMessages.pushMessage({ content: 'Comment added!' });
        this.dispatch({ok: true, comment: res.data});
      }).catch(res => {
        FlashMessages.pushMessage({ content: 'Something went wrong. Could not comment that snippet :(' });
        this.dispatch({ok: false, comment: res.data});
      });
  }

  create(snippet) {
    this.dispatch();
    axios.post('/snippets', snippet)
      .then(res => this.actions.onCreateSuccess(res))
      .catch(() => this.actions.onCreateFail());
  }

  onCreateSuccess(res) {
    FlashMessages.pushMessage({ content: 'Snippet created successfuly!' });
    this.dispatch({snippet: res.data});
  }

  onCreateFail() {
    FlashMessages.pushMessage({ content: 'There was an error while creating snippet!' });
    this.dispatch();
  }

  destroySnippet(snippetId) {
    axios.delete('/snippets/' + snippetId)
      .then(() => {
        FlashMessages.pushMessage({ content: 'Successfully deleted snippet!' });
        this.dispatch({ok: true, snippetId: snippetId});
      }).catch(() => {
        FlashMessages.pushMessage({ content: 'Something went wrong. Could not delete that snippet :(' });
        this.dispatch({ok: false});
      });
  }
}
export default alt.createActions(SnippetActions);
