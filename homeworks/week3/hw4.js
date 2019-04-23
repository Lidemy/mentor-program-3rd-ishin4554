function isPalindromes(str) {
  return str === str.split('').reverse().join('');
  // console.log(str);
}

module.exports = isPalindromes;
