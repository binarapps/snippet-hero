import alt from '../libs/alt';
import update from 'react-addons-update';
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
    const snippets = this.state.snippets.slice(0);
    if (data.ok) {
      let snippetIndex = _.findIndex(snippets, 'id', data.comment.SnippetId);
      let snippet = _.pullAt(snippets, snippetIndex)[0];
      let newSnippet = update(snippet, {comments: {$unshift: [data.comment]}});
      this.setState({
        snippets: snippets.concat(newSnippet)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
