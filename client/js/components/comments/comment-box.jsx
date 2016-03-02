import React from 'react';
import _ from 'lodash';
import SnippetActions from '../../actions/snippet-actions';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import SnippetStore from '../../stores/snippet-store';
import UserStore from '../../stores/user-store';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments, content: '', createError: ''};
    this.storeListeners = [];
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._loadMoreComments = this._loadMoreComments.bind(this);
  }

  componentDidMount() {
    this.storeListeners.push(SnippetStore.listen(this._onChange));
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  getCurrentUser() {
    return UserStore.getState().currentUser;
  }

  _onChange() {
    let snippets = SnippetStore.getState().snippets;
    let snippet = _.findWhere(snippets, {id: this.props.snippetId});
    this.setState({comments: snippet && snippet.comments});
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.content.length === 0) return;
    SnippetActions.commentSnippet({
      content: this.state.content
    }, this.props.snippetId);
    this.setState({content: ''});
  }

  _handleFormChange(e) {
    this.setState({content: e.target.value});
  }

  _loadMoreComments() {
    SnippetActions.getAllComments(this.props.snippetId);
  }

  render() {
    let commentForm = '';
    if ( this.getCurrentUser() ) {
      commentForm = (<CommentForm
          onChange={this._handleFormChange}
          content={this.state.content}
          onSubmit={this._handleFormSubmit} />);
    }
    return (
      <div style={{paddingLeft: '30px'}}>
        {commentForm}
        <CommentList comments={this.state.comments}/>
        {(() => {
          if (this.state.comments.length === 5) {
            return (<div style={{cursor: 'pointer'}} onClick={this._loadMoreComments}>Load more comments...</div>);
          }
        })()}
      </div>
    );
  }
}
