'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const
  income = 'фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 70000,
  period = 6;

let money, expenses = [], amount;

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
}

function showTypeOf(data) {
  console.log(typeof (data));
}

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    sum += +amount;
  }

  return sum;
}

start();
let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
  }

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
  let target = Math.ceil(mission / accumulatedMonth);
  if (target > 0) {
    console.log(`Цель будет достигнута через ${target} месяцев`);
  } else {
    console.log('Цель не будет достигнута');
  }
}

function getStatusIncome() {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }
}


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));
console.log('Расходы за месяц: ', expensesAmount);
console.log('Денюжек в день: ', budgetDay);
getTargetMonth();
getStatusIncome();