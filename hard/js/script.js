const week = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
let date = new Date();
console.log('date: ', date);
console.log(date.getDay());

for (let item of week) {
  let div = document.createElement('div');
  div.innerHTML = item;
  if (item === 'вс' || item === 'сб') {
    div.style.cssText = 'font-style: italic';
  }
  if (item === week[date.getDay()]) {
    div.style.cssText = 'font-weight: 700;';
  }
  if ((item === 'вс' || item === 'сб') && item === week[date.getDay()]) {
    div.style.cssText = 'font-style: italic;font-weight: 700;';

  }
  document.body.append(div);
}

