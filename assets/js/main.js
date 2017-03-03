/**
 * Main.js
 * Client-Side JS Bootsrap
 * Loads pages and components
 */

// import Components from './components';
// import Pages from './pages';

import '../../_sass/main.scss';
// TODO: resolve this in webpack alias

import Hello from './hello';
import World from './world';

function init(){
  Hello.init();
  World.init();
  // console.log('init');
  // console.log('come on! change to js');
  // Pages.init();
}

document.addEventListener('DOMContentLoaded', (event)=> { init(); });