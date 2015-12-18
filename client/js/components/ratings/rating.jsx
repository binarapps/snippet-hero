import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import RatingActions from '../../actions/rating-actions';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    RatingActions.getSnippetRatings(this.props.snippetId);
  }

  handleHover(e){
    e.preventDefault();
    //TODO
  }
  handleClick(e){
    e.preventDefault();
    // TODO
  }

  render() {
    return (
      <div style={{display: 'inline-flex'}}>
        <div>
          <ActionGrade
              ref="oneStar"
              onClick={this.handleClick}
              onMouseOver={this.handleHover}
              style={style.starBlack} />
        </div>
        <div>
          <ActionGrade
              ref="twoStars"
              onClick={this.handleClick}
              onMouseOver={this.handleHover}
              style={style.starBlack} />
        </div>
        <div>
          <ActionGrade
              ref="threeStars"
              onClick={this.handleClick}
              onMouseOver={this.handleHover}
              style={style.starBlack} />
        </div>
        <div>
          <ActionGrade
              ref="fourStars"
              onClick={this.handleClick}
              onMouseOver={this.handleHover}
              style={style.starBlack} />
        </div>
        <div>
         <ActionGrade
            ref="fiveStars"
            onClick={this.handleClick}
            onMouseOver={this.handleHover}
            style={style.starBlack} />
        </div>
        <span>#{this.props.snippetsAvg[this.props.snippetId]}</span>
      </div>
    );
  }
}

let style = {
  starBlack: {
    fill: 'rgba(135, 135, 135, 0.8)'
  },
  starYellow: {
    fill: 'rgba(255, 210, 30, 1)'
  }
};