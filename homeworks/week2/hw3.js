// 給定一個字串，請「印出」反轉之後的樣子
function reverse(str) {
  const newStr = [];
  for (let i = str.length - 1; i >= 0; i -= 1) {
    newStr.push(str[i]);
  }
  console.log(newStr.join(''));
}

reverse('1,2,3,2,1');
