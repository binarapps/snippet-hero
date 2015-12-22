import alt from '../libs/alt';
import SnippetActions from '../actions/snippet-actions';

class SnippetSearchStore {
  constructor() {
    this.state = { value: '', snippets: [] };

    this.bindListeners({
      onSearch: SnippetActions.SEARCH
    });
  }

  onSearch(data) {
    if (data.ok) {
      this.setState({
        snippets: data.snippets
      });
      // this.emitChange();
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}

export default alt.createStore(SnippetSearchStore, 'SnippetSearchStore');
