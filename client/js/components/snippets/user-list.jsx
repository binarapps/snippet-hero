import React from 'react';
import UserSnippet from './user-snippet';
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
        <UserSnippet {...this.props.snippet} style={{marginBottom: '15px'}} />
        <CommentBox snippetId={this.props.snippet.id} comments={this.props.snippet.comments}/>
      </li>
    );
  }
}

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let page = this.props.page;
    let perPage = this.props.perPage;

    return (
      <ul>
        {this.props.snippets.map(function(snippet, index) {
          return (
            <SnippetListItem key={`snippet-${snippet.id}`} snippet={snippet} index={index} page={page} perPage={perPage}/>
          );
        })}
      </ul>
    );
  }
}
