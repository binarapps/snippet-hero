import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import SnippetFormDialog from './snippets/snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import {langs} from '../libs/languages';

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
    return (
      <div>
        <RaisedButton onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>
        <SnippetFormDialog
          languages={langs}
          ref="dialog" />
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
