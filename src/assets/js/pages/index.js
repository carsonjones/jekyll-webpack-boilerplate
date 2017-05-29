import React from 'react';
import ReactDOM from 'react-dom';

import Example from '../components/example';
import Home from './home.js';


const $body = $('body');

export default {
  init: ()=>{
    if ($body.hasClass('main-page')){
      ReactDOM.render(<Example />, document.getElementById('react__root'));
      Home.init();
    }
  }
}