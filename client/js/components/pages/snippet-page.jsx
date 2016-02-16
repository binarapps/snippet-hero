import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SearchBar from '../search-bar';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import SnippetSearchStore from '../../stores/snippet-search-store';
import UserStore from '../../stores/user-store';

export default class SnippetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));

  }

  // getSnippets(){
  //   let foundSnippet = {};
  //   let snippetId = this.props.params.id;
  //   if(this.state.snippets.length == 0){
  //     SnippetActions.getOneSnippet(this.props.params.id);
  //   } 
  //   foundSnippet = this.state.snippets.filter(function (el){
  //     return el.id == snippetId;
  //   });
  //   if (foundSnippet.length > 0) {
  //     this.setState({
  //       foundSnippet: foundSnippet
  //     });
  //   } else{
  //     SnippetActions.getOneSnippet(this.props.params.id);
  //   }
  // }

  getCurrentUser(){
    return UserStore.state.currentUser;
  }

  getPropsFromStores() {
    return SnippetStore.getState();
  }

  // componentWillUpdate() {
  //   setTimeout(function(){
  //     this.getSnippets();
  //   }, 1000);
  // }

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
    let snippets = {};

    if(s.snippets.length == 0){
      SnippetActions.getOneSnippet(this.props.params.id);
    } else {
      foundSnippet = s.snippets.filter(function (el){
        return el.id == this.props.params.id;
      });
      if (foundSnippet.length > 0){
        snippets = foundSnippet;
      } else {
        SnippetActions.getOneSnippet(this.props.params.id);
      }
    }

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>All snippets:</h2>
        <SearchBar label='Search by name:' onSearch={this._searchSnippets} />
        <div style={{clear: 'right'}}>
          {(() => {
            if(snippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={snippets} history={this.props.history}/>
                </div>
              );
            } else {
              return (
                <h2 style={{textAlign: 'center', fontWeight: 'normal'}}>
                  Sorry, there are no snippets to display at this time.
                </h2>
              );
            }
          })()}
      </div>
      </PageWrapper>
    );
  }
}
