import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/lib/raised-button';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import SnippetStore from '../../stores/snippet-store';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dialogOpen: false, items: []};
  }

  componentDidMount () {
    axios.get('/snippets').then((res) => {
      this.setState({
        items: res.data
      });
    });
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

    return (
      <PageWrapper>
        <RaisedButton onClick={ () => this.setState({dialogOpen: true})} label="Add new snippet" primary={true} ref='button' />
        <SnippetsList items={this.state.items}></SnippetsList>
        <SnippetFormDialog ref={(ref) => this.snippetDialog = ref}
                           dialogOpen={this.state.dialogOpen}
                           languages={languages}
                           handleCancel={() => this.setState({dialogOpen: false})} />
      </PageWrapper>
    );
  }
}
