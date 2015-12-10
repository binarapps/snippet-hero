import React from 'react';
import Navbar from './navbar';


export default class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar history={this.props.history}/>
        <div className="page-wrapper" style={{padding: '20px 10px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
