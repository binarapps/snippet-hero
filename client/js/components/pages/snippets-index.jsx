import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SearchBar from '../search-bar';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import SnippetSearchStore from '../../stores/snippet-search-store';
import UserStore from '../../stores/user-store';
import Paginator from './paginator';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._searchSnippets = this._searchSnippets.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._goToPage = this._goToPage.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.storeListeners.push(SnippetSearchStore.listen(this._onSearch));
    this._getPaginatedSnippets(1);
  }

  _getPaginatedSnippets(page){
    SnippetActions.getPaginatedSnippets(page, this.props.route.perPage, this.getCurrentUser());

    this.setState({
      currentPage: page
    });
  }

  getCurrentUser(){
    return UserStore.state.currentUser;
  }

  _goToPage(page){
    var perPage = this.props.route.perPage;
    var allPages = Math.ceil(this.state.totalCount/perPage);

    if(page>0 && page <= allPages){
      this._getPaginatedSnippets(page);
    }
  }

  getPropsFromStores() {
    return SnippetStore.getState();
  }

  getPropsFromSearchStore() {
    return SnippetSearchStore.getState();
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

  _onSearch() {
    this.setState(this.getPropsFromSearchStore(this.state, this.context));
  }

  _searchSnippets (value) {
    SnippetActions.search(value);
  }

  render() {
    let s = this.state;
    let perPage = this.props.route.perPage;

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>All snippets:</h2>
        <SearchBar label='Search by name:' onSearch={this._searchSnippets} />
        <div style={{clear: 'right'}}>
          {(() => {
            if(s.snippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={s.snippets} page={s.currentPage} perPage={perPage}/>
                  <Paginator
                    perPage={perPage}
                    totalCount={s.totalCount}
                    currentPage={s.currentPage}
                    onClickPage={(page) => this._goToPage(page)}/>
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
