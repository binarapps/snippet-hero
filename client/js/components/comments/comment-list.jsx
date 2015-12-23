import React from 'react';

export default class CommentList extends React.Component {
  render() {
    return (
      <ul style={{paddingLeft: '30px'}}>
        {this.props.comments.map(function(item) {
          return (
            <li style={{position: 'relative', padding: '10px 0'}}>
              <span>{item.content}</span>
              <span style={{float: 'right'}}>{item.createdAt}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
