'use strict';
let money;
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?');
    } while (!isNumber(money));
  };

start();

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 70000,
  period: 6,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    const addExpenses = prompt('Перечислите возможные расходы через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      const expense = prompt('Введите обязательную статью расходов?');
      let amount;
      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
      appData.expenses[expense] = +amount;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let target = Math.ceil(appData.mission / appData.budgetMonth);
    if (target > 0) {
      console.log(`Цель будет достигнута через ${target} месяцев`);
    } else {
      console.log('Цель не будет достигнута');
    }
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ', appData.expensesMonth);
// console.log('Денюжек в день: ', appData.budgetDay);
appData.getTargetMonth();
appData.getStatusIncome();

for (let key in appData) {
  console.log('Наша программа включает в себя данные:');
  console.log(`${key}: ${appData[key]}`);
}