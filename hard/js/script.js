const userString = prompt('Введите строку');

function processingString(str) {
  if (!isNaN(str)) {
    console.log('Это не строка');
    return 0;
  }

  str = str.replace(/^\s*/, '').replace(/\s*$/, '');

  if (str.length > 30) {
    str = str.slice(0, 30);
    str += '...';
  }
  console.log(str);
  return 0;
}

processingString(userString);