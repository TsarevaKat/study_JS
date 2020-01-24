let num = 266219,
		result;

let arr = String(num).split('');

	result = arr.reduce(function(mult, cur) {
		return mult * cur;
	});

	console.log(result);
	result **= 3;
	console.log(result);
	console.log(String(result).substr(0, 2));