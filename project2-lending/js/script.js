window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Timer
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

  countTimer('24 february 2020');

  // menu 
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const hendlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu') || target.matches('.close-btn') || target.matches('ul>li>a')) {
        hendlerMenu();
      } else if (!target.closest('menu')) {
        menu.classList.remove('active-menu');
      }
    });

  };

  toggleMenu();

  // popup 
  const togglPopup = () => {
    const popup = document.querySelector('.popup'),
      btnPopup = document.querySelectorAll('.popup-btn');

    const popupOpen = () => {
      popup.style.display = 'block';
      if (screen.width >= 768) {
        popup.style.transform = 'translateY(-100%)';
        let start = Date.now();
        const open = setInterval(() => {
          let time = Date.now() - start;
          if (time >= 1000) {
            popup.style.transform = `translateY(0)`;
            popup.style.opacity = 1;
            clearInterval(open);
            return;
          }
          let top = 100 - (time / 10),
            opacity = time / 1000;
          popup.style.transform = `translateY(-${top}%)`;
          popup.style.opacity = opacity;
        }, 0);
      }
    };

    const popupClose = () => {
      if (screen.width <= 768) {
        popup.style.display = 'none';
      } else {
        let start = Date.now();
        const close = setInterval(() => {
          let time = Date.now() - start;
          if (time >= 1000) {
            popup.style.transform = `translateY(-100%)`;
            popup.style.opacity = 0;
            popup.style.display = 'none';
            clearInterval(close);
            return;
          }
          let top = (time / 10),
            opacity = 1 - (time / 1000);
          popup.style.transform = `translateY(-${top}%)`;
          popup.style.opacity = opacity;
        }, 0);
      }

    };

    btnPopup.forEach((item) => {
      item.addEventListener('click', () => {
        popupOpen();
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popupClose();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popupClose();
        }
      }
    });
  };

  togglPopup();

  // btn Down 
  const toggleBtnDown = () => {
    const main = document.querySelector('main'),
      btnDown = main.querySelector('a');

    const scrollBlock = () => {
      const href = btnDown.getAttribute('href'),
        blockForScroll = document.querySelector(href),
        topBlock = blockForScroll.offsetTop;

      const scroll = () => {
        window.scrollBy(0, 8);
        if (window.pageYOffset < topBlock) {
          requestAnimationFrame(scroll);
        }
      };

      scroll();

    };

    btnDown.addEventListener('mouseenter', () => {
      btnDown.style.transform = 'translateY(20px)';
    });

    btnDown.addEventListener('mouseleave', () => {
      btnDown.style.transform = 'translateY(0)';
    });

    btnDown.addEventListener('click', (e) => {
      e.preventDefault();
      scrollBlock();
    });

  };

  toggleBtnDown();

  // tabs 
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target.classList.contains('service-header-tab')) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

});