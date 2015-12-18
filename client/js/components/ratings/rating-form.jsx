import React from 'react';
import AltContainer from 'alt/AltContainer.js';
import RatingActions from '../../actions/rating-actions';
import RatingStore from '../../stores/rating-store';
import Rating from './rating'


export default class RatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {starsClicked: 0}; 
  }

  componentDidMount () {
    RatingActions.getSnippetRatings(this.props.snippetId);
  }

  render() {
    return (
      <form className="rating-form" style={{display: 'inline-flex', margin: '0 10px'}}>
        <AltContainer store={RatingStore}>
          <Rating />
        </AltContainer>
      </form>
    );
  }
}
