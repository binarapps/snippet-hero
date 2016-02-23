import React from 'react';

class MonthPaginator extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleClick(month, year, e){
    e.preventDefault();
    this.props.onClickMonth(month, year);
  }

  render() {
    let pagesArray = Array.apply(null, Array(12)).map(function (x, i) { return i; });
    let currentYear = this.props.currentYear;
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // let p = this.props;

    // let perPage = p.perPage;
    // let allPages = Math.ceil(p.totalCount/perPage);
    // let pagesArray = Array.apply(null, Array(allPages)).map(function (x, i) { return i+1; });
    let nextButton = '';
    let prevButton = '';

    // if(p.currentPage != 1){
    //   prevButton =  <li><a onClick={this._handleClick.bind(this, p.currentPage-1)}> &laquo; Prev</a></li>;
    // } 

    // if(p.currentPage != allPages){
    //   nextButton = <li> <a onClick={this._handleClick.bind(this, p.currentPage+1)}>Next &raquo; </a></li>;
    // }

    const pages = pagesArray.map((page) => {
      return (<li key={page} >
          <a onClick={this._handleClick.bind(this, page, currentYear)}>{monthNames[page]}</a>
        </li>
      );
    });

    return (
      <nav className={'paginate-nav'}>
        <ul className={'pagination'}>
          {prevButton}
          {pages}
          {nextButton}
        </ul>
      </nav>
    );
  }
}

export default MonthPaginator;
