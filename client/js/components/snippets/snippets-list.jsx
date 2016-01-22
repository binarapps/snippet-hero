import React from 'react';
import Snippet from './snippet';
import CommentBox from '../comments/comment-box';

class SnippetListItem extends React.Component{
  render() {
    return (
      <li style={{position: 'relative', paddingLeft: '30px'}}>
        <span style={{position: 'absolute', left: 0}}>#{this.props.index+1}</span>
        <Snippet {...this.props.snippet} style={{marginBottom: '15px'}} />
        <CommentBox snippetId={this.props.snippet.id} comments={this.props.snippet.comments}/>
      </li>
    );
  }
}

export default class SnippetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rateDialogOpen: false};
  }

  render() {
    return (
      <ul>
        {this.props.snippets.map(function(snippet, index) {
          return (
            <SnippetListItem key={`snippet-${snippet.id}`} snippet={snippet} index={index}/>
          );
        })}
      </ul>
    );
  }
}
