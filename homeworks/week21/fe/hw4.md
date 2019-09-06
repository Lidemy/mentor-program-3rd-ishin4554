## 為什麼我們需要 React？可以不用嗎？
我們需要 React 來幫我們對前端實踐 Model2 的模式，讓資料跟顯示的部分分離，方便管理並更好地實現 SPA 的設計。當然要寫 SPA 可以不用 React，但 React Virtual DOM 的演算法提供了更有效率的更新方式，可以比我們自己實現有更好的效能表現。

## React 的思考模式跟以前的思考模式有什麼不一樣？
React 必須是頁面跟著資料改變，所以我們所有的頁面變化都必須跟隨著資料調整，所以有資料流的感覺，變成再思考 React 的邏輯都必須從源頭想，不能只是想畫面的變化、而是思考什麼資料影響到畫面的變化。

## state 跟 props 的差別在哪裡？
用遊戲會安裝的 MOD 來比喻，如果 component 是遊戲裡面某個我們新創造出來的，像是：一個衣服模組好了，props 就像是我們一開始在 MOD 裡面就規定好你可以調整的參數，像是：你可以選擇紅色、藍色衣服，然後模組會根據你輸入的參數
有一點不一樣。而 state 則是會跟著環境變動的部分並不是玩家可以設定的，例如：下雨天（資料）衣服會變得皺皺的（視圖）。

## 請列出 React 的 lifecycle 以及其代表的意義
Lifecycle 指的是 Component 從被創造出來一路到掛上 DOM 最後可能被消滅的各種時間片段，最常用的有像是：Constructor、Render、componentDidUpdate 等段落，他們都會在 component 裡面以 function 的形式登場。

常見的 lifecycle 如下：
1. Constructor：指的是 component 一開始被創立的時候，通常會用來設定 state。
2. Render：回傳 jsx 的物件。
3. componentDidMount:當物件 constructor 完的時候，通常可以在這時候引入 ajax 的資料。
4. componentDidUpdate：當物件更新完 state 的狀態的時候，通常如果 DOM 改變想要接續什麼功能的時候，就可以用這個 lufecycle。
