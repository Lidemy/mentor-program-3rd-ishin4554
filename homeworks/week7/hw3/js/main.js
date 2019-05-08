const btnsElement = document.querySelector('.calculator__btns');
const numbers = [];
let calNum = 0;
const cal = [];

function showNumbers(arr) {
  const numStr = arr.join('');
  document.querySelector('.calculator__screen').innerHTML = numStr;
}
function resetAll() {
  numbers.splice(0, numbers.length);
  cal.splice(0, cal.length);
  calNum = 0;
}
function floatJoin(numArr) {
  const dex = numArr.indexOf('.');
  if (dex !== -1) {
    numArr.splice(dex, 1);
    console.log(numArr.length - dex);
    return parseInt(numArr.join(''), 10) / (10 ** (numArr.length - dex));
  }
  return parseInt(numArr.join(''), 10);
}

btnsElement.addEventListener('click', (e) => {
  const curClick = e.target.getAttribute('data-value');
  if (curClick) {
    const curVal = e.target.getAttribute('data-value');
    console.log(curVal);
    switch (curVal) {
      case '+': {
        cal.push(curVal);
        calNum += floatJoin(numbers);
        numbers.splice(0, numbers.length);
        showNumbers(calNum.toString().split(''));
        break;
      }
      case '-':
        cal.push(curVal);
        if (cal.length <= 1) {
          calNum = floatJoin(numbers);
        } else {
          calNum -= floatJoin(numbers);
        }
        numbers.splice(0, numbers.length);
        showNumbers(calNum.toString().split(''));
        break;
      case '/':
        cal.push(curVal);
        if (cal.length <= 1) {
          calNum = floatJoin(numbers);
        } else {
          calNum /= floatJoin(numbers);
        }
        numbers.splice(0, numbers.length);
        showNumbers(calNum.toString().split(''));
        break;
      case '*':
        cal.push(curVal);
        if (cal.length <= 1) {
          calNum = floatJoin(numbers);
        } else {
          calNum *= floatJoin(numbers);
        }
        numbers.splice(0, numbers.length);
        showNumbers(calNum.toString().split(''));
        break;
      case '=':
        if (cal[cal.length - 1] === '+') {
          calNum += floatJoin(numbers);
          numbers.splice(0, numbers.length);
          showNumbers(calNum.toString().split(''));
          resetAll();
          break;
        }
        if (cal[cal.length - 1] === '-') {
          calNum -= floatJoin(numbers);
          numbers.splice(0, numbers.length);
          showNumbers(calNum.toString().split(''));
          resetAll();
          break;
        }
        if (cal[cal.length - 1] === '/') {
          calNum /= floatJoin(numbers);
          numbers.splice(0, numbers.length);
          showNumbers(calNum.toString().split(''));
          resetAll();
          break;
        }
        if (cal[cal.length - 1] === '*') {
          calNum *= floatJoin(numbers);
          numbers.splice(0, numbers.length);
          showNumbers(calNum.toString().split(''));
          resetAll();
          break;
        }
        break;
      case 'AC':
        resetAll();
        showNumbers(['']);
        break;
      default:
        numbers.push(curVal);
        showNumbers(numbers);
        break;
    }
  }
});
