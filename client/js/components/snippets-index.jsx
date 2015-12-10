import React from 'react';
import SnippetFormDialog from './snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this._openSnippetDialog = this._openSnippetDialog.bind(this);
  }

  _openSnippetDialog () {
    this.dialog.open();
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

    return (
      <div>
        <RaisedButton onClick={this._openSnippetDialog} label="Add new snippet" primary={true} />
        <ul>
          <li>pierwszy</li>
          <li>drugi</li>
          <li>trzeci</li>
          <li>czwarty</li>
        </ul>
        <SnippetFormDialog ref={(ref) => this.dialog = ref} defaultOpen={false} languages={languages} />
      </div>
    );
  }
}
