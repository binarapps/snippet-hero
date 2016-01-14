import React from 'react';
import Snippet from './snippet';
import CommentBox from '../comments/comment-box';
import RaisedButton from 'material-ui/lib/raised-button';
import SnippetActions from '../../actions/snippet-actions.js';
import UserStore from '../../stores/user-store';

class SnippetListItem extends React.Component{

  componentDidMount () {
    this.setState({ currentUser: UserStore.state.currentUser });
  }

  deleteSnippet(snippet_id) {
    SnippetActions.destroySnippet(snippet_id);
  }
  
  render() {
    return (
      <li style={{position: 'relative', paddingLeft: '30px'}}>
        <span style={{position: 'absolute', left: 0}}>#{this.props.index+1}</span>
        <Snippet {...this.props.snippet} style={{marginBottom: '15px'}} />
        <div style={{display: 'inline-block', background: Colors.grey100, width: '100%'}}>
          <RaisedButton style={{float: 'right'}} onClick={ () => this.deleteSnippet(this.props.snippet.id)} label="Delete snippet" primary={true}/>
        </div>
        <CommentBox snippetId={this.props.snippet.id} comments={this.props.snippet.comments}/>
      </li>
    );
  }
}

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.setState({ currentUser: UserStore.state.currentUser });
  }

  deleteSnippet(snippet_id) {
    SnippetActions.destroySnippet(snippet_id);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.snippets.map(function(snippet, index) {
            return (
              <div>
                <SnippetListItem key={`snippet-${snippet.id}`} snippet={snippet} index={index}/>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}
