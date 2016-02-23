import React from 'react';

class MonthPaginator extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleClick(month, year, e){
    e.preventDefault();
    this.props.onClickMonth(month, year);
  }

  _handleClickYear(year, e){
    e.preventDefault();
    this.prop.onCLickYear(year);
  }

  render() {
    let pagesArray = Array.apply(null, Array(12)).map(function (x, i) { return i; });
    let currentYear = this.props.currentYear;
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let realDate = new Date(Date.now());
    let nextButton = '';
    let prevButton = (
      <li><a onClick={this._handleClickYear.bind(this, currentYear-1)}> &laquo; {currentYear-1} Year </a></li>
    );

    if(currentYear != realDate.getFullYear()){
      nextButton = <li> <a onClick={this._handleClickYear.bind(this, currentYear+1)}>{currentYear+1} Year &raquo; </a></li>;
    }

    const pages = pagesArray.map((page) => {
      return (<li key={page} className={p.currentMonth == page ? 'active' : ''}>
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
