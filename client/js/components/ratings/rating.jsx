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

  handleHover(e){
    e.preventDefault();
    //TODO
  }
  handleClick(g){
    switch(g){
      case 1:
        alert(1);
        RatingActions.create({
          // TODO add user's id
          UserId: null,
          value: g,
          SnippetId: this.props.snippetId
        });
        break;
      case 2:
        alert(2);
        break;
      case 3:
        alert(3);
        break;
      case 4:
        alert(4);
        break;
      case 5:
        alert(5);
        break;
      default:
        alert('other');
    }
  }

  render() {
    return (
      <div>
        <div style={{display: 'inline-flex'}}>
          <div>
            <Star
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              grade={1} />
          </div>
          <div>
            <Star
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              grade={2} />
          </div>
          <div>
            <Star
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
               grade={3} />
          </div>
          <div>
            <Star
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              grade={4} />
          </div>
          <div>
            <Star
              snippetId={this.props.snippetId}
              onClick={(g) => this.handleClick(g)}
              grade={5} />
          </div>
        </div>
        <br />
        <span>{this.props.snippetsAvg[this.props.snippetId]}</span>
      </div>
    );
  }
}
