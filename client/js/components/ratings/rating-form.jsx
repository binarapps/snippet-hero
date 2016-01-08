import React from 'react';
import AltContainer from 'alt/AltContainer.js';
import SnippetStore from '../../stores/snippet-store.js';
import Rating from './rating';


export default class RatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {starsClicked: 0}; 
  }

  render() {
    return (
      <form className="rating-form" style={{margin: '10px', right: 0, float: 'right', position: 'absolute'}}>
        <AltContainer store={SnippetStore}>
          <Rating snippetId={this.props.snippetId} snippet={this.props.snippet} enabled={this.props.enabled}/>
        </AltContainer>
      </form>
    );
  }
}
