import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.refs.input.getValue());
  }

  render() {
    return (
      <form className="snippet-form" onSubmit={this._handleSubmit} style={{float: 'right'}}>
        <TextField floatingLabelText={this.props.label}
                   fullWidth={false}
                   type="text"
                   style={{marginRight: '5px'}}
                   ref='input' />
        <RaisedButton label="Search" secondary={true} type='submit'/>
      </form>

    );
  }
}
