function multiple(a, b) {
  const allMulLs = [];
  const editSumLs = [];
  const sumLs = [];
  for (let i = b.length - 1; i >= 0; i -= 1) {
    const mulLs = [];
    for (let j = a.length - 1; j >= 0; j -= 1) {
      mulLs.push(b[i] * a[j]);
    }
    allMulLs.push(mulLs);
  }
  allMulLs.forEach((arr, i) => {
    const fz = '0'.repeat(i).split('');
    const bz = '0'.repeat(Math.abs(i - allMulLs.length)).split('');
    editSumLs.push(fz.concat(arr).concat(bz));
  });
  for (let i = 0; i < editSumLs[0].length; i += 1) {
    let sum = 0;
    for (let j = 0; j < editSumLs.length; j += 1) {
      sum += Number(editSumLs[j][i]);
    }
    sumLs.push(sum);
  }
  for (let i = 0; i < sumLs.length; i += 1) {
    const next = Math.floor(sumLs[i] / 10);
    sumLs[i] %= 10;
    if ((i + 1) < sumLs.length) {
      sumLs[i + 1] += next;
    } else {
      break;
    }
  }
  return sumLs.reverse().join('').replace(/^[0]+/, '');
}
console.log(multiple('999', '9999'));
console.log(multiple('9999', '999'));
console.log(multiple('223', '112'));
console.log(multiple('6342', '1'));


module.exports = multiple;
