'use strict';
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const div = document.createElement('div');

function upDate() {

  let date = new Date(),
    timeHello = '',
    hours = date.getHours(),
    newYear = new Date(2020, 11, 31).getTime(),
    dayForNewYear = Math.floor((newYear - date.getTime()) / 1000 / 60 / 60 / 24);

  function time(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  if (hours > 3 && hours <= 8) {
    timeHello = 'Доброе утро';
  } else if (hours > 8 && hours <= 16) {
    timeHello = 'Добрый день';
  } else if (hours > 16 && hours <= 22) {
    timeHello = 'Добрый вечер';
  } else {
    timeHello = 'Доброй ночи';
  }
  let timeNow = date.toLocaleTimeString('en');
  div.textContent = `${timeHello}
  Сегодня ${week[date.getDay()]}, 
  Текущее время: ${timeNow}
  До нового года ${dayForNewYear} дней `;


  document.body.appendChild(div);
}
upDate();
// setInterval(upDate, 1000);
