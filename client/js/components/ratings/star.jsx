import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(e){
    e.preventDefault();
    this.props.onClick(this.props.grade);
  }

  render() {
    let style = {
      starBlack: {
      fill: 'rgba(135, 135, 135, 0.8)'
    },
    starYellow: {
      fill: 'rgba(255, 210, 30, 1)'
    }
    };
    return (
      <ActionGrade
        onClick={this._handleClick}
        style={style.starBlack} />
    );
  }
}

