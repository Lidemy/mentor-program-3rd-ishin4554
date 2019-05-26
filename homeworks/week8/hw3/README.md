# 作業邏輯
*注意: 由於 hw3 與 challenge 有直接關係，所以直接將挑戰題合併進入 hw3*

這次有幾個功能：
1. 透過 Twitch API 抓取 Twitch 資料並且顯示顯示在頁面上，並且可以透過無限滾動載入更多內容。
2. 要能抓取前五名遊戲顯示在 Nav 上，並且點擊遊戲名稱可以顯示該名稱的內容頁面。
3. 有一個可以顯示自動提示的搜尋框，搜尋想顯示的遊戲，點擊後可以顯示該遊戲的內容頁面。


## 核心邏輯
設計留言板，可以分頁跟留言。

# 第一版回顧
*注意：第一版心得是在四周後以回憶的方式撰寫，盡可能還原但可能會與現實有一點點差別。*

第一版由於作業分成 hw3 跟 challenge 1，當時兩版是寫在分開的檔案裡，hw3 只有要顯示 20 個遊戲內容，所以當時一開始是先實作顯示最熱門 20 個直播的部分：
1. request: 從 API 上根據規範抓前 20 名的資料。
2. showGameItem: forEach 物件，把抓到的遊戲資料顯示在畫面上。

第二階段挑戰題要可以顯示熱門遊戲選取後顯示，並且可以按按鍵檢視更多：
1. request: 用原本的 request 讓我們 click 按鈕之後他就會 append 更多遊戲資料進畫面。
2. 新的 request 用來抓下 top 5 遊戲資料並把這個資料 append 進 nav 之後，可以透過點擊抓取 innterText 加入 request query。

# 第二版重構
*注意：根據 week7 作業建議，這次做一次性優化，不特別拉出 function 版本，避免在 function 上 over engineer 的問題。*

這次是第一次同時有新功能也有舊功能的重構，是一次對流程的考驗，這邊也分享一下過去的重構流程：
1. 先審視原本的功能規劃，例如：應該要分哪幾類的功能、現在分得怎麼樣、落差多少需要重寫嗎？最後把過去寫過的複製貼上過來。
2. 根據功能規劃後，先把舊的功能註解，按照舊的把他貼進新的架構裡
3. 一段段執行確保都沒有問題慢慢更新上去。
4. 等到核心的功能都沒問題時，近一步對新程式碼審視再進一步優化。
5. 重複以上過程直到沒有 bug 所有功能都完成。

那最後決定先把按順序來，把基本的重構做完再做新功能。

這次也是有大量 request 所以借用上一個作業的 class 來設計，打包一些變數變成物件，這一塊滿順利的，接下來就開始新增無限滾動與搜尋補完的功能。

## 無限滾動
無限滾動原本猜測應該是偵測螢幕邊緣的原理，只是怎麼抓「邊緣」這個概念，理應是最尾巴的物件出現在視窗內。
所以就查了一下 `infinite scrool height` 等關鍵字，可能是常常要被實作的功能吧，有滿多教學的就挑了一個實作，這邊 selector 用 `:last-child` 可以很方便地取得最後一個遊戲，

但是更新的時候要怎麼讓更新知道現在在哪個遊戲？這邊用 html attribute 幫頁面加一個遊戲的隱藏屬性，要更新的時候就去抓這個 attribute 就知道現在屬於哪個遊戲。

#搜尋補完
搜尋的部分利用 Twitch 提供的 Search API 可以得到搜尋列表，設定一些搜尋與體驗上的條件（大於三個字才補完、字體顏色的變化）一但輸入的字數大於三且不是刪除的時候就抓取 `input value` call API 取得搜尋條件的第一個結果填入 `input value`，之後按搜尋就抓取 input value 做字串處理後送進畫面更新的 method 就完成了。

# Code Review
不同的 infinite scroll 作法，是用物件總高度來計算。
```javascript
//by julypenguin
window.addEventListener('mousewheel', (e) => {
  if (e.deltaY === 125 && wheel) {
    window.addEventListener('scroll', () => {
      const { scrollTop } = document.documentElement;
      const { clientHeight } = document.documentElement;
      const { scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        offset = limit * page;
        page += 1;
        requestFn();
        wheel = false;
      }
    });
  }
});
```
