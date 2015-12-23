import React from 'react';
import AltContainer from 'alt/AltContainer.js';
import RaisedButton from 'material-ui/lib/raised-button';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import SnippetStore from '../../stores/snippet-store';
import SnippetActions from '../../actions/snippet-actions';
import {langs} from '../../libs/languages';

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
        <RaisedButton onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>
        <AltContainer store={SnippetStore}>
          <SnippetsList />
        </AltContainer>
        <SnippetFormDialog
          languages={langs}
          ref="dialog" />
      </PageWrapper>
    );
  }
}

export default SnippetsIndex;
