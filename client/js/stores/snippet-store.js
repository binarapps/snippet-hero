import alt from '../libs/alt';
import SnippetActions from '../actions/snippet-actions';

// TODO create tests
class SnippetStore {
  constructor() {
    this.bindActions(SnippetActions);
    this.snippets = [];
  }

  create(data) {
    if (data.ok) {
      const snippets = this.snippets;

      this.setState({
        snippets: snippets.concat(data.snippet)
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(SnippetStore, 'SnippetStore');
