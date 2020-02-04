'use strict';
const week = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  date = new Date();

const div = document.createElement('div');

div.textContent = `Сегодня ${week[date.getDay()]}`;

document.body.appendChild(div);
