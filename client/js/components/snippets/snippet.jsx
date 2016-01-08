import React from 'react';
import Codemirror from 'react-codemirror';
import Markdown from 'markdown-react-js';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import {generateColor, generateLetter} from '../mixins/color-generate';

import {modeFromMime} from '../../libs/languages';

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: modeFromMime(this.props.language),
      mime: this.props.language
    };
    let { style } = this.props;
    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}>
          {generateLetter()}
        </Avatar>);
    return (
      <Card style={style}>
        <CardHeader
          style={{background: Colors.grey100}}
          title={this.props.name || 'No title'}
          subtitle="author link"
          avatar={avatar} />
        <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300 }}>
          <Codemirror value={this.props.content} options={codeOptions} />
        </div>
        {this.props.description ? <CardText className="snippet-description" ><Markdown text={this.props.description} className="markdown" /></CardText> : null}
      </Card>
    );
  }
}
