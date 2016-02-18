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
    this.state = this.getPropsFromStores();
    this._onChange = this._onChange.bind(this);
    this.getSnippet = this.getSnippet.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.getSnippet();
  }

  getSnippet(){
    let foundSnippet = [];
    let snippetId = this.props.params.id;
    let currentUserId = this.getCurrentUser().id;
    if(this.state.snippets.length == 0){
      SnippetActions.getOneSnippet(this.props.params.id, currentUserId);
    } else {
      foundSnippet = this.state.snippets.filter(function (el){
        return el.id == snippetId;
      }); 
      if(foundSnippet.length == 0){
        SnippetActions.getOneSnippet(this.props.params.id, currentUserId);
      } 
    }
  }

  getCurrentUser(){
    return UserStore.state.currentUser;
  }

  getPropsFromStores() {
    return SnippetStore.getState();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getPropsFromStores(nextProps, this.context));
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  _onChange() {
    this.setState(this.getPropsFromStores(this.state, this.context));
  }

  render() {
    let s = this.state;
    let snippets = s.snippets;
    let foundSnippets = [];
    let snippetId = this.props.params.id;
    foundSnippets = snippets.filter(function (el){
      return el.id == snippetId;
    });

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
                <h2 style={{textAlign: 'center', fontWeight: 'normal'}}>
                  Please wait until we load the snippet you are looking for.
                </h2>
              );
            }
          })()}
      </div>
      </PageWrapper>
    );
  }
}
