import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/lib/raised-button';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import SnippetStore from '../../stores/snippet-store';
import SnippetActions from '../../actions/snippet-actions';

class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dialogOpen: false};
  }

  static getStores() {
    return [SnippetStore];
  }

  static getPropsFromStores() {
    return SnippetStore.getState();
  }

  componentDidMount () {
    SnippetActions.getAll();
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

    return (
      <PageWrapper>
        <RaisedButton onClick={ () => this.setState({dialogOpen: true})} label="Add new snippet" primary={true} ref='button' />
        <SnippetsList items={this.props.snippets}></SnippetsList>
        <SnippetFormDialog ref={(ref) => this.snippetDialog = ref}
                           dialogOpen={this.state.dialogOpen}
                           languages={languages}
                           handleCancel={() => this.setState({dialogOpen: false})} />
      </PageWrapper>
    );
  }
}

export default connectToStores(SnippetsIndex);
