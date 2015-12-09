import React from 'react';
const AppBar = require('material-ui/lib/app-bar');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');

let menuItems = [
  { route: '/', text: 'Dashboard' },
  { route: 'about', text: 'My snippets' },
  { route: 'about', text: 'All snippets' },
  { route: 'contact', text: 'Settings' },
];


export default class Navbar extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }

  render() {
    return (
      <div>
        <LeftNav
            ref="leftNav"
            docked={false}
            menuItems={menuItems}/>
        <header>
          <AppBar title='Snippet-hero' onLeftIconButtonTouchTap={this.handleClick} />
        </header>
      </div>
    )
  }
}
