import React from 'react';
import ReactDOM from 'react-dom';

import Example from '../components/example';

const $body = $('body');

export default {
  init: ()=>{
    if ($body.hasClass('main-page')){
      ReactDOM.render(<Example />, document.getElementById('react__root'));
    }
  }
}