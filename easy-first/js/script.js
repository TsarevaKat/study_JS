document.addEventListener('DOMContentLoaded', () => {

  'use strict';
  class DomElement {
    constructor(
      selector = '',
      position = '', top = 0, left = 0,
      height = '', width = '',
      bg = '',
      fontSize = '',
      text = '') {
      this.selector = selector;
      this.position = position;
      this.top = top;
      this.left = left;
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
      this.text = text;
    }

    addElement() {
      let block;
      const char = this.selector.charAt(0);
      if (char === '.') {
        block = document.createElement('div');
        block.classList.add(this.selector.slice(1));
      } else if (char === '#') {
        block = document.createElement('p');
        block.setAttribute('id', this.selector.slice(1));
      }
      block.style.cssText = `
        position: ${this.position};
        top: ${this.top};
        left: ${this.left};
        width: ${this.width};
        height: ${this.height};
        background: ${this.bg};
        font-size: ${this.fontSize};
      `;
      block.textContent = this.text;
      document.body.appendChild(block);
    }


  }


  const newElenent = new DomElement('#block', 'absolute', 0, 0, '100px', '100px', 'red', '', '');

  newElenent.addElement();

  const block = document.getElementById('block');
  document.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode;
    // вниз
    if (keyCode === 40) {
      let topBlock = parseInt(block.style.top) + 10;
      block.style.top = topBlock + 'px';
    }
    // вверх
    if (keyCode === 38) {
      let topBlock = parseInt(block.style.top) - 10;
      block.style.top = topBlock + 'px';
    }
    // вправо
    if (keyCode === 39) {
      let leftBlock = parseInt(block.style.left) + 10;
      block.style.left = leftBlock + 'px';
    }
    // влево
    if (keyCode === 37) {
      let leftBlock = parseInt(block.style.left) - 10;
      block.style.left = leftBlock + 'px';
    }
  });
});