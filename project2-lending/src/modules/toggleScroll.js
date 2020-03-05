const toggleScroll = () => {
  const main = document.querySelector('main'),
    btnDown = main.querySelector('a'),
    menuItems = document.querySelectorAll('menu ul>li');

  const scrollBlock = (btn) => {
    const href = btn.getAttribute('href'),
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
    scrollBlock(btnDown);
  });

  menuItems.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault();
    scrollBlock(e.target);
  }));

};

export default toggleScroll;