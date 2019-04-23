// 給定一字串，把第一個字轉成大寫之後「回傳」，若第一個字不是英文字母則忽略。
function capitalize(str) {
  let newStr = str;
  // str[0] >= 'a' 就可以取到 ASCII Code
  if (str[0] >= 'a' && str[0] <= 'z') {
    newStr = str.replace(str[0], str[0].toUpperCase());
  }
  return newStr;
}

console.log(capitalize(',hello'));
