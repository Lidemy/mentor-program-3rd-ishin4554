function add(a, b) {
  let A = a;
  let B = b;
  const reZero = '0'.repeat(Math.abs(a.length - b.length));

  if (A.length > B.length) {
    B = reZero + b;
  } else {
    A = reZero + a;
  }

  const arrA = A.split('');
  const arrB = B.split('');
  const arr = [];

  for (let i = 0; i < arrA.length; i += 1) {
    arr.push(parseInt(arrA[i], 10) + parseInt(arrB[i], 10));
  }

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i] >= 10) {
      arr[i] -= 10;
      if (i !== 0) {
        arr[i - 1] = arr[i - 1] + 1;
      } else {
        arr.unshift(1);
      }
    }
  }
  return arr.join('');
}
module.exports = add;
