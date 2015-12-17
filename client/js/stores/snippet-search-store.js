import alt from '../libs/alt';
import SnippetSearchSource from '../sources/snippet-search-source';
import SnippetActions from '../actions/snippet-actions';

class SnippetSearchStore {
  constructor() {
    this.state = { value: '', snippets: [] };

    this.registerAsync(SnippetSearchSource);
    this.bindListeners({
      onSearch: SnippetActions.ON_SEARCH
    });
  }

  onSearch(name) {
    this.setState({
      value: name
    });
    if (!this.getInstance().isLoading()) {
      this.getInstance().performSearch();
    }
  }

  receivedResults(data) {
    if (data.ok) {
      this.setState({
        snippets: data.snippets
      });
    } else {
      // TODO react to errors
      // console.log(data.error.message)
    }
  }
}


export default alt.createStore(SnippetSearchStore, 'SnippetSearchStore');
