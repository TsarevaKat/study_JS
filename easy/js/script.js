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
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  resultInputs = document.querySelectorAll('[class*="-value"]'),
  salaryAmont = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');


let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposite: 0,
  start: function () {

    appData.budget = +salaryAmont.value;

    appData.getIncome();
    appData.getIncomeMonth();

    appData.getExpenses();
    appData.getExpensesMonth();

    appData.getAddIncome();
    appData.getAddExpenses();

    appData.getBudget();
    appData.showResult();
    // appData.getStatusIncome();

  },
  // левый столбец с результатами
  showResult: function () {
    resultInputs[0].value = appData.budgetMonth;
    resultInputs[1].value = appData.budgetDay;
    resultInputs[2].value = appData.expensesMonth;
    resultInputs[4].value = appData.addExpenses.join(', ');
    resultInputs[3].value = appData.addIncome.join(', ');
    resultInputs[6].value = appData.getTargetMonth();
    resultInputs[5].value = appData.calcPeriod();

    periodSelect.addEventListener('input', function () {
      resultInputs[5].value = appData.calcPeriod();
    });

  },
  // добавление обязательных расходов по кнопке +
  addExpennsesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    console.log('expensesItems: ', expensesItems);
    if (expensesItems.length === 3) {
      btnAddExpenses.style.display = 'none';
    }
  },
  // получиаем обязательные расходы и записываем в массив
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  // считывам возможные расходы
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  // все расходы за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  // добавляем дополнительные доходы по кнопке +
  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnAddIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnAddIncome.style.display = 'none';
    }
  },
  // получаем дополнительные доходы и записываем в мыссив
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
  },
  // считываем возможные доходы
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  // все доп.доходы за месяц
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  // расчет бджета на  месяц и на день
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // расчет срока достижения цели
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
    // if (target > 0) {
    //   console.log(`Цель будет достигнута через ${target} месяцев`);
    // } else {
    //   console.log('Цель не будет достигнута');
    // }
  },
  // уровень бюджета
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
  // условия вклада
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
  // расчет накоплений за период
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  getPeriod: function () {
    periodAmount.textContent = periodSelect.value;
  },
  btnDisabled: function () {
    if (salaryAmont.value !== '') {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
    }
  }
  // getExpensesString: function () {
  //   const arr = appData.addExpenses.map(function (item) {
  //     return item.charAt().toUpperCase() + item.slice([1]);
  //   });
  //   console.log('arr: ', arr.join(', '));
  // }
};

btnStart.disabled = true;

salaryAmont.addEventListener('input', appData.btnDisabled);
btnStart.addEventListener('click', appData.start)

btnAddExpenses.addEventListener('click', appData.addExpennsesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
// for (let key in appData) {
//   console.log('Наша программа включает в себя данные:');
//   console.log(`${key}: ${appData[key]}`);
// }

// appData.getExpensesString();