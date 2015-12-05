import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import Snackbar from 'material-ui/lib/snackbar';
import Codemirror from 'react-codemirror';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/markdown/markdown';

import SnippetActions from '../actions/snippet-actions.js';

// TODO create tests
export default class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', description: '', language: 0};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isValid() {
    return this.state.content.length > 0;
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleContentChange(code) {
    this.setState({content: code});
  }
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }
  handleLanguageChange(e) {
    this.setState({language: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      this.refs.error.show();
      return;
    }
    SnippetActions.create({
      name: this.state.name,
      content: this.state.content,
      description: this.state.description,
      language: this.state.language
    });
  }
  render() {
    let codeOptions = {readOnly: false, mode: 'markdown', lineNumbers: true};
    return (
      <form className="snippet-form" onSubmit={this.handleSubmit}>
        <div>
          <TextField
            hintText="Title"
            floatingLabelText="Enter snippet titile (optional):"
            value={this.state.name}
            onChange={this.handleNameChange}
            type="text"
          />
        </div>

        <div>
          <SelectField
            floatingLabelText="Programming language"
            value={this.state.language}
            valueMember="value"
            displayMember="label"
            menuItems={this.props.languages}
            onChange={this.handleLanguageChange}
          />
        </div>

        <Codemirror ref="editor" value={this.state.content} onChange={this.handleContentChange} options={codeOptions} />

        <TextField
          floatingLabelText="Enter snippet description (optional):"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          fullWidth={true}
          multiLine={true}
          rows={2}
          type="text"
        />

        <Snackbar
          ref="error"
          message="Are you sure you want to omit code section?"
          autoHideDuration={3000}
        />

        <RaisedButton label="Publish!" secondary={true} type="submit" />

      </form>
    );
  }
}
