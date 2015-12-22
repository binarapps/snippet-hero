import alt from '../libs/alt';
import SnippetActions from '../actions/snippet-actions';

class SnippetCommentsStore {
  constructor() {
    this.state = { comments: [] };

    this.bindListeners({
      onGetAll: SnippetActions.GET_ALL_COMMENTS,
      onComment: SnippetActions.COMMENT_SNIPPET
    });
  }

  onGetAll(data) {
    const comments = this.state.comments;
    if (data.ok) {
      this.setState({
        comments: comments.concat(data.comments)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }

  onComment(data) {
    const comments = this.state.comments;
    if (data.ok) {
      this.setState({
        comments: comments.concat(data.comment)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(SnippetCommentsStore, 'SnippetCommentsStore');
