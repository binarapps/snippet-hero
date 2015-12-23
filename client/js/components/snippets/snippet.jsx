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

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <Card style={style}>
        <CardHeader
          style={{background: Colors.grey100}}
          title={this.props.name || 'No title'}
          subtitle="author link"
          avatar={avatar} />
          <RatingForm key={this.props.id} snippetId={this.props.id}/>
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}
