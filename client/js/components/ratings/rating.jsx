import React from 'react';
import RatingActions from '../../actions/rating-actions';
import Star from './star';
import UserStore from '../../stores/user-store';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {grade: 0, currentUser: UserStore.state.currentUser};
    this.style = {
      starBlack: {
        fill: 'rgba(135, 135, 135, 0.8)'
      },
      starYellow: {
        fill: 'rgba(255, 210, 30, 1)'
      }
    };
  }

  componentWillMount () {
    this.setState({ currentUser: UserStore.state.currentUser });
    RatingActions.getSnippetRatings(this.props.snippetId);
    RatingActions.getCurrentUserRating(this.props.snippetId);
  }

  componentDidMount () {
    this._setGradeOfUserRating();
  }

  handleMouseLeave(g){
    this._setGradeOfUserRating();
  }

  handleMouseOver(g){
    this.setState({grade: g});
  }

  handleClick(g){
    RatingActions.create({
      value: g,
      SnippetId: this.props.snippetId
    });
    this.setState({grade: g});
  }

  _gradeToStyle(grade){
    return grade > this.state.grade ? this.style.starBlack : this.style.starYellow;
  }

  _setGradeOfUserRating(){
    var newGrade = 0;
    if (this.props.usersRatings[this.state.currentUser.id]) {
      if (this.props.usersRatings[this.state.currentUser.id][this.props.snippetId]){
        newGrade = this.props.usersRatings[this.state.currentUser.id][this.props.snippetId];
      } else {
        newGrade = 0;
      }
    } else {
      newGrade = 0;
    }
    this.setState({
      grade: newGrade
    });
  }

  render() {

    return (
      <div>
        <div style={{display: 'inline-flex'}}>
          <div>
            <Star
              ref="star1"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleMouseOver(g)}
              onMouseOut={(g) => this.handleMouseLeave(g)}
              grade={1}
              style={this._gradeToStyle(1)} />
          </div>
          <div>
            <Star
              ref="star2"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleMouseOver(g)}
              onMouseOut={(g) => this.handleMouseLeave(g)}
              grade={2}
              style={this._gradeToStyle(2)} />
          </div>
          <div>
            <Star
              ref="star3"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleMouseOver(g)}
              onMouseOut={(g) => this.handleMouseLeave(g)}
              grade={3}
              style={this._gradeToStyle(3)} />
          </div>
          <div>
            <Star
              ref="star4"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleMouseOver(g)}
              onMouseOut={(g) => this.handleMouseLeave(g)}
              grade={4}
              style={this._gradeToStyle(4)} />
          </div>
          <div>
            <Star
              ref="star5"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleMouseOver(g)}
              onMouseOut={(g) => this.handleMouseLeave(g)}
              grade={5}
              style={this._gradeToStyle(5)} />
          </div>
        </div>
        <br />
        <span style={{float: 'right'}}>Total: {this.props.snippetsAvg[this.props.snippetId]}</span>
      </div>
    );
  }
}
