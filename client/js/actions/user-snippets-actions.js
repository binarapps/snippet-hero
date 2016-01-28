import axios from 'axios';
import alt from '../libs/alt';
import FlashMessages from './flash-messages-actions';

class UserSnippetsActions {
  constructor(){}

  getPaginatedUserSnippets(page, perPage){
    var start = (perPage*(page-1));
    axios.get('/snippets/user?results='+ perPage +'&start='+ start)
      .then(res => this.dispatch({ok: true, results: res.data}))
      .catch(err => this.dispatch({ok: false, error: err}));
  }

  getCount(){
    axios.get('/snippets/user/count')
      .then(res => this.dispatch({ok: true, count: res.data.count}))
      .catch(err => this.dispatch({ok: false, error: err}));
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
