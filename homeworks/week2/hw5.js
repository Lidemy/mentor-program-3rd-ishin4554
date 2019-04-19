// join 會接收兩個參數：一個陣列跟一個字串，會在陣列的每個元素中間插入一個字串，最後回傳合起來的字串。
// repeat 的話就是回傳重複 n 次之後的字串。
function join(str, concatStr) {
  let newStr = '';
  for (let i = 0; i < str.length; i += 1) {
    newStr += str[i] + concatStr;
  }
  return newStr;
}

function repeat(str, times) {
  let newStr = '';
  for (let i = 0; i < times; i += 1) {
    newStr += str;
  }
  return newStr;
}

console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(repeat('yoyo', 2));
