# 作業邏輯

## 核心邏輯
設計留言板，可以分頁跟留言。

# 第一版回顧
注意：第一版心得是在四周後以回憶的方式撰寫，盡可能還原但可能會與現實有一點點差別。

留言板的要拆解的部分比較多，一開始想留言板會分成：
1. 顯示所有文章
2. 發文
3. 顯示發文
4. 分頁標籤與分頁顯示

# 第二版重構
*注意：根據 week7 作業建議，這次做一次性優化，不特別拉出 function 版本，避免在 function 上 over engineer 的問題。*

這次的作業因為很多 request，所以想要嘗試去以 request 來做 class 來設計，第一次繼承內建的物件，有很多不確定的問題，例如 `XMLHttpRequest` 有哪些 variables 我並不是很清楚，所以一開始先在 dev tool 的 console 環境查看原始物件的 variables。

接著在使用 method 的時候，一開始所想的是 this.super.method 來使用繼承的 method，沒想到不能兩個都加讓我重新審視，`this` 與 `super` 的使用狀況。根據 [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/class-extends#super-%E5%85%B3%E9%94%AE%E5%AD%97) 的介紹，`super` 有兩種使用方式意義會完全不同。

`super()` 指的是調用 parent class 的 constructor，如果沒有執行 `super()` child 就會少了 parent 的 attribute 跟 method，

```javascript
class Parent {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
}

class Child extends Parent{
  constructor(c) {
    super()
    this.c = c
  }
}
```

而 super 也可以是一個物件， `super.method` 的 super 則是指 parent **prototype object**，所以原本直覺上我的寫法 `this.super.method()` 其實等於 `obj.obj.method()` 這樣就會錯誤。

```javascript
class Parent {
  constructor() {
    //....
  }
  method() {
    console.log('HI');
  }
}

class Child extends Parent{
  constructor() {
    //...
  }
  newMethod() {
    super.method();
  }
}
```
這次也修改了直接 `JSON.parse` 的結果，用 `try & catch` 先對 `JSON.parse` 的結果進行判斷，第一次看到這個寫法做了一些研究：

在說 `try` 跟 `catch` 之前應該先討論 `throw`，根據 [MDN 的介紹](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) 跟 [這篇文章的圖解](https://ithelp.ithome.com.tw/articles/10208079)

簡單來說，當你遇到 throw 的時候他會接收你想要丟掉的東西，接著把這個東西丟出 function scope，但 `throw `丟出去的東西沒有處理就會產生錯誤，延伸出來的就是應該要有 `catch` 來接收 `throw` 的東西。
而 `try`、`catch` 其實就是這一切串起來的應用：`try` 可以執行一段程式碼，如果途中遇到 `throw` 的時候就會丟出某個內容，接著再用 `catch` 接收這個內容顯示。很適合用來做執行確認。

# Code Review
如果不 parse header 判斷頁數範圍的作法，可以直接抓所有資料下來除每頁顯示數。
```javascript
//by julypenguin
if (pageRequest.status >= 200 && pageRequest.status < 400) {
    const pageResponse = pageRequest.responseText;
    const pageJson = JSON.parse(pageResponse);
    pageTotal = Math.ceil(pageJson.length / limit);
    if (pageTotal >= 7) {
      pageTotal = 6;
    }
    for (let i = 0; i < pageTotal; i += 1) {
      pageDomRander(i);
    }
  }
```
