import React from 'react';
import Paper from 'material-ui/lib/paper';
import Codemirror from 'react-codemirror';
import Markdown from 'markdown-react-js';

// TODO create tests
export default class Snippet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let codeOptions = {
      readOnly: true,
      lineNumbers: true,
      mode: this.props.language
    };
    let { style } = this.props;
    return (
      <Paper style={style}>
        <div>{this.props.name}</div>
        <Codemirror value={this.props.content} options={codeOptions} />
        <Markdown text={this.props.description}/>
      </Paper>
    );
  }
}
