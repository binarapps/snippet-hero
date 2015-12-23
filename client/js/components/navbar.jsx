import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import SnippetFormDialog from './snippets/snippet-form-dialog';
import SnippetStore from '../stores/snippet-store';
import SnippetActions from '../actions/snippet-actions';
import RaisedButton from 'material-ui/lib/raised-button';

class Navbar extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onLeftNavChange = this.onLeftNavChange.bind(this);
  }

  onLeftNavChange (e, key, payload) {
    this.props.history.pushState(null, payload.route);
  }

  handleClick (e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];
    return (
      <div>
        <RaisedButton onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>
        <SnippetFormDialog ref="dialog"
                   languages={languages} />
        <LeftNav
            ref="leftNav"
            docked={false}
            onChange={this.onLeftNavChange}
            menuItems={this.props.menuItems}/>
        <header>
          <AppBar title='Snippet-hero' onLeftIconButtonTouchTap={this.handleClick} />
        </header>
      </div>
    );
  }
}

module.exports = Navbar;
