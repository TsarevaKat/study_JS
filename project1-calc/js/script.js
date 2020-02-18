'use strict';

document.addEventListener('DOMContentLoaded', () => {

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

    // запуск
    start() {

      this.budget = +salaryAmont.value;

      this.getExpInc();

      this.getAddIncome();
      this.getAddExpenses();

      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
      // this.getStatusIncome();
      btnStart.style.display = 'none';
      btnReset.style.display = 'block';
    }

    // левый столбец с результатами
    showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      incomePeriodValue.value = this.calcPeriod();
      targetMonthValue.value = this.getTargetMonth();

      periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod();
      });

      dataInputs.forEach((item) => {
        item.disabled = true;
      });

    }

    // добавляем дополнительные доходы или обязательных расходы по кнопке +
    addExpIncBlock(e) {
      const count = function (item) {
        const startStr = item[0].className.split('-')[0],
          btnAdd = e.target,
          cloneItem = item[0].cloneNode(true),
          inputs = cloneItem.querySelectorAll('input');

        inputs.forEach((item) => {
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

    }

    // получиаем обязательные расходы и доходы, записываем в массив
    getExpInc() {
      const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value,
          itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && itemAmount !== '') {
          this[startStr][itemTitle] = +itemAmount;
        }
        const month = `${startStr}Month`;
        this[month] += +itemAmount;
      };

      expensesItems.forEach(count);
      incomeItems.forEach(count);

    }

    // считывам возможные расходы
    getAddExpenses() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      });
    }

    // считываем возможные доходы
    getAddIncome() {
      additionalIncomeItems.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      });
    }

    // расчет бюджета на  месяц и на день
    getBudget() {
      const monthDeposite = this.moneyDeposite * (this.percentDeposit / 100);
      console.log(monthDeposite);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposite;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // расчет срока достижения цели
    getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    // уровень бюджета
    getStatusIncome() {
      if (this.budgetDay >= 1200) {
        console.log(`У вас высокий уровень дохода`);
      } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
        console.log(`У вас средний уровень дохода`);
      } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        console.log(`К сожалению у вас уровень дохода ниже среднего`);
      } else {
        console.log(`Что то пошло не так`);
      }
    }

    depositHandler() {
      if (checkDeposid.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
        depositPercent.addEventListener('change', this.validatePercent);
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
        depositPercent.removeEventListener('change', this.validatePercent);
      }
    }

    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        depositPercent.style.display = 'inline-block';
        depositPercent.removeAttribute('disabled');
        depositPercent.value = '';
      } else {
        depositPercent.style.display = 'none';
        depositPercent.value = valueSelect;
        depositPercent.disabled = true;
      }
    }

    validatePercent() {
      const percent = depositPercent.value,
        numb = !isNaN(parseFloat(percent)) && isFinite(percent);
      if (!(numb) || percent > 100 || percent < 0) {
        alert('введите корректный процент');
        btnStart.disabled = true;
      } else if (salaryAmont.value !== '') {
        btnStart.disabled = false;
      }
    }
    // условия вклада
    getInfoDeposit() {
      if (this.deposit && depositPercent.value !== '' && depositAmount.value !== '') {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposite = depositAmount.value;
      }
    }git 

    // расчет накоплений за период
    calcPeriod() {
      return this.budgetMonth * periodSelect.value;
    }

    getPeriod() {
      periodAmount.textContent = periodSelect.value;
    }

    // блокировка расчета
    btnDisabled() {
      if (salaryAmont.value !== '') {
        btnStart.disabled = false;
      } else {
        btnStart.disabled = true;
      }
    }

    // валидация руских букв
    validateInputText() {
      textInputs.forEach((item) => {
        item.addEventListener('keypress', function (event) {
          let reg = /[^-:;?!,.а-яА-ЯёЁ\s]+$/;
          if (event.key.match(reg)) {
            event.returnValue = false;
          }
        });
      });
    }
    // валидация числа
    validateInputNumb() {
      sumInputs.forEach((item) => {
        item.addEventListener('keydown', function (event) {
          if (event.key.match(/[^0-9]/)) {
            event.returnValue = false;
          }
        });
      });
    }

    // сброс
    reset() {
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
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositBank.removeEventListener('change', this.changePercent);
      depositPercent.removeEventListener('change', this.validatePercent);

      while (incomeItems.length > 1) {
        console.log('incomeItems.length: ', incomeItems.length);
        incomeItems[0].remove();
        incomeItems = document.querySelectorAll('.income-items');
      }
      let inputs = incomeItems[0].querySelectorAll('input');
      inputs.forEach((item) => {
        item.value = '';
      });
      btnAddIncome.style.display = 'block';

      while (expensesItems.length > 1) {
        expensesItems[0].remove();
        expensesItems = document.querySelectorAll('.expenses-items');
      }
      inputs = expensesItems[0].querySelectorAll('input');
      inputs.forEach((item) => {
        item.value = '';
      });
      btnAddExpenses.style.display = 'block';

      additionalIncomeItems.forEach((item) => {
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

      dataInputs.forEach((item) => {
        item.removeAttribute('disabled');
      });

      btnStart.style.display = 'block';
      btnStart.disabled = true;

      btnReset.style.display = 'none';
    }

    eventListeners() {
      btnStart.disabled = true;
      salaryAmont.addEventListener('input', this.btnDisabled);

      btnStart.addEventListener('click', this.start.bind(this));

      btnReset.addEventListener('click', this.reset.bind(this));

      this.validateInputText();
      this.validateInputNumb();

      btnAddExpenses.addEventListener('click', this.addExpIncBlock.bind(this));
      btnAddIncome.addEventListener('click', this.addExpIncBlock.bind(this));

      periodSelect.addEventListener('input', this.getPeriod);

      checkDeposid.addEventListener('change', this.depositHandler.bind(this));
    }
  }

  const appData = new AppData();

  appData.eventListeners();

});