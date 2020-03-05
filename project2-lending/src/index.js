'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosect from 'element-closest';
elementClosect(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import toggleScroll from './modules/toggleScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhotoHover from './modules/commandPhotoHover';
import calcValid from './modules/calcValid';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('9 march 2020');
// menu 
toggleMenu();
// popup 
togglePopup();
// scroll
toggleScroll();
// tabs 
tabs();
// slider 
slider();
// смена картинки
commandPhotoHover();
// calc 
calcValid();
calc(100);
// send-ajax-form
const formMain = document.getElementById('form1'),
  formQuestion = document.getElementById('form2'),
  formPopup = document.getElementById('form3');
sendForm(formMain);
sendForm(formQuestion);
sendForm(formPopup);