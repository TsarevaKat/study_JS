'use strict';
const week = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ],
  month = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

const divA = document.createElement('div'),
  divB = document.createElement('div');

function upDate() {

  let date = new Date(),
    dayValue = date.getDate(),
    dayWeekValue = date.getDay(),
    monthValue = date.getMonth(),
    yearValue = date.getFullYear(),
    hoursValue = date.getHours(),
    minutesValue = date.getMinutes(),
    secondsValue = date.getSeconds();

  let hoursText, minutesText, secondsText;
  // варинат a
  function textType() {
    if (hoursValue % 10 === 1) {
      hoursText = 'час';
    } else if (hoursValue % 10 >= 2 && hoursValue % 10 <= 4) {
      hoursText = 'часa';
    } else {
      hoursText = 'часов';
    }

    if (minutesValue % 10 === 1) {
      minutesText = 'минута';
    } else if (minutesValue % 10 >= 2 && minutesValue % 10 <= 4) {
      minutesText = 'минуты';
    } else {
      minutesText = 'минут';
    }

    if (secondsValue % 10 === 1) {
      secondsText = 'секунда';
    } else if (secondsValue % 10 >= 2 && secondsValue % 10 <= 4) {
      secondsText = 'секунды';
    } else {
      secondsText = 'секунд';
    }

  }

  // вариант b
  function time(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  textType();

  divA.textContent = `Сегодня ${week[dayWeekValue]}, ${dayValue} ${month[monthValue]} ${yearValue} года, 
  ${hoursValue} ${hoursText} ${minutesValue} ${minutesText} ${secondsValue} ${secondsText}`;

  dayValue = time(dayValue);
  monthValue = time(monthValue);
  hoursValue = time(hoursValue);
  minutesValue = time(minutesValue);
  secondsValue = time(secondsValue);
  divB.textContent = `${dayValue}.${monthValue}.${yearValue} - ${hoursValue}:${minutesValue}:${secondsValue}`;

  document.body.appendChild(divA);
  document.body.appendChild(divB);
}

setInterval(upDate, 1000);