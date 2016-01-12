import React from 'react';
import moment from 'moment';
import Markdown from 'markdown-react-js';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import {generateColor} from '../mixins/color-generate';

class CommentListItem extends React.Component{
  render() {
    return (
      <Paper zDepth={2} style={{display:'list-item', padding: '10px', marginBottom: '10px'}}>
        <Avatar
          style={{float: 'left'}}
          color={generateColor()}
          backgroundColor={generateColor()}>
          {this.props.User.name.split('')[0].toUpperCase()}
        </Avatar>
        <div style={{marginLeft: '60px'}}>
          <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{this.props.User.name}, posted on: {moment(this.props.createdAt).format('DD-MM-YYYY HH:mm')}</span>
          <Markdown text={this.props.content} className="markdown" />
        </div>
      </Paper>
    );
  }
}

export default class CommentList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.comments !== this.props.comments) return true;
    else return false;
  }

  render() {
    return (
      <div style={{display: 'list', margin: '20px 0', listStyle: 'none'}}>
        {this.props.comments.map(function(comment) {
          return (
            <CommentListItem key={`comment-${comment.id}`} {...comment}/>
          );
        })}
      </div>
    );
  }
}
