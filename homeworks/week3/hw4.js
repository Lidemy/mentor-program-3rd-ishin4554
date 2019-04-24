function isPalindromes(str) {
  return str === str.split('').reverse().join('');
}

module.exports = isPalindromes;
