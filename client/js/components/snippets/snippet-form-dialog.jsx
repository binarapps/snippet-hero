import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FlatButton from 'material-ui/lib/flat-button';
import Snippet from './snippet';
import SnippetForm from './snippet-form';
import SnippetActions from '../../actions/snippet-actions.js';
import SnippetStore from '../../stores/snippet-store.js';
import UserStore from '../../stores/user-store';

// TODO create tests
export default class SnippetFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', description: '', language: 'text/plain', isOpen: props.dialogOpen};
    this.store = SnippetStore;
    this.listener = null;

    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._showSnackbarMessage = this._showSnackbarMessage.bind(this);
  }

  _showSnackbarMessage(msg) {
    this.setState({createMessage: msg});
    this.refs.snackbar.show();
  }

  _handleFormChange(value) {
    this.setState(value);
  }

  _resetForm() {
    this.setState({name: '', content: '', description: '', language: 0});
  }

  _handleSubmit() {
    if (this.state.content.length < 1) {
      this.refs.form.showError();
      return;
    }
    SnippetActions.create({
      name: this.state.name,
      content: this.state.content,
      description: this.state.description,
      language: this.state.language
    });
    this.setState({isOpen:false});
    this._resetForm();
  }

  open () {
    this.setState({isOpen: true});
  }

  close () {
    this.setState({isOpen: false});
  }

  render() {
    let actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        ref="cancel"
        onTouchTap={() => this.setState({isOpen: false})} />,
      <FlatButton
        label="Submit"
        ref="submit"
        primary={true}
        onTouchTap={this._handleSubmit} />
    ];
    return (
      <div>
        <Dialog ref={(ref) => this.dialog = ref}
          title={this.props.title || 'Snippet Form'}
          actions={actions}
          defaultOpen={this.props.defaultOpen}
          autoScrollBodyContent={true}
          open={this.state.isOpen}>

          <Tabs>
            <Tab label="Form">
              <SnippetForm {...this.state} languages={this.props.languages} onChange={this._handleFormChange} ref="form" />
            </Tab>
            <Tab label="Preview">
              <Snippet {...this.state} user={UserStore.getState().currentUser} />
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}
