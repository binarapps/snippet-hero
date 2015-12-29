import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleClick(e){
    e.preventDefault();
    this.props.onClick(this.props.grade);
  }

  _handleMouseOver(e){
    e.preventDefault();
    this.props.onMouseOver(this.props.grade);
  }

  _handleMouseLeave(e){
    e.preventDefault();
    this.props.onMouseOut(this.props.grade);
  }

  render() {
    return (
      <ActionGrade
        onClick={this._handleClick}
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseLeave}
        style={this.props.style} />
    );
  }
}

