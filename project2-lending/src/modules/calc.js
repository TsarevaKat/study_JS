const calc = (price = 100) => {

  const calcBlock = document.querySelector('.calc-block'),
    calсType = document.querySelector('.calc-type'),
    clacSquare = document.querySelector('.calc-square'),
    clacCount = document.querySelector('.calc-count'),
    clacDay = document.querySelector('.calc-day'),
    totalValue = document.getElementById('total');

  const animateSum = (total) => {
    let tmpTotal = 0;

    const interval = setInterval(() => {
      if (tmpTotal >= total) {
        clearInterval(interval);
        return;
      }
      if (total > 0) {
        tmpTotal += 10;
        totalValue.textContent = tmpTotal;
      }
    }, 1);
  };

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calсType.options[calсType.selectedIndex].value,
      squareValue = +clacSquare.value;

    if (clacCount.value > 1) {
      countValue += (clacCount.value - 1) / 10;
    }

    if (clacDay.value && clacDay.value < 5) {
      dayValue *= 2;
    } else if (clacDay.value && clacDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    animateSum(total);
  };

  calcBlock.addEventListener('change', (e) => {
    const target = e.target;

    if (target.matches('select') || target.matches('input')) {
      countSum();
    }
  });
};

export default calc;