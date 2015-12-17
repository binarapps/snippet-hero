import alt from '../libs/alt';
import SnippetSearchSource from '../sources/snippet-search-source';
import SnippetActions from '../actions/snippet-actions';

class SnippetSearchStore {
  constructor() {
    this.state = { value: '', snippets: [] };

    this.registerAsync(SnippetSearchSource);
    this.bindListeners({
      onSearch: SnippetActions.SEARCH,
      onReceivedResults: SnippetActions.RECEIVED_RESULTS
    });
  }

  onSearch(name) {
    this.setState({
      value: name
    });
    if (!this.getInstance().isLoading()) {
      this.getInstance().performSearch();
    }
    this.preventDefault();
  }

  onReceivedResults(data) {
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
