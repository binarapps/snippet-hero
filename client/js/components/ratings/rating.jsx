import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import RatingActions from '../../actions/rating-actions';
import Star from './star';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {grade: 0};
    this.style = {
      starBlack: {
        fill: 'rgba(135, 135, 135, 0.8)'
      },
      starYellow: {
        fill: 'rgba(255, 210, 30, 1)'
      }
    };
  }

  componentDidMount () {
    RatingActions.getSnippetRatings(this.props.snippetId);
  }

  handleMouseLeave(g){
    this.setState({grade: 0});
  }

  handleMouseOver(g){
    this.setState({grade: g});
  }

  handleClick(g){
    RatingActions.create({
      UserId: null,
      value: g,
      SnippetId: this.props.snippetId
    });
    RatingActions.getSnippetRatings(this.props.snippetId);
  }

  _gradeToStyle(grade){
    return grade > this.state.grade ? this.style.starBlack : this.style.starYellow;
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
