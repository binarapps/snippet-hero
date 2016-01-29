import React from 'react';

class Paginator extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleClick(page, e){
    e.preventDefault();
    this.props.onClickPage(page);
  }

  render() {
    let p = this.props;

    let perPage = p.perPage;
    let allPages = Math.ceil(p.totalCount/perPage);
    let pagesArray = Array.apply(null, Array(allPages)).map(function (x, i) { return i+1; });

    const pages = pagesArray.map((page) => {
      return (<li key={page} className={p.currentPage == page ? 'active' : ''}>
          <a onClick={this._handleClick.bind(this, page)}>{page}</a>
        </li>
      );
    });


    return (
      <nav className={'paginate-nav'}>
        <ul className={'pagination'}>
          <li>
            <a onClick={this._handleClick.bind(this, p.currentPage-1)}> &laquo; Prev</a>
          </li>
          {pages}
          <li>
            <a onClick={this._handleClick.bind(this, p.currentPage+1)}>Next &raquo; </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Paginator;
