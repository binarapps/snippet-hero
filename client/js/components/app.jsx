import React from 'react';
import Navbar from './navbar';


export default class App extends React.Component {

  render() {
    let menuItems = [
      { route: '/', text: 'Dashboard' },
      { route: 'snippets', text: 'All snippets' }
    ];

    return (
      <div>
        <Navbar history={this.props.history} menuItems={menuItems}/>
        {this.props.children}
      </div>
    );
  }
}
