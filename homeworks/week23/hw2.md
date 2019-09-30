## 為什麼我們需要 Redux？
因為有些在 state 裡面的變數跟一些 function 跟可能很多元件都要用，所以在 react 裡面如果我們要把這些東西都放在母元件的 state 裡面的話，一路傳下去會非常麻煩，所以需要 Redux 這種新的架構來幫我們處理管理這些 global 的資訊，並散佈到其他 Component 裡面。

## Redux 是什麼？
redux 是一種解決上述問題的架構，主張將傳資料的指令打包成 Action 傳到 Dispatcher 傳到 reducer 跟通知 component store 的改變，並在 reducer 之中處理 改變 store。react 中實現這些功能的 library 是 react-redux。

## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？
SPA 是指不換頁網站，透過 javscript 向後端拿資料跟改變介面的方式實現的網站，有些需要同時做不同的事情的網站特別需要，例如：一邊看影片一邊看有什麼其他影片（Youtube 縮小的播放影片）這種。

## 什麼是 ORM？
ORM 是把操作資料庫的過程打包成一系列物件操作的工具，過去我們都要寫 Query 來讀取資料庫，現在只需要透過定義好的 method 就可以進行操作，讓我們不用寫底層的資料庫搜尋。

## 什麼是 N+1 problem？
比較廣泛地說，N+1 指得是 ORM 為了方便沒有使用比較優化的語法來進行搜尋，例如：在一個 array 裡面的每一筆資料我透過 for loop 進行查詢，在 mysql query 裡面原本可以用 Selec From WHERE IN... 但用 ORM 變成 SELECT FROM WHERE 一項東西執行很多次，造成效能變差，比較好的做法是根據 ORM 提供的 operator 優化 ORM 的執行方式。