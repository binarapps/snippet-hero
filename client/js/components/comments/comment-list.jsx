import React from 'react';
import moment from 'moment';

export default class CommentList extends React.Component {

  shouldComponentUpdate(nextProps) {
    if(nextProps.comments !== this.props.comments) return true;
    else return false;
  }

  render() {
    console.log('render comments list');
    return (
      <ul style={{paddingLeft: '30px', listStyle: 'none'}}>
        {this.props.comments.map(function(item) {
          return (
            <li style={{position: 'relative', padding: '10px 0'}}>
              <span>{item.content}</span>
              <span style={{float: 'right'}}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm')}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
