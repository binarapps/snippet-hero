import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';

class UserSnippetsActions {
  constructor(){}

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

  getAllComments(snippetId) {
    axios.get('/snippets/' + snippetId + '/comments')
      .then(res => this.dispatch({ok: true, comments: res.data, snippetId: snippetId}))
      .catch(err => this.dispatch({ok: false, error: err}));
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
export default alt.createActions(UserSnippetsActions);
