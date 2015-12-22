import React from 'react';

export default class CommentList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.comments.map(function(item) {
          return (
            <li style={{position: 'relative', paddingLeft: '30px'}}>
              {item.content}
            </li>
          );
        })}
      </ul>
    );
  }
}
