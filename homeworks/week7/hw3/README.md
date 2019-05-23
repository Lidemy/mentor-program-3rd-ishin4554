# 需求邏輯
計算機，輸入數字，按運算，輸入數字，按運算 ... 最後等於的時候會終止結果，可以透過 c 來消除全部的運算（沒有區分 ac 連符號消除, c 數字消除的區別）

# 第一版回顧
*注意：第一版心得是在四周後以回憶的方式撰寫，盡可能還原但可能會與現實有一點點差別。*

原本的核心邏輯比較複雜，因為家用計算機在計算上除了上述的功能完還有一個表現：**如果你重複按運算符號、他會根據上一個數字重複計算**，原本基於這個邏輯下去規劃，但發現以原本預計的時間來說過於複雜，所以止於需求中敘述的邏輯。

根據這個邏輯計算機會分成三個部分：
1. 顯示：把數據顯示在螢幕上
2. 運算：判斷按到哪個運算進行加減乘除
3. 數字：分別為提取數字、轉換小數點跟轉換數字。

理想的狀態中，顯示應該會跟著背後的一個數字 array 來變動，所以顯示的部分是直接刷新，會把輸入過的數字存在一個暫存的 array 之中，每一次輸入就會把 array `join` 起來刷新頻幕，而消除畫面的做法也同樣是對 array 用 `splice(0, length)` 進行清空。除了顯示上有 array 來儲存輸入數字的變動，同時也有一個實際再進行運算的數字以總和的方式在進行運算。

而在顯示的過程中，有一個大問題，小數點的呈現方式，如果今天 array 都是數字可以 `toString` 了事，但涉及小數點的換算就需要再多一層處理。所以根據上述運算會被拆解成：加減乘除的運算與換算，換算的部分是抓取小數點出現的位置進行 10 次方的換算，這邊學到 `Math.pow` 的新語法 ** 滿好用的。

接著加減乘除的部分，因應加減乘除要對不同的符號最不同的處理，在不使用 `eval()` 的情況下 [^1]，最後是寫 switch case 來處理。而整個計算機的 listener 基本上學以致用使用 bubbling 來抓按鈕，用這個方式來接收數字。

# 第二版重構
*注意：本版以 clean code 為目標進行重構*

重構的過程中覺得架構的方向沒有錯，但資料架構上應該可以在被優化，有沒有可能是 **只有輸入過程的數據** 就能進行運算？

回想起前四週的課，以資料結構來說，這邊複習了 Queue 跟 Stack 的概念，javascript 的 enqueue 跟 dequeue 是用 `shift()`, `unshift()` ， 而 Stack 是 `push()`, `pop()` 來達成原本的邏輯部分會變成這樣：

1. 顯示：由於顯示的過程中會遇到匯入的數字狀態不同（有時是 array 有時已經轉換成 number)，所以第一次用了 `typeof` 來做類型判斷。
2. 運算：每遇到符號先 `pop()` 掉符號作為 condition，接著 `shift()` 前面的所有數字，接著對總和進行運算。
3. 轉換：把小數字串變成小數，這邊發現其實 `Number()` 語法可以直接偵測小數非常方便。

其中寫的時候覺得資料鍊太長有一些維護上的困難，不一定這樣整合就是一件好事。

# 第三版 OOP 重構
*注意：本版以物件導向為目標進行重構*

這次想了很久應該以什麼為單位去打包？後來決定以處理數字的數字串資料為中心與處理數字串資料的一系列 method 作為物件來做設計。

1. 這次比較能掌握使用 `set`, `get` 的時機，不要忘記 constructor 出來的 variable 盡量使用 get, set 來做處理，做到封裝的效果。
2. 物件對於要 initate 的事情滿適合的，因為我只要開啟新物件就好，不需要特別做什麼清理值（也不用重新宣告一堆東西）。
3. 過程中其實有一度想要把 utility 也打包成物件，但是好像沒有比較好用，所以就還是有一些散亂的 functions 在外面。

這週作業做到這邊發現，基本上第二次 refactor 如果整理得漂亮，對於後續程式設計很有幫助。

# Code Review 

這種寫法[介於刷新跟 append 的寫法](https://github.com/Lidemy/mentor-program-3rd-nofear195/blob/master/homeworks/week7/hw3/index.html)，其實應該可以直接 `show.innerText += e.target.getAttribute('data-value')` 就不用讓 innerText 大更新了。
```javascript
//by nofear
first += e.target.getAttribute('data-value')
show.innerText = first
```

第一次看到 case 一行寫玩，螢幕寬的時候還滿好讀的。
```javascript
//by sevensplus
switch (calC){
    case 'add': document.querySelector('.display').innerText = parseFloat(numA, 10) + parseFloat(numB, 10); break;
    case 'min': document.querySelector('.display').innerText = parseFloat(numA, 10) - parseFloat(numB, 10); break;
    case 'mul': document.querySelector('.display').innerText = parseFloat(numA, 10) * parseFloat(numB, 10); break;
    case 'div': document.querySelector('.display').innerText = parseFloat(numA, 10) / parseFloat(numB, 10); break;
  }
```

比較少看到，回憶起 callback 不要加 ()，不然傳的就不是 function 位置而是回傳值的位置。
```javascript
//by sevensplus
document.querySelector(`#${cals[i].id}`).addEventListener('click', cal__remember);
```


