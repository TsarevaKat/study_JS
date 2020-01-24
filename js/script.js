let money = 25000,
	income = 10000,
	addExpenses = 'Комуналка, Проезд, Подарки, Посиделки, Встречи',
	deposit = false,
	mission = 70000,
	period = 6;
let budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);