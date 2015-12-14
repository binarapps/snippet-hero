import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dialogOpen: false};
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];
    let items = [{
      name: 'test',
      content: 'content',
      description: 'description',
      language: 'javascript'
    }];

    return (
      <PageWrapper>
        <RaisedButton onClick={ () => this.setState({dialogOpen: true})} label="Add new snippet" primary={true} ref='button' />
        <SnippetsList items={items}></SnippetsList>
        <SnippetFormDialog ref={(ref) => this.snippetDialog = ref}
                           dialogOpen={this.state.dialogOpen}
                           languages={languages}
                           handleCancel={() => this.setState({dialogOpen: false})} />
      </PageWrapper>
    );
  }
}
