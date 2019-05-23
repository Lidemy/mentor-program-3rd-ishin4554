const clickLs = [];
let acc = 0;
let lastHandler = '';
let isFirst = true;

// Utility
function dq(selector) {
  return document.querySelector(selector);
}

// Show numbers
function getNumberStr() {
  let numStr = '';
  let num = clickLs.shift();
  while (typeof num !== 'undefined') {
    numStr += num;
    num = clickLs.shift();
  }
  return numStr;
}
function showNumbers(numbers) {
  if (typeof numbers !== 'number') {
    dq('.calculator__screen').innerHTML = numbers.join('');
  } else {
    dq('.calculator__screen').innerHTML = numbers.toString();
  }
}

// Calculate function
function handleCal(handler) {
  if (isFirst) {
    acc = Number(getNumberStr());
    isFirst = false;
  } else {
    if (handler === '+') {
      acc += Number(getNumberStr());
    }
    if (handler === '-') {
      acc -= Number(getNumberStr());
    }
    if (handler === '*') {
      acc *= Number(getNumberStr());
    }
    if (handler === '/') {
      acc /= Number(getNumberStr());
    }
  }
}

// reset function
function resetAll() {
  clickLs.splice(0, clickLs.length);
  acc = 0;
  lastHandler = '';
  isFirst = true;
}

// btn click
dq('.calculator__btns').addEventListener('click', (e) => {
  const curClick = e.target.getAttribute('data-value');
  if (curClick) {
    clickLs.push(curClick);
    switch (curClick) {
      case '+':
      case '-':
      case '*':
      case '/':
        lastHandler = clickLs.pop();
        handleCal(lastHandler);
        showNumbers(acc);
        break;
      case '=':
        clickLs.pop();
        handleCal(lastHandler);
        showNumbers(acc);
        resetAll();
        break;
      case 'AC':
        resetAll();
        showNumbers(clickLs);
        break;
      default:
        showNumbers(clickLs);
        break;
    }
  }
});
