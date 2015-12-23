import React from 'react';
import AltContainer from 'alt/AltContainer.js';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetStore from '../../stores/snippet-store';
import SnippetActions from '../../actions/snippet-actions';

class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    SnippetActions.getAll();
  }

  render() {
    return (
      <PageWrapper>
        <AltContainer store={SnippetStore}>
          <SnippetsList />
        </AltContainer>
      </PageWrapper>
    );
  }
}

export default SnippetsIndex;
