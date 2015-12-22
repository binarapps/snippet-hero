import React from 'react';
import SnippetActions from '../../actions/snippet-actions';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import CommentsStore from '../../stores/snippet-comments-store';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], content: ''};
    this.storeListeners = [];
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.storeListeners.push(CommentsStore.listen(this.onChange));
    SnippetActions.getAllComments(this.props.snippetId);
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  onChange() {
    this.setState(CommentsStore.getState());
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    SnippetActions.commentSnippet({
      content: this.state.content
    }, this.props.snippetId);
    this.setState({content: ''});
  }

  _handleFormChange(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <div>
        <CommentForm
          onChange={this._handleFormChange}
          onSubmit={this._handleFormSubmit}
          content={this.state.content} />
        <CommentList comments={this.state.comments}/>
      </div>
    );
  }
}
