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
import {generateColor, generateLetter} from '../mixins/color-generate';
import {modeFromMime} from '../../libs/languages';
import UserStore from '../../stores/user-store';
import RaisedButton from 'material-ui/lib/raised-button';
import SnippetActions from '../../actions/snippet-actions.js';

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null};
  }

  componentDidMount () {
    this.setState({ currentUser: UserStore.state.currentUser });
  }

  checkRatingAbility() {
    let today = Date.now();
    let dateCreated = Date.parse(this.props.createdAt);
    let enabled = false;

    if(Math.ceil((today-dateCreated) / (1000*3600*24))<30){
      if(this.state.currentUser && this.props.user){
        if(this.state.currentUser.id != this.props.user.id){
          enabled = true;
        }
      }
    }
    return enabled;
  }

  deleteSnippet(snippet_id) {
    SnippetActions.destroySnippet(snippet_id);
  }

  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;

    let author = (this.props.user == null ? 'No author' : this.props.user.name);
    let enabled = this.checkRatingAbility();

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}>
          {generateLetter()}
        </Avatar>);

    return (
      <Card style={style}>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <CardHeader
            title={this.props.name || 'No title'}
            subtitle= {author}
            avatar={avatar} />
          <div>
            <RatingForm key={this.props.id} snippetId={this.props.id} snippet={this.props} style={{right: 0, margin: '10px'}} enabled={enabled}/>
          </div>
        </div>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <RaisedButton onClick={ () => this.deleteSnippet(this.props.id)} label="Delete snippet" primary={true}/>
        </div>
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}
