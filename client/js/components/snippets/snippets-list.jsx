import React from 'react';
import Snippet from './snippet';

export default class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 style={{fontSize: '24px', marginBottom: '20px'}}>All snippets:</h2>
        <ul>
          {this.props.items.map(function(item, index) {
            return (
              <li style={{position: 'relative', paddingLeft: '30px'}}>
                <span style={{position: 'absolute', left: 0}}>#{index+1}</span>
                <Snippet {...item} style={{marginBottom: '15px'}} key={index}/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
