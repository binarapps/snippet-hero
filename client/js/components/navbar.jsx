import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import SnippetFormDialog from './snippets/snippet-form-dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import {langs} from '../libs/languages';
import UserStore from '../stores/user-store';

class Navbar extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onLeftNavChange = this.onLeftNavChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = { currentUser: UserStore.getState().currentUser };
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState({ currentUser: UserStore.getState().currentUser });
  }

  onLeftNavChange (e, key, payload) {
    this.props.history.pushState(null, payload.route);
  }

  handleClick (e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    let iconElementRight;
    if ( this.state.currentUser ){
      iconElementRight = (<RaisedButton style={{marginTop: '6px'}} onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>);
    } else {
      iconElementRight = (<a href={'/#/login'} ><RaisedButton style={{marginTop: '6px'}} label="Sign In" primary={true}/></a>);
    }
    return (
      <div>
        <SnippetFormDialog
          languages={langs}
          ref="dialog" />
        <LeftNav
            ref="leftNav"
            docked={false}
            onChange={this.onLeftNavChange}
            menuItems={this.props.menuItems}/>
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
