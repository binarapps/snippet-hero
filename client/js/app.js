/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';

let CommentBox = require('./comment');

main();


function main () {
  const app = document.createElement('div');
  document.body.appendChild(app);
  // ReactDOM.render(<div>Hello world!</div>, app);
  ReactDOM.render(
    <CommentBox />,
    app
  );
}
