function stars(n) {
  const strArr = [];
  const str = '*';
  for (let i = 1; i <= n; i += 1) {
    strArr.push(str.repeat(i));
  }
  return strArr;
  // console.log(n);
}

module.exports = stars;
