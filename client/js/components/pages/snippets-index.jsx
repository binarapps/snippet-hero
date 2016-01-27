import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SearchBar from '../search-bar';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import SnippetSearchStore from '../../stores/snippet-search-store';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._searchSnippets = this._searchSnippets.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.storeListeners.push(SnippetSearchStore.listen(this._onSearch));
    this._getPaginatedSnippets(1);
    this.setState({
      currentPage: 1
    });
    SnippetActions.getCount();
  }

  _getPaginatedSnippets(page){
    SnippetActions.getPaginatedSnippets(page, this.props.route.perPage);

    this.setState({
      currentPage: page
    });
  }

  _onClickNext(e){
    e.preventDefault();
    var perPage = this.props.route.perPage;
    var next = this.state.currentPage + 1;
    var all = Math.ceil(this.state.totalCount/perPage);

    if(next < all){
      this._getPaginatedSnippets(next);
      this.setState({
        currentPage: next
      });
    }
  }

  _goToPage(page, e){
    e.preventDefault();

    this._getPaginatedSnippets(page);
    this.setState({
      currentPage: page
    });
  }

  _onClickPrev(e){
    e.preventDefault();
    var prev = this.state.currentPage - 1;

    if(prev > 1){
      this._getPaginatedSnippets(prev);
      this.setState({
        currentPage: prev
      });
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
    let allPages = Math.ceil(s.totalCount/perPage);
    let pagesArray = Array.apply(null, Array(allPages)).map(function (x, i) { return i+1; });

    const pages = pagesArray.map((page) => {
      if(page ===  s.currentPage){
        return (<li key={page} className={'active'}>
            <a onClick={this._goToPage.bind(this, page)}>{page}</a>
          </li>
        );
      } else {
        return (<li key={page} className={''}>
            <a onClick={this._goToPage.bind(this, page)}>{page}</a>
          </li>
        );
      }
    });

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>All snippets:</h2>
        <SearchBar label='Search by name:' onSearch={this._searchSnippets} />
        <div style={{clear: 'right'}}>
          {(() => {
            if(s.snippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={s.snippets}/>
                  <nav className={'paginate-nav'}>
                    <ul className={'pagination'}>
                      <li className={s.currentPage === 1 ? 'disabled' : ''}>
                        <a disabled={s.currentPage === 1} onClick={this._onClickPrev}>
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only">Prev</span>
                        </a>
                      </li>
                      {pages}
                      <li className={s.currentPage === allPages ? 'disabled' : ''}>
                        <a disabled={s.currentPage === allPages} onClick={this._onClickNext}>
                          <span className="sr-only">Next</span>
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
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
