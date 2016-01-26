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

  getAll() {
    axios.get('/snippets')
      .then(res => {
        this.dispatch({ok: true, snippets: res.data});
      }).catch(err => {
        FlashMessages.pushMessage({ content: 'Oops! Something went wrong :(' });
        this.dispatch({ok: false, error: err});
      });
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
    FlashMessages.pushMessage({ content: 'Snippet created successfully!' });
    this.dispatch({snippet: res.data});
  }

  onCreateFail() {
    FlashMessages.pushMessage({ content: 'There was an error while creating snippet.' });
    this.dispatch();
  }

  update(data) {
    this.dispatch();
    axios.put('/snippets/' + data.id, data)
      .then(res => this.actions.onUpdateSuccess(res))
      .catch(res => this.actions.onUpdateFail(res));
  }

  onUpdateSuccess(res) {
    FlashMessages.pushMessage({ content: 'Snippet updated successfully!' });
    this.dispatch({snippet: res.data});
  }

  onUpdateFail() {
    FlashMessages.pushMessage({ content: 'There was an error while updating snippet.' });
    this.dispatch();
  }

  destroySnippet(snippetId) {
    axios.delete('/snippets/' + snippetId)
      .then(res => {
        FlashMessages.pushMessage({ content: 'Successfully deleted snippet!' });
        this.dispatch({ok: true, snippetId: snippetId});
      }).catch(() => {
        FlashMessages.pushMessage({ content: 'Something went wrong. Could not delete that snippet :(' });
        this.dispatch({ok: false});
      });
  }
}
export default alt.createActions(SnippetActions);
