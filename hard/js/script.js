const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const arr = [];

for (let i = 0; i < 7; i++) {
  do {
    arr[i] = prompt(`Введиите число (${i + 1}-ое)`);
  } while (!isNumber(arr[i]));
}

console.log(arr);

for (let item of arr) {
  if (item.match(/^2/) || item.match(/^4/)) {
    console.log(item);
  }
}

for (let i = 2; i <= 100; i++) {
  let simpleNumber = true;

  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      simpleNumber = false;
      break;
    }
  }

  if (simpleNumber) {
    console.log(i, `Делители этого числа: 1 и ${i}`);
  }
}