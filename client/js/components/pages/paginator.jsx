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
    let nextButton = '';
    let prevButton = '';

    if(p.currentPage != 1){
      prevButton =  <li><a onClick={this._handleClick.bind(this, p.currentPage-1)}> &laquo; Prev</a></li>;
    } 

    if(p.currentPage != allPages){
      nextButton = <li> <a onClick={this._handleClick.bind(this, p.currentPage+1)}>Next &raquo; </a></li>;
    }

    const pages = pagesArray.map((page) => {
      if(allPages < 9){
        return (<li key={page} className={p.currentPage == page ? 'active' : ''}>
            <a onClick={this._handleClick.bind(this, page)}>{page}</a>
          </li>
        );
      } else {
        if(page==1 || page==allPages || (page>(p.currentPage-4) && page<(p.currentPage+4))){
          return (<li key={page} className={p.currentPage == page ? 'active' : ''}>
              <a onClick={this._handleClick.bind(this, page)}>{page}</a>
            </li>
          );
        } else if(page==2 || page==allPages-1){
          return (<li key={page} style={{'margin-left': '2px'}}><a style={{cursor: 'auto'}} disabled={true}>...</a></li>);
        } else {
          return '';
        }
      }
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

export default Paginator;
