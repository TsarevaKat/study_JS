'use strict';
const week = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  date = new Date();

week.forEach(function (item) {
  const div = document.createElement('div');
  div.textContent = item;
  if (item === 'вс' || item === 'сб') {
    div.classList.add('weekend');
  }

  if (item === week[date.getDay()]) {
    div.classList.add('new');
  }
  document.body.appendChild(div);
})