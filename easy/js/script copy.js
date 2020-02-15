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
  dataInputs = document.querySelectorAll('input'),
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
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();

    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcPeriod();
    });

    dataInputs.forEach(function (item) {
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
    this.validateInputText();
    this.validateInputNumb();
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
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
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
    this.validateInputText();
    this.validateInputNumb();
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
  // расчет бюджета на  месяц и на день
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  // расчет срока достижения цели
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  // уровень бюджета
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
  },
  // условия вклада
  getInfoDeposit: function () {
    if (this.deposit) {
      let cashPercentDeposit, cashMoneyDeposit;
      do {
        cashPercentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(cashPercentDeposit));
      this.percentDeposit = cashPercentDeposit;
      do {
        cashMoneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(cashMoneyDeposit));
      this.moneyDeposite = cashMoneyDeposit;
    }
  },
  // расчет накоплений за период
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
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
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposite = 0;

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

    dataInputs.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    btnStart.style.display = 'block';
    btnStart.disabled = true;

    btnReset.style.display = 'none';
  }
};

btnStart.disabled = true;
salaryAmont.addEventListener('input', appData.btnDisabled);

let start = appData.start.bind(appData);
btnStart.addEventListener('click', start);

let reset = appData.reset.bind(appData);
btnReset.addEventListener('click', reset);

appData.validateInputText();
appData.validateInputNumb();

let addExpenses = appData.addExpennsesBlock.bind(appData);
btnAddExpenses.addEventListener('click', addExpenses);


let addIncome = appData.addIncomeBlock.bind(appData);
btnAddIncome.addEventListener('click', addIncome);
periodSelect.addEventListener('input', appData.getPeriod);