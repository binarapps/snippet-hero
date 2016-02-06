import React from 'react';
import UserStore from '../../stores/user-store';
import PageWrapper from '../page-wrapper';

export default class Dashboard extends React.Component {

  render() {
    let currentUser = UserStore.getState().currentUser;
    if (currentUser) {
      return (
        <PageWrapper>
          <h2>Hello {currentUser.name}!!!!</h2>
        </PageWrapper>
      );
    } else {
      return (
        <PageWrapper>
          <h2>Hello guest!!!!</h2>
        </PageWrapper>
      );
    }
  }
}
