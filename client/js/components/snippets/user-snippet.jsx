import React from 'react';
import Markdown from 'markdown-react-js';
import UserStore from '../../stores/user-store';
import UserSnippetsActions from '../../actions/user-snippets-actions.js';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/gfm/gfm';
import {generateColor, generateLetter} from '../mixins/color-generate';
import {modeFromMime} from '../../libs/languages';

export default class UserSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: UserStore.state.currentUser };
    this._deleteSnippet = this._deleteSnippet.bind(this);
  }

  _deleteSnippet() {
    UserSnippetsActions.destroySnippet(this.props.id);
  }

  countAverage(){
    var sum = 0.0;
    var index = 0;
    this.props.ratings.forEach(function (rate) {
      sum += rate.value;
      index++;
    });
    return (sum == 0) ? sum.toFixed(2) : (sum/index).toFixed(2);
  }

  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;
    let author = ( this.state.currentUser ? this.state.currentUser.name : 'no name author' );

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}>
          {this.state.currentUser ? this.state.currentUser.name.split('')[0].toUpperCase() : generateLetter()}
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
            <form className="rating-form" style={{margin: '10px', right: 0, float: 'right', position: 'absolute'}}>
              <span style={{float: 'right'}}>Total rating: {this.countAverage()}</span>
            </form>
          </div>
        </div>
        {deleteButton}
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}