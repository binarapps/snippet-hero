import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SearchBar from '../search-bar';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import SnippetSearchStore from '../../stores/snippet-search-store';
import UserStore from '../../stores/user-store';
import MonthPaginator from './month-paginator';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._searchSnippets = this._searchSnippets.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._goToMonth = this._goToMonth.bind(this);
    this._sortSnippets = this._sortSnippets.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.storeListeners.push(SnippetSearchStore.listen(this._onSearch));
    let today = new Date();
    this._goToMonth(today.getMonth(), today.getFullYear());
    this.setState({selectedSort: ''});
  }

  getCurrentUser(){
    return UserStore.getState().currentUser;
  }

  _goToMonth(month, year){
    SnippetActions.getMonthSnippets(month, year);
    this.setState({
      currentMonth: month,
      currentYear: year
    });
  }

  _sortSnippets(event, index, value){
    this.setState({selectedSort: value.sort});
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
    let snippets = s.snippets;
    let current = (<div><h3 style={{textAlign: 'center', fontWeight: 'normal'}}>Currently displaying: {s.currentYear}</h3></div>);
    let title = this.getCurrentUser() ? 'All snippets: ' : 'All public snippets: ';
    let subtitle = this.getCurrentUser() ? '' : 'Log in to see all snippets';
    let menuItems = ([
      {name: 'avg', sort: 'avg'},
      {name: 'date', sort: 'date'}
    ]);

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', marginBottom: '5px'}}>{title}</h2>
        <h3 style={{fontSize: '12px', marginBottom: '20px', marginTop: '0px'}}>{subtitle}</h3>
        <SearchBar label='Search by name:' onSearch={this._searchSnippets} />
        <SelectField
          value={this.state.selectedSort}
          onChange={this._sortSnippets}
          floatingLabelText="Sort snippets"
          menuItems={menuItems}
          valueMember="sort"
          displayMember="name"/>

        <div style={{clear: 'right'}}>
          {(() => {
            if(snippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={snippets} history={this.props.history}/>
                  <MonthPaginator
                    currentMonth={s.currentMonth}
                    currentYear={s.currentYear}
                    onClickYear={(year) => this._goToMonth(s.currentMonth, year)}
                    onClickMonth={(month, year) => this._goToMonth(month, year)}/>
                  {current}
                </div>
              );
            } else {
              return (
                <div>
                  <h2 style={{textAlign: 'center', fontWeight: 'normal'}}>
                    Sorry, there are no snippets to display at this time.
                  </h2>
                  <br />
                  <MonthPaginator
                    currentMonth={s.currentMonth}
                    currentYear={s.currentYear}
                    onClickYear={(year) => this._goToMonth(s.currentMonth, year)}
                    onClickMonth={(month, year) => this._goToMonth(month, year)}/>
                  {current}
                </div>
              );
            }
          })()}
      </div>
      </PageWrapper>
    );
  }
}
