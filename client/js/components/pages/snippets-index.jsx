import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this._openSnippetDialog = this._openSnippetDialog.bind(this);
  }

  _openSnippetDialog () {
    this.dialog.open();
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

    return (
      <PageWrapper style={{padding: 0}}>
        <RaisedButton onClick={this._openSnippetDialog} label="Add new snippet" primary={true} />
        <SnippetsList></SnippetsList>
        <SnippetFormDialog ref={(ref) => this.dialog = ref} defaultOpen={false} languages={languages} />
      </PageWrapper>
    );
  }
}
