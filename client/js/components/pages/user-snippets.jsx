import React from 'react';
import PageWrapper from '../page-wrapper';
import UserList from '../snippets/user-list';
import UserSnippetsActions from '../../actions/user-snippets-actions';
import UserSnippetsStore from '../../stores/user-snippets-store';

export default class UserSnippets extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(UserSnippetsActions.listen(this._onChange));
    UserSnippetsActions.getAllOfCurrentUser();
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

  render() {
    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>Your snippets:</h2>
        <div style={{clear: 'right'}}>
          {(() => {
            if(this.state.currentUserSnippets.length > 0){
              return (
                <UserList snippets={this.state.currentUserSnippets}/>
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
