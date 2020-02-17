'use strict';
class DomElement {
  constructor(selector = '', height = '', width = '', bg = '', fontSize = '', text = '') {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
  }

  addElement() {
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
}


const newElenent = new DomElement('#block', '10px', '100%', 'red', '10px', 'Красный'),
  newElenent2 = new DomElement('.block', '12px', '100%', 'orange', '12px', 'Оранжевый'),
  newElenent3 = new DomElement('.block', '14px', '100%', 'yellow', '14px', 'Желтый'),
  newElenent4 = new DomElement('.block', '16px', '100%', 'green', '16px', 'Зеленый'),
  newElenent5 = new DomElement('.block', '18px', '100%', 'blue', '18px', 'Голубой'),
  newElenent6 = new DomElement('.block', '20px', '100%', 'darkblue', '20px', 'Синий'),
  newElenent7 = new DomElement('.block', '22px', '100%', 'purple', '22px', 'Фиолетовый');

newElenent.addElement();
newElenent2.addElement();
newElenent3.addElement();
newElenent4.addElement();
newElenent5.addElement();
newElenent6.addElement();
newElenent7.addElement();

