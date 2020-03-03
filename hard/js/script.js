'use strict';
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let arr = [], arrItem, index = 1;

do {
  do {
    arrItem = prompt(`Введиите число (${index}-ое)`);
  } while (!isNumber(arrItem));
  index++;
  arr.push(arrItem);
} while (index <= 7);

console.log(arr);

let filterArr = arr.filter((item) => (item.match(/^2/) || item.match(/^4/)));

console.log(filterArr);

let numSimple = [];
index = 1;
do {
  numSimple.push(index);
  index++;
} while (index <= 100);

numSimple.filter((item) => {
  if (item > 2) {
    index = 2;
    do {
      if (item % index === 0) {
        return false;
      }
      index++;
    } while (index < item);
  }
  console.log(item, `Делители этого числа: 1 и ${item}`);
  return true;
});