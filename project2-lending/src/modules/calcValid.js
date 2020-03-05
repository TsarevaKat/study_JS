const calcValid = () => {
  const calc = document.querySelector('.calc-block');

  calc.addEventListener('input', (e) => {
    const target = e.target;
    if (target.matches('input.calc-item')) {
      target.value = target.value.replace(/[\D]/, '');
    }
  });
};

export default calcValid;