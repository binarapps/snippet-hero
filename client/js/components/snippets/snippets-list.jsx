import React from 'react';
import Snippet from './snippet';
import CommentBox from '../comments/comment-box';

class SnippetListItem extends React.Component{
  render() {

    let page = this.props.page;
    let perPage = this.props.perPage;
    let index = this.props.index;

    let realIndex = (page-1)*perPage+index+1;

    return (
      <li style={{position: 'relative', paddingLeft: '30px'}}>
        <span style={{position: 'absolute', left: 0}}>#{realIndex}</span>
        <Snippet {...this.props.snippet} style={{marginBottom: '15px'}} perPage={perPage}/>
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

    let page = this.props.page;
    let perPage = this.props.perPage;

    return (
      <ul>
        {this.props.snippets.map(function(snippet, index) {
          return (
            <SnippetListItem key={`snippet-${index}`} snippet={snippet} index={index} page={page} perPage={perPage}/>
          );
        })}
      </ul>
    );
  }
}
