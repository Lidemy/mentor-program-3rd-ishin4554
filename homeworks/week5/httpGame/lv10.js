const request = require('request');

const numLs = [];


// permutation swap
function swap(arr, i, j) {
  const temp = arr[j];
  const tempArr = arr;
  tempArr[j] = arr[i];
  tempArr[i] = temp;
  return tempArr;
}

// permutation
function permutate(num) {
  const ls = [];
  for (let i = 0; i < num.length; i += 1) {
    swap(num, 0, 1);
    for (let j = 0; j < num.length - 1; j += 1) {
      ls.push(swap(num, 2, 3).join(''));
      ls.push(swap(num, 1, 2).join(''));
    }
  }
  return ls;
}

// premutationGuess
function premutationGuess(num) {
  request.get(`https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}&num=${num}`,
    (err, res, body) => {
      if (body.length !== 4) {
        console.log(num + body);
      }
    });
}


// upload number to guess
function guess(num, i) {
  request.get(`https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}&num=${num}`,
    (err, res, body) => {
      if (body !== '0A0B') {
        numLs.push(i);
        if (numLs.length === 4) {
          const endLs = permutate(numLs);
          endLs.forEach(n => premutationGuess(n));
        }
      }
    });
}

// guess setup
const firstNumStr = [0, 0, 0, 0];

for (let i = 0; i <= 9; i += 1) {
  firstNumStr[0] = i;
  guess(firstNumStr.join(''), i);
}
