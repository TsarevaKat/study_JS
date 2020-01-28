'use strict';

let money = +prompt('Ваш месячный доход?'),
  income = 10000,
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 70000,
  period = 6,
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?');

let accumulatedMonth = getAccumulatedMonth(money);
let budgetDay = Math.floor(accumulatedMonth / 30);


function showTypeOf(data) {
  console.log(typeof(data));
}

function getExpensesMonth(outlay1, outlay2) {
  return outlay1 + outlay2;
}

function getAccumulatedMonth(earnings) {
  return earnings + income - getExpensesMonth(amount1, amount2);
}

function getTargetMonth(aim, marge) {
  return Math.ceil(aim / marge);
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

console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));
console.log('До счастья: ', getTargetMonth(mission, accumulatedMonth));
console.log('Денюжек в день: ', budgetDay);
getStatusIncome();