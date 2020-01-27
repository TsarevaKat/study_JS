let lang = prompt('Выберете язык / Choose a language (ru/en)', 'ru');

const weekRu = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  weekEn = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

// a
if (lang === 'ru') {
  console.log('Дни недели: ', weekRu);
} else if (lang === 'en') {
  console.log('Days of week: ', weekEn);
} else {
  console.log('Язык не найден / Language not found');
}

// b 
switch (lang) {
  case 'ru':
    console.log('Дни недели: ', weekRu);
    break;
  case 'en':
    console.log('Days of week: ', weekEn);
    break;
  default:
    console.log('Язык не найден / Language not found');
}

// c
let languages = {
  'ru' : weekRu,
  'en' : weekEn
}

console.log(languages[lang]);


// 2
let namePerson = prompt('Введите имя');
let statusPerson = (namePerson === 'Артем') ? console.log('директор') :
  ((namePerson === 'Максим') ? console.log('преподаватель') : console.log('студент'));