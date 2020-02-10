'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// isText = function (e) {

//   // if (reg.test(value)) {
//   //   value = value.replace(reg, '');
//   //   input.value = value;
//   // }
// };

let btnStart = document.getElementById('start'),
  btnReset = document.getElementById('cancel'),
  btnAddIncome = document.getElementsByTagName('button')[0],
  btnAddExpenses = document.getElementsByTagName('button')[1],
  checkDeposid = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  resultInputs = document.querySelectorAll('[class*="-value"]'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmont = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('input.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  textInputs = document.querySelectorAll('input[placeholder="Наименование"]'),
  sumInputs = document.querySelectorAll('input[placeholder="Сумма"]');


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

    this.budget = +salaryAmont.value;

    this.getIncome();
    this.getIncomeMonth();

    this.getExpenses();
    this.getExpensesMonth();

    this.getAddIncome();
    this.getAddExpenses();

    this.getBudget();
    this.showResult();
    // this.getStatusIncome();
    btnStart.style.display = 'none';
    btnReset.style.display = 'block';
  },
  // левый столбец с результатами
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    incomePeriodValue.value = appData.getTargetMonth();
    targetMonthValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', function () {
      targetMonthValue.value = appData.calcPeriod();
    });

    resultInputs.forEach(function (item) {
      item.disabled = true;
    });

  },
  // добавление обязательных расходов по кнопке +
  addExpennsesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true),
      inputs = cloneExpensesItem.querySelectorAll('input');
    inputs.forEach(function (item) {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
    sumInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    if (expensesItems.length === 3) {
      btnAddExpenses.style.display = 'none';
    }
  },
  // получиаем обязательные расходы и записываем в массив
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('input.expenses-title').value,
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
    const cloneIncomeItem = incomeItems[0].cloneNode(true),
      inputs = cloneIncomeItem.querySelectorAll('input');
    inputs.forEach(function (item) {
      item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnAddIncome);
    incomeItems = document.querySelectorAll('.income-items');
    textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
    sumInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    appData.validateInputText();
    appData.validateInputNumb();
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
    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  },
  // расчет бджета на  месяц и на день
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
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
  },

  validateInputText: function () {
    textInputs.forEach(function (item) {
      item.addEventListener('keypress', function (event) {
        // let char = event.key,
        // console.log('char: ', char);
        let reg = /[^-:;?!,.а-яА-ЯёЁ\s]+$/;
        if (event.key.match(reg)) {
          event.returnValue = false;
        }

      });
    });
  },

  validateInputNumb: function () {
    sumInputs.forEach(function (item) {
      item.addEventListener('keydown', function (event) {
        if (event.key.match(/[^0-9]/)) {
          event.returnValue = false;
        }
      });
    });
  },
  reset: function () {
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.expensesMonth = 0;
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposite = 0;

    salaryAmont.value = '';

    while (incomeItems.length > 1) {
      console.log('incomeItems.length: ', incomeItems.length);
      incomeItems[0].remove();
      incomeItems = document.querySelectorAll('.income-items');
    }
    let inputs = incomeItems[0].querySelectorAll('input');
    inputs.forEach(function (item) {
      item.value = '';
    });
    btnAddIncome.style.display = 'block';

    while (expensesItems.length > 1) {
      expensesItems[0].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
    }
    inputs = expensesItems[0].querySelectorAll('input');
    inputs.forEach(function (item) {
      item.value = '';
    });
    btnAddExpenses.style.display = 'block';

    additionalIncomeItems.forEach(function (item) {
      item.value = '';
    });

    additionalExpensesValue.value = '';
    additionalExpensesItem.value = '';
    checkDeposid.checked = false;
    depositAmount.value = '';
    depositPercent.value = '';

    targetAmount.value = '';

    periodSelect.value = 1;
    periodAmount.textContent = 1;

    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';

    btnStart.style.display = 'block';
    btnStart.disabled = true;

    btnReset.style.display = 'none';
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

let start = appData.start.bind(appData);
btnStart.addEventListener('click', start);

let reset = appData.reset.bind(appData);
btnReset.addEventListener('click', reset);

appData.validateInputText();
appData.validateInputNumb();
btnAddExpenses.addEventListener('click', appData.addExpennsesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
// for (let key in appData) {
//   console.log('Наша программа включает в себя данные:');
//   console.log(`${key}: ${appData[key]}`);
// }

// appData.getExpensesString();