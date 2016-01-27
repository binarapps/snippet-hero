import React from 'react';

class Paginator extends React.Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleClickPrev = this._handleClickPrev.bind(this);
    this._handleClickNext = this._handleClickNext.bind(this);
  }

  _handleClick(page, e){
    e.preventDefault();
    this.props.onClick(page);
  }

  _handleClickPrev(e){
    e.preventDefault();
    this.props.onClickPrev();
  }

  _handleClickNext(e){
    e.preventDefault();
    this.props.onClickNext();
  }

  render() {
    let p = this.props;

    let perPage = this.props.perPage;
    let allPages = Math.ceil(p.totalCount/perPage);
    let pagesArray = Array.apply(null, Array(allPages)).map(function (x, i) { return i+1; });

    const pages = pagesArray.map((page) => {
      if(page ===  p.currentPage){
        return (<li key={page} className={'active'}>
            <a onClick={this._goToPage.bind(this, page)}>{page}</a>
          </li>
        );
      } else {
        return (<li key={page} className={''}>
            <a onClick={this._goToPage.bind(this, page)}>{page}</a>
          </li>
        );
      }
    });


    return (
      <nav className={'paginate-nav'}>
        <ul className={'pagination'}>
          <li className={p.currentPage === 1 ? 'disabled' : ''}>
            <a disabled={p.currentPage === 1} onClick={this._onClickPrev}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Prev</span>
            </a>
          </li>
          {pages}
          <li className={p.currentPage === allPages ? 'disabled' : ''}>
            <a disabled={p.currentPage === allPages} onClick={this._onClickNext}>
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Paginator;
