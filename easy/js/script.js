const books = document.querySelector('.books'),
  book = books.querySelectorAll('.book'),
  body = document.querySelector('body'),
  adv = document.querySelector('.adv');

books.insertBefore(book[1], book[0]);
books.insertBefore(book[4], book[2]);
books.removeChild(book[2]);
books.appendChild(book[2]);

body.style.cssText = 'background-image:url("../image/you-dont-know-js.jpg")';

const title = book[4].querySelector('h2 a');
title.textContent = 'Книга 3. this и Прототипы Объектов';

body.removeChild(adv);

const book5Section = book[5].querySelectorAll('li'),
  book5List = book[5].querySelector('ul');

book5List.insertBefore(book5Section[2], book5Section[6]);
book5List.insertBefore(book5Section[5], book5Section[8]);
book5List.insertBefore(book5Section[9], book5Section[3]);

const book2Section = book[0].querySelectorAll('li'),
  book2List = book[0].querySelector('ul');

book2List.insertBefore(book2Section[2], book2Section[10]);
book2List.insertBefore(book2Section[6], book2Section[4]);
book2List.insertBefore(book2Section[8], book2Section[4]);

const book6Section = book[2].querySelectorAll('li'),
  book6List = book[2].querySelector('ul'),
  newSection = book6Section[9].cloneNode();

newSection.textContent = 'Глава 8: За пределами ES6';

book6List.insertBefore(newSection, book6Section[9]);
