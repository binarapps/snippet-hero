import React from 'react';
import RatingActions from '../../actions/rating-actions';
import Star from './star';
import UserStore from '../../stores/user-store';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this.state = { grade: 0 };

    this.style = {
      starBlack: {
        fill: 'rgba(135, 135, 135, 0.8)'
      },
      starYellow: {
        fill: 'rgba(255, 210, 30, 1)'
      }
    };
  }

  componentDidMount(){
    setTimeout(this._handleMouseLeave, 1000);
  }

  _handleMouseLeave(){
    var user = UserStore.getState().currentUser;
    var userRates = this.props.usersRatings[user.id];
    var rating = (userRates !== undefined ? userRates[this.props.snippet.id] : 0);
    this.setState({
      grade: rating || 0
    });
  }


  _handleMouseOver(g) {
    this.setState({ grade: g });
  }

  _handleClick(g) {
    RatingActions.createRating({
      value: g,
      SnippetId: this.props.snippetId
    });
    this.setState({ grade: g });
  }

  _gradeToStyle(grade) {
    return grade > this.state.grade ? this.style.starBlack : this.style.starYellow;
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
        <span style={{float: 'right'}}>Total rating: {this.props.snippetsAvg[this.props.snippetId] || this.props.snippet.avg }</span>
      </div>
    );
  }
}
