import React from 'react';

// TODO create tests
export default class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      padding: '20px 10px'
    };
  }

  render() {
    let { style, ...props } = this.props;
    Object.assign(this.style, style);
    return (
      <div className="page-wrapper" style={this.style} {...props}>
        {this.props.children}
      </div>
    );
  }
}
