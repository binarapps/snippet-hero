import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import Checkbox from 'material-ui/lib/checkbox';
import Snackbar from 'material-ui/lib/snackbar';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Codemirror from 'react-codemirror';
import Colors from 'material-ui/lib/styles/colors';
import {modeFromMime} from '../../libs/languages';
import ActionLock from 'material-ui/lib/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/lib/svg-icons/action/lock-open';


// TODO create tests
export default class SnippetForm extends React.Component {
  constructor(props) {
    super(props);


    this._handleCheckboxChange = this._handleCheckboxChange.bind(this);
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleContentChange = this._handleContentChange.bind(this);
    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }

  _handleCheckboxChange(e) {
    this.props.onChange({isPublic: !e.target.checked});
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
    this.props.onChange({language: mime});
  }
  showError() {
    // TODO change message
    this.refs.error.show();
  }
  render() {
    let codeOptions = {readOnly: false, mode: modeFromMime(this.props.language), mime: this.props.language, lineNumbers: true};
    return (
      <Card>
        <form className="snippet-form">
          <CardText>
            <TextField
              hintText="Title"
              floatingLabelText="Enter snippet titile (optional):"
              value={this.props.name}
              onChange={this._handleNameChange}
              type="text"
            />
          </CardText>

          <CardText>
            <SelectField
              floatingLabelText="Programming language"
              value={this.props.language}
              valueMember="mime"
              displayMember="label"
              menuItems={this.props.languages}
              onChange={this._handleLanguageChange}
            />
          </CardText>

          <CardText>
            <Checkbox
              checkedIcon={<ActionLock />}
              unCheckedIcon={<ActionLockOpen />}
              style={{block: {maxWidth: 250}}}
              label="Make Private?"
              onCheck={this._handleCheckboxChange}
               />
          </CardText>

          <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
            <Codemirror
              ref="editor"
              value={this.props.content}
              onChange={this._handleContentChange}
              options={codeOptions}
              className="code-editor"
            />
          </div>

          <CardText>
            <TextField
              floatingLabelText="Enter snippet description (optional - markdown allowed):"
              value={this.props.description}
              onChange={this._handleDescriptionChange}
              fullWidth={true}
              multiLine={true}
              rows={2}
              type="text"
            />
          </CardText>

          <Snackbar
            ref="error"
            message="Are you sure you want to publish snippet without code?"
            autoHideDuration={3000}
          />
        </form>
      </Card>
    );
  }
}
