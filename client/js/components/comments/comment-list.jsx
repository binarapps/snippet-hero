import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import Markdown from 'markdown-react-js';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import {generateColor} from '../mixins/color-generate';

class CommentListItem extends React.Component{
  render() {
    let snippetInfo = this.props.withSnippetName ? (<span>, for: {this.props.Snippet.name}</span>) : '';
    return (
      <Paper zDepth={2} style={{display:'list-item', padding: '10px', marginBottom: '10px'}}>
        <Avatar
          style={{float: 'left'}}
          color={generateColor()}
          backgroundColor={generateColor()}>
          {this.props.User.name.split('')[0].toUpperCase()}
        </Avatar>
        <div style={{marginLeft: '60px', fontSize: '1.2rem', fontWeight: 'bold'}}>
          <span>{this.props.User.name}, posted on: {moment(this.props.createdAt).format('DD-MM-YYYY HH:mm')}</span>
          { snippetInfo }
          <Markdown text={this.props.content} className="markdown" />
        </div>
      </Paper>
    );
  }
}

export default class CommentList extends React.Component {
  render() {
    let comments = this.props.comments.map((comment) => {
      return (
        <CommentListItem key={`comment-${comment.id}`} withSnippetName={this.props.withSnippetName} {...comment}/>
      );
    });

    return (
      <div style={{display: 'list', margin: '20px 0', listStyle: 'none'}}>
        <ReactCSSTransitionGroup transitionName="comment" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {comments}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
