import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FlatButton from 'material-ui/lib/flat-button';
import Snippet from './snippet';
import SnippetForm from './snippet-form';
import SnippetActions from '../../actions/snippet-actions.js';

// TODO create tests
export default class SnippetFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', description: '', language: 0, open: this.props.dialogOpen};

    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleFormChange(value) {
    this.setState(value);
  }

  _resetForm() {
    this.setState({name: '', content: '', description: '', language: 0, open: false});
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

    this._resetForm();
  }

  open() {
    this._resetForm();
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  render() {
    let actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        ref="cancel"
        onTouchTap={ () => this.close() } />,
      <FlatButton
        label="Submit"
        ref="submit"
        primary={true}
        onTouchTap={this._handleSubmit} />
    ];
    return (
      <Dialog 
        title={this.props.title || 'Snippet Form'}
        actions={actions}
        defaultOpen={this.props.defaultOpen}
        autoScrollBodyContent={true}
        ref="dialog"
        open={this.state.open}>
        <Tabs>
          <Tab label="Form">
            <SnippetForm {...this.state} languages={this.props.languages} onChange={this._handleFormChange} ref="form" />
          </Tab>
          <Tab label="Preview">
            <Snippet {...this.state} />
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}
