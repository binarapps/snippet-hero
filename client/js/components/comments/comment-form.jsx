import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CommentForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <TextField
          onChange={this.props.onChange}
          floatingLabelText="Add new comment:"
          fullWidth={true}
          multiLine={true}
          value={this.props.content}
          rows={2}
          type="text"
        />
        <RaisedButton label="Add comment" primary={true} type='submit'/>
      </form>
    );
  }
}
