import React from 'react';
// import SnippetFormDialog from './components/snippet-form-dialog';
import Navbar from './navbar';


export default class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar history={this.props.history}/>
        <div className="page-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
