import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

export default class RatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {starsClicked: 0}; //TODO get stars clicked from user's rating for this snippet
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      <form className="rating-form" style={{display: 'inline-flex', margin: '0 5px'}}>
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
      </form>
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