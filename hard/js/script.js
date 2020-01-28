let userString = prompt('Введите строку');

function processingString(str) {
  if (typeof(str) !== 'string') {
    console.log('Это не строка');
  } else {
    // первый вариант
    console.log(str.trim());
    // второй вариант через регулярку
    console.log(str.replace(/^\s*/, '').replace(/\s*$/, ''));
  }
  if (str.length > 30) {
    str = str.substr(0, 29);
    str += '...';
    console.log(str);
  }
}

processingString(userString);