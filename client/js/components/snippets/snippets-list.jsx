import React from 'react';
import _ from 'lodash';
import Snippet from './snippet';
import CommentBox from '../comments/comment-box';
import UserStore from '../../stores/user-store';

class SnippetListItem extends React.Component{
  constructor(props) {
    super(props);
  }

  getCurrentUser() {
    return UserStore.getState().currentUser;
  }

  render() {
    let snippet = '';
    let commentBox = '';
    if ( this.getCurrentUser() || this.props.snippet.isPublic ) {
      snippet = (<Snippet {...this.props.snippet} withRatings={this.props.withRatings} style={{marginBottom: '5px'}} history={this.props.history} />);
      if ( this.props.withComments ){
        commentBox = (<CommentBox snippetId={this.props.snippet.id} comments={this.props.snippet.comments}/>);
      }
    } 
    return (
      <li style={{position: 'relative', marginBottom: '25px'}}>
        {snippet}
        {commentBox}
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

    let history = this.props.history;
    let withComments = _.isUndefined(this.props.withComments) ? true : this.props.withComments;
    let withRatings = _.isUndefined(this.props.withRatings) ? true : this.props.withRatings;

    return (
      <ul style={{padding: 0}}>
        {this.props.snippets.map(function(snippet, index) {
          return (
            <SnippetListItem key={`snippet-${index}`}
                             withRatings={withRatings}
                             withComments={withComments}
                             snippet={snippet}
                             index={index}
                             history={history} />
          );
        })}
      </ul>
    );
  }
}
