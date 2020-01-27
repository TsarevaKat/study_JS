'use strict';

let money = +prompt('Ваш месячный доход?'),
	income = 10000,
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 70000,
	period = 6;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен `${period}` месяцев');
console.log('Цель заработать `${mission}` рублей');
console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;

console.log('На пожить (бюджет на месяц): ', budgetMonth);

console.log('До цели ползти: ' + Math.ceil(mission / budgetMonth) + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Денюжек в день: ', budgetDay);

if (budgetDay >= 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay >= 600) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}