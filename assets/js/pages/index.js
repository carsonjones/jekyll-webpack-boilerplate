import Main from './main.js'

const $body = $('body');

export default {
  init: ()=>{
    if ($body.hasClass('margin-page')){
      Main.init();
    }
  }
}