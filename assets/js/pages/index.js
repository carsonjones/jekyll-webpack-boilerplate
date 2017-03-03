import Home from './home.js'

const $main = $('main');

export default {
  init: ()=>{
    if ($main.hasClass('home-page')){
      Home.init();
    }
  }
}