const countTimer = (deadline) => {
  let timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaining = () => {
    let
      dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      day = Math.floor(timeRemaining / 60 / 60 / 24),
      hours = Math.floor(timeRemaining / 60 / 60) % 24,
      minutes = Math.floor((timeRemaining / 60) % 60),
      seconds = Math.floor(timeRemaining % 60);
    return {
      timeRemaining,
      hours,
      minutes,
      seconds
    };
  };

  const timeFormat = (num) => {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  };

  const upDateClock = setInterval(() => {
    let timer = getTimeRemaining();

    timerHours.textContent = timeFormat(timer.hours);
    timerMinutes.textContent = timeFormat(timer.minutes);
    timerSeconds.textContent = timeFormat(timer.seconds);

    if (timer.timeRemaining <= 0) {
      clearInterval(upDateClock);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  }, 1000);
};

export default countTimer;