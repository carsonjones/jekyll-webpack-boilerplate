/**
 * Main.js
 * Client-Side JS Bootsrap
 * Loads pages and components
 */

import Components from './components';
import Pages from './pages';

import '../../_sass/main.scss';
// TODO: resolve this in webpack alias

function init(){
  Components.init();
  Pages.init();
}

document.addEventListener('DOMContentLoaded', (event)=> { init(); });