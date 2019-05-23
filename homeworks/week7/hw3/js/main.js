let lastHandler = '';
let isFirst = true;

class Numbers {
  constructor(acc = 0, clickLs = []) {
    this.aacc = acc;
    this.clickLs = clickLs;
  }

  get acc() {
    return this.aacc;
  }

  set acc(value) {
    this.aacc = value;
  }

  getNumberStr() {
    let numStr = '';
    let num = this.clickLs.shift();
    while (typeof num !== 'undefined') {
      numStr += num;
      num = this.clickLs.shift();
    }
    return numStr;
  }

  handleCal(handler) {
    if (isFirst) {
      this.acc = Number(this.getNumberStr());
      isFirst = false;
    } else {
      if (handler === '+') {
        this.acc += Number(this.getNumberStr());
      }
      if (handler === '-') {
        this.acc -= Number(this.getNumberStr());
      }
      if (handler === '*') {
        this.acc *= Number(this.getNumberStr());
      }
      if (handler === '/') {
        this.acc /= Number(this.getNumberStr());
      }
    }
  }

  get handler() {
    return this.clickLs.pop();
  }
}

// Utility
function dq(selector) {
  return document.querySelector(selector);
}

function showNumbers(numbers) {
  if (typeof numbers !== 'number') {
    dq('.calculator__screen').innerHTML = numbers.join('');
  } else {
    dq('.calculator__screen').innerHTML = numbers.toString();
  }
}

let clickset = new Numbers();

// reset function
function resetAll() {
  clickset = new Numbers();
  lastHandler = '';
  isFirst = true;
}

// btn click
dq('.calculator__btns').addEventListener('click', (e) => {
  const curClick = e.target.getAttribute('data-value');
  if (curClick) {
    clickset.clickLs.push(curClick);
    switch (curClick) {
      case '+':
      case '-':
      case '*':
      case '/':
        lastHandler = clickset.handler;
        clickset.handleCal(lastHandler);
        showNumbers(clickset.acc);
        break;
      case '=':
        clickset.clickLs.pop();
        clickset.handleCal(lastHandler);
        showNumbers(clickset.acc);
        resetAll();
        break;
      case 'AC':
        resetAll();
        showNumbers(clickset.clickLs);
        break;
      default:
        showNumbers(clickset.clickLs);
        break;
    }
  }
});
