import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import SnippetFormDialog from './snippets/snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import {langs} from '../libs/languages';
import MenuItem from 'material-ui/lib/menus/menu-item';

class Navbar extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this._goToPage = this._goToPage.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }

  _goToPage(url) {
    this.props.history.pushState(null, url);
  }

  render() {
    let iconElementRight;
    let menuItem1, menuItem2, menuItem3;
    if ( this.props.currentUser ){
      iconElementRight = (<RaisedButton style={{marginTop: '6px'}} onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>);
      menuItem1 = <MenuItem primaryText="Dashboard" onTouchTap={() => this._goToPage('/')} />;
      menuItem2 = <MenuItem primaryText="All snippets" onTouchTap={() => this._goToPage('/snippets')} />;
      menuItem3 = <MenuItem primaryText="Sign Out" onTouchTap={() => this._goToPage('/logout')} />;
    } else {
      iconElementRight = (<a href={'/#/login'} ><RaisedButton style={{marginTop: '6px'}} label="Sign In" primary={true}/></a>);
      menuItem1 = <MenuItem primaryText="All snippets" onTouchTap={() => this._goToPage('/snippets')} />;
      menuItem2 = <MenuItem primaryText="Sign In" onTouchTap={() => this._goToPage('/login')} />;
      menuItem3 = <MenuItem primaryText="Sign Up" onTouchTap={() => this._goToPage('/register')} />;
    }
    return (
      <div>
        <SnippetFormDialog
          languages={langs}
          ref="dialog" 
          dialogOpen={false}/>
        <LeftNav
            ref="leftNav"
            docked={false}
            onRequestChange={open => this.setState({open})}>
          {menuItem1}
          {menuItem2}
          {menuItem3}
        </LeftNav>
        <header>
          <AppBar
              title='Snippet-hero'
              onLeftIconButtonTouchTap={this.handleClick}
              iconElementRight={iconElementRight} />
        </header>
      </div>
    );
  }
}

module.exports = Navbar;
