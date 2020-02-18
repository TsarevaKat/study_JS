'use strict';
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

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
    if (hoursValue === 1 || hoursValue === 21) {
      hoursText = 'час';
    } else if ((hoursValue >= 2 && hoursValue <= 4) || (hoursValue >= 22 && hoursValue <= 24)) {
      hoursText = 'часa';
    } else {
      hoursText = 'часов';
    }

    if (minutesValue === 1 || minutesValue === 21 || minutesValue === 31 || minutesValue === 41 || minutesValue === 51) {
      minutesText = 'минута';
    } else if ((minutesValue >= 2 && minutesValue <= 4) || (minutesValue >= 22 && minutesValue <= 24) || (minutesValue >= 32 && minutesValue <= 34) || (minutesValue >= 42 && minutesValue <= 44) || (minutesValue >= 52 && minutesValue <= 54)) {
      minutesText = 'минуты';
    } else {
      minutesText = 'минут';
    }

    if (secondsValue === 1 || secondsValue === 21 || secondsValue === 31 || secondsValue === 41 || secondsValue === 51) {
      secondsText = 'секунда';
    } else if ((secondsValue >= 2 && secondsValue <= 4) || (secondsValue >= 22 && secondsValue <= 24) || (secondsValue >= 32 && secondsValue <= 34) || (secondsValue >= 42 && secondsValue <= 44) || (secondsValue >= 52 && secondsValue <= 54)) {
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

  divA.textContent = `Сегодня ${week[dayWeekValue]}, ${dayValue} ${month[monthValue]} ${yearValue} года, ${hoursValue} ${hoursText} ${minutesValue} ${minutesText} ${secondsValue} ${secondsText}`;

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
