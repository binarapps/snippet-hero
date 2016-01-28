import React from 'react';
import PageWrapper from '../page-wrapper';
import UserList from '../snippets/user-list';
import UserSnippetsActions from '../../actions/user-snippets-actions';
import UserSnippetsStore from '../../stores/user-snippets-store';
import Paginator from './paginator';

export default class UserSnippets extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._onChange = this._onChange.bind(this);
    this._goToPage = this._goToPage.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(UserSnippetsStore.listen(this._onChange));
    this._getPaginatedSnippets(1);
    UserSnippetsActions.getCount();
    this.setState({
      currentPage: 1
    });
  }

  getPropsFromStores() {
    return UserSnippetsStore.getState();
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

  _getPaginatedSnippets(page){
    UserSnippetsActions.getPaginatedUserSnippets(page, this.props.route.perPage);

    this.setState({
      currentPage: page
    });
  }

  _goToPage(page){
    var perPage = this.props.route.perPage;
    var allPages = Math.ceil(this.state.totalCount/perPage);

    if(page>0 && page <= allPages){
      this._getPaginatedSnippets(page);
      this.setState({
        currentPage: page
      });
    }
  }

  render() {

    let s = this.state;
    let perPage = this.props.route.perPage;

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>Your snippets:</h2>
        <div style={{clear: 'right'}}>
          {(() => {
            if(this.state.currentUserSnippets.length > 0){
              return (
                <div>
                  <UserList snippets={this.state.currentUserSnippets} page={s.currentPage} perPage={perPage}/>
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
