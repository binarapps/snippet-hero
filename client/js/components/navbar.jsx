import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

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
