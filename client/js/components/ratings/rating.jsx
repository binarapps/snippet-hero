import React from 'react';
import RatingActions from '../../actions/rating-actions';
import SnippetActions from '../../actions/snippet-actions';
import Star from './star';
import UserStore from '../../stores/user-store';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
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
  }

  componentDidMount() {
    this._countSnippetAvg();
  }

  _countSnippetAvg () {
    let snippet = this.props.snippet;
    let sum = 0.0;
    let index = 0;
    let currentRate = {};
    let avg;
    let currentUserId = this.state.currentUser.id;
    let grade = 0;

    if(snippet.ratings){
      snippet.ratings.forEach(function (rating) {
        sum += rating.value;
        index++;

        if(rating.UserId == currentUserId){
          currentRate.userId = rating.UserId;
          currentRate.grade = rating.value;
          grade = rating.value;
        }
      });
    }

    avg = (index==0 ? 0 : sum/index).toFixed(2);
    this.setState({
      grade: grade
    });
    SnippetActions.countSnippetAverage(snippet.id, avg, currentRate);
  }

  _handleMouseLeave(){
    let rating = 0;
    let userRates = this.props.usersRatings[this.state.currentUser.id] ;

    if(userRates !== undefined){
      if(userRates[this.props.snippetId] !== undefined){
        rating = userRates[this.props.snippetId];
      }
    }

    this.setState({
      grade: rating
    });
  }

  _handleMouseOver(g){
    this.setState({grade: g});
  }

  _handleClick(g){
    RatingActions.createRating({
      value: g,
      SnippetId: this.props.snippetId
    });
    this.setState({grade: g});
  }

  _gradeToStyle(grade){
    return grade > this.state.grade ? this.style.starBlack : this.style.starYellow;
  }

  _setGradeOfUserRating(){
    let newGrade = 0;
    const user_id = this.state.currentUser.id;

    if(this.props.snippet.ratings){
      (this.props.snippet.ratings).forEach(function (r){
        if(r.UserId == user_id){
          newGrade = r.value;
        }
      });
    }

    this.setState({
      grade: newGrade
    });
  }

  render() {
    const stars = [1,2,3,4,5].map((rating) => {
      return (<Star ref={`star${rating}`}
        snippetId={this.props.snippetId}
        onClick={(g) => this._handleClick(g)}
        onMouseOver={(g) => this._handleMouseOver(g)}
        onMouseOut={() => this._handleMouseLeave()}
        grade={rating}
        style={this._gradeToStyle(rating)} />
      );
    });
    return (
      <div>
        <div style={{display: 'inline-flex'}}>
          {(() => {
            if(this.props.enabled==true){
              return stars;
            }
          })()}
        </div>
        <br />
        <span style={{float: 'right'}}>Total rating: {this.props.snippetsAvg[this.props.snippetId]}</span>
      </div>
    );
  }
}
