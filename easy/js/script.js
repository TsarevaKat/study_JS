'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isText = function (n) {
    if (/\d/.test(n) || n === null || n.trim() === '') {
      return false;
    } else {
      return true;
    }
  };

let btnStart = document.getElementById('start'),
  btnAddIncome = document.getElementsByTagName('button')[0],
  btnAddExpenses = document.getElementsByTagName('button')[1],
  checkDeposid = document.querySelector('#deposit-check'),
  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  resultInputs = document.querySelectorAll('[class*="-value"]'),
  salaryAmont = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpensesItem = document.querySelectorAll('.additional_expenses-item'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');


let appData = {
  budget: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposite: 0,
  mission: 70000,
  period: 6,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    if (salaryAmont.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быт заполнено');
      return;
    }
    appData.budget = salaryAmont.value;
    // appData.asking();

    // appData.getExpensesMonth();
    // appData.getBudget();
    // appData.getTargetMonth();
    // appData.getStatusIncome();

  },

  addExpennsesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    console.log('expensesItems: ', expensesItems);
    if (expensesItems.length === 3) {
      btnAddExpenses.style.display = 'none';
    }
  },

  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
      } while (!isText(itemIncome));

      do {
        cashIncome = prompt('сколько зарабатываете на этом в месяц?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы через запятую');
    }
    while (addExpenses === null || addExpenses.trim() === '');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit();
    for (let i = 0; i < 2; i++) {
      let itemExpenses, cashExpenses;
      do {
        itemExpenses = prompt('Введите обязательную статью расходов?', 'квартира');
      } while (!isText(itemExpenses));
      do {
        cashExpenses = prompt('Во сколько это обойдется?', 5000);
      } while (!isNumber(cashExpenses));
      appData.expenses[itemExpenses] = +cashExpenses;
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
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      let cashPercentDeposit, cashMoneyDeposit;
      do {
        cashPercentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(cashPercentDeposit));
      appData.percentDeposit = cashPercentDeposit;
      do {
        cashMoneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(cashMoneyDeposit));
      appData.moneyDeposite = cashMoneyDeposit;
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
  getExpenses: function () {
    const arr = appData.addExpenses.map(function (item) {
      return item.charAt().toUpperCase() + item.slice([1]);
    });
    console.log('arr: ', arr.join(', '));
  }
};

btnStart.addEventListener('click', appData.start)
btnAddExpenses.addEventListener('click', appData.addExpennsesBlock);

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные:');
//   console.log(`${key}: ${appData[key]}`);
// }

// appData.getExpenses();