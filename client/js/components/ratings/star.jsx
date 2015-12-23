import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleHover = this._handleHover.bind(this);
  }

  _handleClick(e){
    e.preventDefault();
    this.props.onClick(this.props.grade);
  }
  _handleHover(e){
    e.preventDefault();
    this.props.onMouseOver(this.props.grade);
  }

  render() {
    return (
      <ActionGrade
        onClick={this._handleClick}
        onMouseOver={this._handleHover}
        style={this.props.style} />
    );
  }
}

