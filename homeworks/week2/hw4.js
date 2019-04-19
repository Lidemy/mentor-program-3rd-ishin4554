// 寫出一個函式來「印出」所有的因數
function printFactor(n) {
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      console.log(i);
    }
  }
}

printFactor(10);
