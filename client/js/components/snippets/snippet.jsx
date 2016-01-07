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
import {modeFromMime} from '../../libs/languages';
import UserStore from '../../stores/user-store';

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null};
  }

  componentDidMount () {
    this.setState({ currentUser: UserStore.state.currentUser });
  }

  random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;
    let colors = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green',
                  'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'grey'];
    let intensity = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    let letters = 'ABCDEFGHIJKLMNOQPRSTUW';
    let avatar = <Avatar
          color={Colors[this.random(colors) + this.random(intensity)]}
          backgroundColor={Colors[this.random(colors) + this.random(intensity)]}>
          {this.random(letters)}
        </Avatar>;
    let author = (this.props.user == null ? 'No author' : this.props.user.name)

    return (
      <Card style={style}>
        <div style={{display: 'inline-flex', background: Colors.grey100, width: '100%'}}>
          <CardHeader
            title={this.props.name || 'No title'}
            subtitle= {author}
            avatar={avatar} />
          <div>
            {( () => {
              var today = Date.now();
              var dateCreated = Date.parse(this.props.createdAt);
              if(Math.ceil((today-dateCreated) / (1000*3600*24))<30){
                if(this.state.currentUser && this.props.user){
                  if(this.state.currentUser.id != this.props.user.id){
                    return <RatingForm key={this.props.id} snippetId={this.props.id} style={{right: 0, margin: '10px'}}/>;
                  }
                }
              }
            })()}
          </div>
        </div>
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}
