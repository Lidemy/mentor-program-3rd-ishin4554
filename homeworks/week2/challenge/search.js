// BinarySearch
function search(arr, num) {
  const numArr = arr;
  let end = numArr.length - 1;
  let begin = 0;
  let half = Math.floor(begin + end / 2);
  while (begin <= end) {
    if (num !== numArr[half]) {
      if (num > numArr[half]) {
        begin = half + 1;
      } else {
        end = half - 1;
      }
      half = Math.floor((begin + end) / 2);
    } else {
      return half;
    }
  }
  return -1;
}
console.log(search([1, 3, 10, 14, 39, 50], 14));
console.log(search([1, 3, 10, 14, 39, 50], 50));
console.log(search([1, 3, 10, 14, 39], 1));
console.log(search([1, 3, 10, 14, 39], ' '));
