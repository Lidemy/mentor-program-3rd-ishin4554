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
