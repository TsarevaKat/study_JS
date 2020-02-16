'use strict';
document.addEventListener('DOMContentLoaded', ()=>{

  let btnStart = document.getElementById('start'),
    btnReset = document.getElementById('cancel'),
    btnAddIncome = document.getElementsByTagName('button')[0],
    btnAddExpenses = document.getElementsByTagName('button')[1],
    checkDeposid = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
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

  class AppData {
    constructor() {
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
    }
  }

  // запуск
  AppData.prototype.start = function () {

    this.budget = +salaryAmont.value;

    this.getExpInc();

    this.getAddIncome();
    this.getAddExpenses();

    this.getBudget();
    this.showResult();
    // this.getStatusIncome();
    btnStart.style.display = 'none';
    btnReset.style.display = 'block';
  };

  // проверка на число
  AppData.prototype.isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  // левый столбец с результатами
  AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = _this.calcPeriod();
    });

    dataInputs.forEach( (item) => {
      item.disabled = true;
    });

  };

  // добавляем дополнительные доходы или обязательных расходы по кнопке +
  AppData.prototype.addExpIncBlock = function (e) {
    const count = function(item) {
      const startStr = item[0].className.split('-')[0],
            btnAdd = e.target,
            cloneItem = item[0].cloneNode(true),
            inputs = cloneItem.querySelectorAll('input');

      inputs.forEach( (item) => {
        item.value = '';
      });

      item[0].parentNode.insertBefore(cloneItem, btnAdd);
      item = document.querySelectorAll(`.${startStr}-items`);
      textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
      sumInputs = document.querySelectorAll('input[placeholder="Сумма"]');
      dataInputs = document.querySelectorAll('input');
      if (item.length === 3) {
        btnAdd.style.display = 'none';
      }
    };
    
    if (e.target === btnAddIncome) {
      count(incomeItems);
    } else {
      count(expensesItems);
    }
    
    this.validateInputText();
    this.validateInputNumb();

  };  

  // получиаем обязательные расходы и доходы, записываем в массив
  AppData.prototype.getExpInc = function () {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value,
            itemAmount =item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
      const month = `${startStr}Month`;
      this[month] += +itemAmount;
      console.log('this[month]: ', this[month]);
      console.log('+itemAmount: ', +itemAmount);
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

  };

  // считывам возможные расходы
  AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  };

  // считываем возможные доходы
  AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItems.forEach( (item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  };

  // расчет бюджета на  месяц и на день
  AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };

  // расчет срока достижения цели
  AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  };

  // уровень бюджета
  AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) {
      console.log(`У вас высокий уровень дохода`);
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      console.log(`У вас средний уровень дохода`);
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log(`К сожалению у вас уровень дохода ниже среднего`);
    } else {
      console.log(`Что то пошло не так`);
    }
  };

  // условия вклада
  AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
      let cashPercentDeposit, cashMoneyDeposit;
      do {
        cashPercentDeposit = prompt(`Какой годовой процент?`, 10);
      }
      while (!this.isNumber(cashPercentDeposit));
      this.percentDeposit = cashPercentDeposit;
      do {
        cashMoneyDeposit = prompt(`Какая сумма заложена?`, 10000);
      }
      while (!this.isNumber(cashMoneyDeposit));
      this.moneyDeposite = cashMoneyDeposit;
    }
  };

  // расчет накоплений за период
  AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
  };

  AppData.prototype.getPeriod = function () {
    periodAmount.textContent = periodSelect.value;
  };

  AppData.prototype.btnDisabled = function () {
    if (salaryAmont.value !== '') {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
    }
  };

  AppData.prototype.validateInputText = function () {
    textInputs.forEach( (item) => {
      item.addEventListener('keypress', function (event) {
        let reg = /[^-:;?!,.а-яА-ЯёЁ\s]+$/;
        if (event.key.match(reg)) {
          event.returnValue = false;
        }
      });
    });
  };

  AppData.prototype.validateInputNumb = function () {
    sumInputs.forEach( (item) => {
      item.addEventListener('keydown', function (event) {
        if (event.key.match(/[^0-9]/)) {
          event.returnValue = false;
        }
      });
    });
  };

  // сброс
  AppData.prototype.reset = function () {
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
    inputs.forEach( (item) => {
      item.value = '';
    });
    btnAddIncome.style.display = 'block';

    while (expensesItems.length > 1) {
      expensesItems[0].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
    }
    inputs = expensesItems[0].querySelectorAll('input');
    inputs.forEach( (item) => {
      item.value = '';
    });
    btnAddExpenses.style.display = 'block';

    additionalIncomeItems.forEach( (item) => {
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

    dataInputs.forEach( (item) => {
      item.removeAttribute('disabled');
    });

    btnStart.style.display = 'block';
    btnStart.disabled = true;

    btnReset.style.display = 'none';
  };

  AppData.prototype.eventListeners = function () {
    const _this = this;
    btnStart.disabled = true;
    salaryAmont.addEventListener('input', this.btnDisabled);

    let start = _this.start.bind(_this);
    btnStart.addEventListener('click', start);
    
    let reset = _this.reset.bind(_this);
    btnReset.addEventListener('click', reset);

    this.validateInputText();
    this.validateInputNumb();

    let addExpenses = _this.addExpIncBlock.bind(_this);
    btnAddExpenses.addEventListener('click', addExpenses);
    let addIncome = _this.addExpIncBlock.bind(_this);
    btnAddIncome.addEventListener('click', addIncome);
    
    // btnAddIncome.addEventListener('click', addIncome);
    periodSelect.addEventListener('input', this.getPeriod);
  };

  const appData = new AppData();

  appData.eventListeners();

});