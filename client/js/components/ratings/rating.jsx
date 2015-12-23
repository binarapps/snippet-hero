import React from 'react';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import RatingActions from '../../actions/rating-actions';
import Star from './star';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    RatingActions.getSnippetRatings(this.props.snippetId);
  }

  //componentWillReceiveProps (props) {
   // console.log(props);
  //}

  handleHover(g){
    
  }

  handleClick(g){
    RatingActions.create({
      UserId: null,
      value: g,
      SnippetId: this.props.snippetId
    });
    RatingActions.getSnippetRatings(this.props.snippetId);
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
      <div>
        <div style={{display: 'inline-flex'}}>
          <div>
            <Star
              ref="star1"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleHover(g)}
              grade={1}
              style={style.starBlack} />
          </div>
          <div>
            <Star
              ref="star2"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleHover(g)}
              grade={2}
              style={style.starBlack} />
          </div>
          <div>
            <Star
              ref="star3"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleHover(g)}
              grade={3}
              style={style.starBlack} />
          </div>
          <div>
            <Star
              ref="star4"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleHover(g)}
              grade={4}
              style={style.starBlack} />
          </div>
          <div>
            <Star
              ref="star5"
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              onMouseOver={(g) => this.handleHover(g)}
              grade={5}
              style={style.starBlack} />
          </div>
        </div>
        <br />
        <span>{this.props.snippetsAvg[this.props.snippetId]}</span>
      </div>
    );
  }
}
