
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let
        dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        day = Math.floor(timeRemaining / 60 / 60 / 24),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        minutes = Math.floor((timeRemaining / 60) % 60),
        seconds = Math.floor(timeRemaining % 60);
      return { timeRemaining, hours, minutes, seconds };
    }

    function timeFormat(num) {
      if (num < 10) {
        num = '0' + num;
      }
      return num;
    }

    function upDateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timeFormat(timer.hours);
      timerMinutes.textContent = timeFormat(timer.minutes);
      timerSeconds.textContent = timeFormat(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(timerOn);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    let timerOn = setInterval(upDateClock, 1000);
  }


  countTimer('20 february 2020');
});