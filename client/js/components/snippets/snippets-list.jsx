import React from 'react';
import Snippet from './snippet';
import CommentBox from '../comments/comment-box';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.snippets.length !== this.props.snippets.length)
      return true;
    else return false;
  }

  render() {
    return (
      <ul>
        {this.props.snippets.map(function(item, index) {
          return (
            <li style={{position: 'relative', paddingLeft: '30px'}}>
              <span style={{position: 'absolute', left: 0}}>#{index+1}</span>
              <Snippet {...item} style={{marginBottom: '15px'}} key={index}/>
              <CommentBox snippetId={item.id} comments={item.comments}/>
            </li>
          );
        })}
      </ul>
    );
  }
}
