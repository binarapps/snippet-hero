import React from 'react';
import classNames from 'classnames';
import SnippetActions from '../actions/snippet-actions.js';

// TODO add language select box
// TODO create tests

export default class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', content: '', description: '', language: null, hasErrors: false};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isValid() {
    return this.state.content.length > 0;
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleContentChange(e) {
    this.setState({content: e.target.value, hasErrors: e.target.value === 0});
  }
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      this.setState({hasErrors: true});
      return;
    }
    SnippetActions.create({
      name: this.state.name,
      content: this.state.content,
      description: this.state.description,
      language: this.state.language
    });
  }
  render() {
    let contentClasses = classNames({
      'field': true,
      'has-error': this.state.hasErrors
    });
    return (
      <form className="snippet-form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Enter snippet title (optional): </label>
          <input
            type="text"
            name="name"
            placeholder="Snippet Title."
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>

        <div className={contentClasses}>
          <label htmlFor="content">Enter snippet code: </label>
          <textarea
            name="content"
            placeholder="Place your code here."
            value={this.state.content}
            onChange={this.handleContentChange}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Enter snippet description (optional): </label>
          <input type="text"
            name="description"
            placeholder="Anything to add?"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </div>

        <div className="field">
          <input
            type="submit"
            value="Publish!"
          />
        </div>
      </form>
    );
  }
}
