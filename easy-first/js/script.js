const DomElement = function () {
  this.selector = '';
  this.height = '';
  this.width = '';
  this.bg = '';
  this.fontSize = '';
  this.text = '';
}

DomElement.prototype.addElement = function () {

  let block;
  const char = this.selector.charAt(0);
  console.log('char: ', char);
  if (char === '.') {
    block = document.createElement('div');
    block.classList.add(this.selector.slice(1));
  } else if (char === '#') {
    block = document.createElement('p');
    block.setAttribute('id', this.selector.slice(1));
  }
  block.style.cssText = `
    width: ${this.width};
    height: ${this.height};
    background: ${this.bg};
    font-size: ${this.fontSize};
  `;
  block.textContent = this.text;
  document.body.appendChild(block);
}

const newElenent = new DomElement(),
  newElenent2 = new DomElement(),
  newElenent3 = new DomElement(),
  newElenent4 = new DomElement(),
  newElenent5 = new DomElement(),
  newElenent6 = new DomElement(),
  newElenent7 = new DomElement();

newElenent.selector = '#block';
newElenent.height = '10px';
newElenent.width = '100%';
newElenent.bg = 'red';
newElenent.fontSize = '10px';
newElenent.text = 'Красный';
newElenent.addElement();

newElenent2.selector = '.block';
newElenent2.height = '12px';
newElenent2.width = '100%';
newElenent2.bg = 'orange';
newElenent2.fontSize = '12px';
newElenent2.text = 'Оранжевый';
newElenent2.addElement();

newElenent3.selector = '.block';
newElenent3.height = '14px';
newElenent3.width = '100%';
newElenent3.bg = 'yellow';
newElenent3.fontSize = '14px';
newElenent3.text = 'Желтый';
newElenent3.addElement();

newElenent4.selector = '.block';
newElenent4.height = '16px';
newElenent4.width = '100%';
newElenent4.bg = 'green';
newElenent4.fontSize = '16px';
newElenent4.text = 'Зеленый';
newElenent4.addElement();

newElenent5.selector = '.block';
newElenent5.height = '18px';
newElenent5.width = '100%';
newElenent5.bg = 'blue';
newElenent5.fontSize = '18px';
newElenent5.text = 'Голубой';
newElenent5.addElement();

newElenent6.selector = '.block';
newElenent6.height = '20px';
newElenent6.width = '100%';
newElenent6.bg = 'darkblue';
newElenent6.fontSize = '20px';
newElenent6.text = 'Синий';
newElenent6.addElement();

newElenent7.selector = '.block';
newElenent7.height = '22px';
newElenent7.width = '100%';
newElenent7.bg = 'purple';
newElenent7.fontSize = '22px';
newElenent7.text = 'Фиолетовый';
newElenent7.addElement();

