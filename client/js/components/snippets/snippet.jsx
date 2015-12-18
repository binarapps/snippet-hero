import React from 'react';
import Paper from 'material-ui/lib/paper';
import Codemirror from 'react-codemirror';
import Markdown from 'markdown-react-js';
import RatingForm from '../ratings/rating-form';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/gfm/gfm';

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
      <div style={{display: 'inline-flex'}}>
        <RatingForm key={this.props.id} snippetId={this.props.id}/>
        <Paper style={style}>
          <div>{this.props.name}</div>
          <Codemirror value={this.props.content} options={codeOptions} />
          <Markdown text={this.props.description}/>
        </Paper>
      </div>
    );
  }
}
