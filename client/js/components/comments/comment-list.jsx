import React from 'react';
import moment from 'moment';

class CommentListItem extends React.Component{
  render() {
    return (
      <li style={{position: 'relative', padding: '10px 0'}} key={this.props.comment.id}>
        <span>{this.props.comment.content}</span>
        <span style={{float: 'right'}}>{moment(this.props.comment.createdAt).format('DD-MM-YYYY HH:mm')}</span>
      </li>
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
      <ul style={{paddingLeft: '30px', listStyle: 'none'}}>
        {this.props.comments.map(function(comment) {
          return (
            <CommentListItem key={comment.id} comment={comment}/>
          );
        })}
      </ul>
    );
  }
}
