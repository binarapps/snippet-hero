import alt from '../libs/alt';
import _ from 'lodash';
import SnippetActions from '../actions/snippet-actions';

// TODO create tests
class SnippetStore {
  constructor() {
    this.bindActions(SnippetActions);
    this.state = {
      snippets: [],
      lastCreateSuccess: false,
      snippetCreated: false
    };
  }

  getAll (data) {
    if (data.ok) {
      const snippets = this.state.snippets;

      this.setState({
        snippets: snippets.concat(data.snippets)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }

  create() {
    this.setState({
      snippetCreated: false
    });
    this.preventDefault();
  }

  onCreateSuccess(data) {
    const snippets = this.state.snippets;

    this.setState({
      snippets: snippets.concat(data.snippet),
      snippetCreated: true,
      lastCreateSuccess: true
    });
  }

  onCreateFail() {
    this.setState({
      snippetCreated: true,
      lastCreateSuccess: false
    });
  }

  commentSnippet(data) {
    // const comments = this.state.comments;
    if (data.ok) {
      let snippet = _.findWhere(this.state.snippets, { id: data.comment.SnippetId });
      snippet.comments.unshift(data.comment);
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
