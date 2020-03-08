const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    btnPopup = document.querySelectorAll('.popup-btn');

  const popupOpen = () => {
    popup.style.display = 'block';
    if (screen.width > 768) {
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

export default togglePopup;