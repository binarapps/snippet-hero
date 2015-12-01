import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';

import SnippetActions from '../actions/snippet-actions.js';

// TODO create tests
export default class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', description: '', language: 0, hasErrors: false};

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
  handleContentChange(e) {
    this.setState({content: e.target.value, hasErrors: e.target.value === 0});
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
      this.setState({hasErrors: true});
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

        <TextField
          floatingLabelText="Enter snippet code:"
          value={this.state.content}
          onChange={this.handleContentChange}
          fullWidth={true}
          multiLine={true}
          rows={8}
          type="text"
          errorText={this.state.hasErrors ? 'Snippet without code? That doesnt make sense.' : ''}
        />

        <TextField
          floatingLabelText="Enter snippet description (optional):"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          fullWidth={true}
          multiLine={true}
          rows={2}
          type="text"
        />

        <RaisedButton label="Publish!" secondary={true} type="submit" />

      </form>
    );
  }
}
