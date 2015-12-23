import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import Snackbar from 'material-ui/lib/snackbar';
import Codemirror from 'react-codemirror';
import {modeFromMime} from '../../libs/languages';


// TODO create tests
export default class SnippetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {mode: '', mime: ''};

    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleContentChange = this._handleContentChange.bind(this);
    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }
  _handleNameChange(e) {
    this.props.onChange({name: e.target.value});
  }
  _handleContentChange(code) {
    this.props.onChange({content: code});
  }
  _handleDescriptionChange(e) {
    this.props.onChange({description: e.target.value});
  }
  _handleLanguageChange(e) {
    const mime = e.target.value;
    this.setState({
      mime: mime,
      mode: modeFromMime(mime)
    });
    this.props.onChange({language: mime});
  }
  showError() {
    // TODO change message
    this.refs.error.show();
  }
  render() {
    let codeOptions = {readOnly: false, mode: this.state.mode, mime: this.state.mime, lineNumbers: true};
    return (
      <form className="snippet-form">
        <div>
          <TextField
            hintText="Title"
            floatingLabelText="Enter snippet titile (optional):"
            value={this.props.name}
            onChange={this._handleNameChange}
            type="text"
          />
        </div>

        <div>
          <SelectField
            floatingLabelText="Programming language"
            value={this.props.language}
            valueMember="mime"
            displayMember="label"
            menuItems={this.props.languages}
            onChange={this._handleLanguageChange}
          />
        </div>

        <Codemirror ref="editor" value={this.props.content} onChange={this._handleContentChange} options={codeOptions} />

        <TextField
          floatingLabelText="Enter snippet description (optional):"
          value={this.props.description}
          onChange={this._handleDescriptionChange}
          fullWidth={true}
          multiLine={true}
          rows={2}
          type="text"
        />

        <Snackbar
          ref="error"
          message="Are you sure you want to publish snippet without code?"
          autoHideDuration={3000}
        />
      </form>
    );
  }
}
