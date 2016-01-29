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

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this._deleteSnippet = this._deleteSnippet.bind(this);
  }

  _deleteSnippet() {
    SnippetActions.destroySnippet(this.props.id);
  } 

  getCurrentUser(){
    return UserStore.state.currentUser;
  }

  checkRatingAbility() {
    let today = Date.now();
    let dateCreated = Date.parse(this.props.createdAt);
    let enabled = false;

    if(Math.ceil((today-dateCreated) / (1000*3600*24))<30){
      let currentUser = this.getCurrentUser();
      if(currentUser && this.props.user){
        if(currentUser.id != this.props.user.id){
          enabled = true;
        }
      }
    }
    return enabled;
  }

  checkOwner() {
    let currentUser = this.getCurrentUser();
    if(currentUser && this.props.user){
      return currentUser.id === this.props.user.id;
    } else {
      return false;
    }
  }

  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;

    let currentUser = this.getCurrentUser();

    let author = (this.props.user ? this.props.user.name : (currentUser ? currentUser.name : 'author') );
    let enabled = this.checkRatingAbility();

    const ratings = this.props.id ? <RatingForm key={this.props.id} snippetId={this.props.id} snippet={this.props} style={{right: 0, margin: '10px'}} enabled={enabled}/>: '';

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}>
          {this.props.user ? this.props.user.name.split('')[0].toUpperCase() : (currentUser ? currentUser.name.split('')[0].toUpperCase() : '')}
        </Avatar>);

    let deleteButton = (<div style={{display: 'table', background: Colors.grey100, width: '100%'}}>
      <RaisedButton style={{float: 'right', margin: '0 10px 5px 0'}} onClick={this._deleteSnippet} label='Delete snippet' primary={true} />
    </div>);

    return (
      <Card style={style}>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <CardHeader
            title={this.props.name || 'No title'}
            subtitle= {author}
            avatar={avatar} />
          <div>
            {ratings}
          </div>
        </div>
        {this.checkOwner() ? deleteButton : ''}
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}
