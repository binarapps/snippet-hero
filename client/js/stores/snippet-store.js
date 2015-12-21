import alt from '../libs/alt';
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
}

export default alt.createStore(SnippetStore, 'SnippetStore');
