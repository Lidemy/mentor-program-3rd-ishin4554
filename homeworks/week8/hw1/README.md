# 作業邏輯

## 核心邏輯
要設計一個抽獎網站，根據不同獎項顯示不同頁面。

## 其他部分
- 一個 loading 畫面 

# 第一版回顧
注意：第一版心得是在四周後以回憶的方式撰寫，盡可能還原但可能會與現實有一點點差別。

網站的邏輯很簡單，針對 json 回傳的結果進行判斷，並根據不同判斷的結果呈現畫面，所以花很多精力在呈現 loading 畫面的部分，讓程式的結構變得比較複雜。

1. 閃爍效果：

原本想要挑戰類似博弈機台那種 777 的風格，所以想要挑戰柵欄式的感覺，但因應題目還是要有原始圖的狀態，所以利用一個 3*3 的 `<li>` 元素來做柵欄，透過交互加入白色背景，來做 loading 畫面。

過程中透過 `setInterval()` 反覆執行白色背景的切換來達成閃爍的感覺，這邊先讓原本一排三個的 li 本來就有交錯的 class，這樣之後只要 toggle 全部的 方塊自然看起來會像是閃爍的感覺，就不需要去抓奇偶數方塊進行切換。

2. json：利用 `XMLHttpRequest()` 來 call API 以此得到回傳結果，利用 switch case 來切換不同的 object 做畫面中的 style 切換。

# 第二版重構
*注意：根據 week7 作業建議，這次做一次性優化，不特別拉出 function 版本，避免在 function 上 over engineer 的問題。*

這次的作業本來在 switch case 的部分就有使用 object 來儲存，所以實作 OOP 的時候也是跟隨著原本的思路以不同獎項來設定 object，這邊也想要練習自己課外在學習的新東西 canvas，把原本利用 html 操作的閃爍效果用這 canvas 做做看。

在 OOP 之中，把不同獎項的 css 作為物件的 variable 並把相關執行效果的 function 放在 Prize 的 class methods 之中。

canvas 則優化起始 html 然後塞一大堆 html text 的問題，原本直覺是用 for loop 與 `setTimeOut`，但 loop 與 `setTimeOut` 的 scope 問題與 `clearRect` 的時間問題一直拿捏不好，最後使用 `setInterval` 跟 if 來實踐。

# Code Review

看到這段的 code review 才意識到，其實效果用 `setInterval`，最後在下方的 `setTimeOut` 用 `clearInterval`其實比較好，因為這樣他就可以在 request 的 `setTimeOut` 裡面跑好跑滿，就不用擔心 `setTimeOut` 的時間是不是剛好。
```javascript
// julypenguin
setTimeout(() => {
    request.open('GET', url, true);
    request.send();
  }, 1000);
```

