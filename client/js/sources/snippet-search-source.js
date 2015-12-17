import SnippetActions from '../actions/snippet-actions';
import axios from 'axios';

const SearchSource = {
  performSearch: {
    remote(state) {
      return axios.get('/snippets/search?name=' + state.value);
    },

    success: SnippetActions.receivedResults,
    error: SnippetActions.fetchingResultsFailed,

    shouldFetch() {
      return true
    }
  }
};

export default SearchSource;
