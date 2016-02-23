import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SearchBar from '../search-bar';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import UserStore from '../../stores/user-store';

export default class SnippetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {foundSnippet: []};
    this._onChange = this._onChange.bind(this);
    this.getSnippet = this.getSnippet.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.getSnippet();
  }

  getSnippet(){
    let snippetId = this.props.params.id;
    let snippets = SnippetStore.getState().snippets;
    let foundSnippet = snippets.filter(s => s.id == snippetId);

    0 == foundSnippet.length ? SnippetActions.getSnippet(snippetId) : this.setState({ foundSnippet: foundSnippet });
  }

  getCurrentUser(){
    return UserStore.getState().currentUser;
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  _onChange() {
    let snippets = SnippetStore.getState().snippets;
    let snippetId = this.props.params.id;
    let foundSnippet = snippets.filter(s => s.id == snippetId);

    this.setState({ foundSnippet: foundSnippet });
  }

  render() {
    let s = this.state;
    let foundSnippets = s.foundSnippet;
    let snippetId = this.props.params.id;

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>Snippet no. {snippetId}:</h2>
        <SearchBar label='Search by name:' onSearch={this._searchSnippets} />
        <div style={{clear: 'right'}}>
          {(() => {
            if(foundSnippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={foundSnippets} history={this.props.history}/>
                </div>
              );
            } else {
              return (
                <h2 style={{textAlign: 'center', fontWeight: 'normal', paddingTop: '30px'}}>
                  Sorry, didn't find a snippet you were looking for.
                </h2>
              );
            }
          })()}
      </div>
      </PageWrapper>
    );
  }
}
