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

export default toggleMenu;