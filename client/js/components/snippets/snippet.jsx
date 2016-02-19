import React from 'react';
import Codemirror from 'react-codemirror';
import Markdown from 'markdown-react-js';
import RatingForm from '../ratings/rating-form';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/gfm/gfm';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import {generateColor} from '../mixins/color-generate';
import {modeFromMime} from '../../libs/languages';
import UserStore from '../../stores/user-store';
import SnippetActions from '../../actions/snippet-actions.js';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false, name: props.name, description: props.description, content: props.content};
    this._deleteSnippet = this._deleteSnippet.bind(this);
    this._getUserProfile = this._getUserProfile.bind(this);
    this._editSnippet = this._editSnippet.bind(this);
    this._updateSnippet = this._updateSnippet.bind(this);
    this._getShowSnippet = this._getShowSnippet.bind(this);
    this._getEditableSnippet = this._getEditableSnippet.bind(this);
  }

  _editSnippet() {
    this.setState({isEditing: true});
  }

  _updateSnippet() {
    let data = {
      description: this.refs.description.getValue(),
      name: this.refs.name.getValue(),
      content: this.refs.editor.codeMirror.doc.getValue(),
      id: this.props.id
    };
    SnippetActions.update(data);
    this.setState({isEditing: false});
  }

  _deleteSnippet() {
    let confirmed = confirm('Are you sure?');
    if (!confirmed) return;
    SnippetActions.destroySnippet(this.props.id);
  }

  _getUserProfile(){
    let userId = (this.props.user ? this.props.user.id : this.getCurrentUser().id);
    this.props.history.pushState(null, '/users/'+userId);
  }

  getCurrentUser() {
    return UserStore.getState().currentUser;
  }

  _checkRatingAbility() {
    let today = new Date(Date.now());
    let dateCreated = new Date(Date.parse(this.props.createdAt));
    let currentUser = this.getCurrentUser();

    if (today.getFullYear() == dateCreated.getFullYear() && today.getMonth() == dateCreated.getMonth()) {
      if (currentUser && currentUser.id != this.props.user.id) {
        return true;
      }
    }
    return false;
  }

  checkOwner() {
    let currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser.id === this.props.user.id;
    } else {
      return false;
    }
  }

  _getEditableSnippet() {
    let codeOptions = {readOnly: false, mode: modeFromMime(this.props.language), mime: this.props.language, lineNumbers: true};
    let { style } = this.props;
    return (
      <Card style={style}>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <CardText>
            <TextField
              hintText="Title"
              floatingLabelText="Snippet titile (optional):"
              defaultValue={this.props.name}
              ref="name"
              type="text" />
          </CardText>
        </div>
        <div style={{display: 'table', background: Colors.grey100, width: '100%'}}>
          <RaisedButton style={{float: 'right', margin: '0 10px 5px 0'}} onClick={this._updateSnippet} label='Update' secondary={true} />
          <RaisedButton style={{float: 'right', margin: '0 10px 5px 0'}} onClick={this._deleteSnippet} label='Delete' primary={true} />
        </div>
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror
            ref="editor"
            value={this.state.content}
            options={codeOptions}
            className="code-editor" />
        </div>
        <CardText className="snippet-description" >
          <TextField
            floatingLabelText="Snippet description (optional - markdown allowed):"
            defaultValue={this.props.description}
            fullWidth={true}
            multiLine={true}
            rows={2}
            ref="description"
            type="text" />
        </CardText>
      </Card>
    );
  }

  _getShowSnippet() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;
    let currentUser = this.getCurrentUser();
    let author = this.props.user || currentUser;
    let authorName = (author && author.name) || 'author';
    let snippetActions = (
      <div style={{display: 'table', background: Colors.grey100, width: '100%'}}>
        <RaisedButton style={{float: 'right', margin: '0 10px 5px 0'}} onClick={this._editSnippet} label='Edit' secondary={true} />
        <RaisedButton style={{float: 'right', margin: '0 10px 5px 0'}} onClick={this._deleteSnippet} label='Delete' primary={true} />
      </div>
    );
    let ratings = this.props.id ? <RatingForm key={this.props.id} snippetId={this.props.id} snippet={this.props} style={{right: 0, margin: '10px'}} enabled={this._checkRatingAbility()}/>: '';

    let avatar = (
      <Avatar
        color={generateColor()}
        backgroundColor={generateColor()}
        onClick={this._getUserProfile}
        style={{cursor: 'pointer'}}
        title={('Click to see more ' + authorName + ' snippets')}>
        {authorName.split('')[0].toUpperCase()}
      </Avatar>
    );

    return (
      <Card style={style}>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <CardHeader
            title={this.props.name || 'No title'}
            subtitle= {authorName}
            avatar={avatar} />
          { (() => {
            if (this.props.withRatings) {
              return (
                <div>
                  {ratings}
                </div>
              );
            }
          })()}

        </div>
        {this.checkOwner() ? snippetActions : ''}
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        <CardText className="snippet-description" >
          {this.props.description ? <Markdown text={this.props.description} className="markdown" /> : null}
        </CardText>
      </Card>
    );
  }

  render() {
    return this.state.isEditing ? this._getEditableSnippet() : this._getShowSnippet();
  }
}
