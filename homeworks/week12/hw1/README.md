# 第三版過程心得
## 第三版
這一版先把基本的資安基礎建立起來，基本的問題基本上 php 都有內建一些函式幫我們處理，問題在，專案規模一大你要找出所有東西真的很麻煩，所以開始把常用的功能，用 `cypress` 寫成測試，然後專心手動測試資安就好。

所以就上網查了 `測試 規劃` 相關的內容，大致了解了一下該怎麼規劃要有哪些測試，並列了清單，最常用到要反覆測試的就是不同權限的 CRUD 以及註冊、登入、登出等等的小功能，跟過去學習 usability test 的感覺滿類似的。但有遞迴的 more 一時之間還不知道怎麼測試，等到之後拿 w7,8 作業更熟悉 cypress 再來慢慢補上。

而原本想要邊開發就邊執行測試，但發現其實開發過程中大部分都是先進行小測試，不會真的跑過一個完整測試，於是就把測試的開發往後延，但後來才想到「啊，可是 TDD 的精神......」

### 加入讚、子留言功能
子留言卡了很久，在五層如果不想要 loop 五次的前提下，很容易不小心鬼打牆進入我要先把五層的資料都整理出來，但其實可以漂亮的用一層迴圈去解決。

利用 `LEFT JOIN` 把母子留言的 table 抓出來後，一直抓子留言就可以了。一種電梯裡面如果兩面鏡子的話就會一直縮小的感覺，上廁所的時候看到鏡子想到的（？），但這樣有一個新的問題是，沒辦法限制在五層，除非我寫一個 get depth 的 method 每一次都進行判斷。

所以五層這邊我是從前端著手來處理，這樣可以少一點對資料庫的操作，不過這邊也延伸了一些新的問題，到底哪些東西應該要前端處理？哪些東西要後端處理？目前初步的感覺是如果無傷大雅的事情，像是防止使用者的一些行為這種，就會透過前端來處理。

而讚則是開了一個新的 table 來存取使用者按 like 的紀錄，並開一個 like class 繼承 post class。

### AJAX 
過程中一開始看到所有子留言讚還要刷新真是 ... 好亂好難 debug，所以開始用 ajax 來抓 like 跟子留言的資料。

這邊有稍微參考一下 facebook 的流程，基本上是 comment 按下去、所有東西跑出來、然後跑出一個留言的地方。所以仿造了這個流程，留下一個 more 按鈕按了東西會跑出來，more 只能點一次，然後底下有留言的地方。

這邊也是第一次嘗試使用 `fetch` 跟 `async` 與 `await` 語法，總覺得 `fetch` 在我心裡就是一個心理懂腦子不懂的東西，用了就發現了 XDDD 經過無數次到底要在哪裡可以抓到 data 而不是 `promise` 以及各種 `try catch` json 格式的試錯之後，現在好像比較懂 fetch 怎麼用了。

這邊也是開始煩惱到底哪一些資料要透過 api 回傳，也是一個要前端處理還是後端處理的問題？例如： like 資訊原本是要雙重 fetch 來抓到 like 資料（一個抓 like 的 fetch，一個抓 post 的 fetch） 最後決定還是後端抓 post 時直接給我一筆有 like 資料 json。

寫 ajax 的時候覺得最最最麻煩的就是 html 們了，這時候突然懷念起 php 有 include 的概念，看到 js 要塞一個方框，要進行一模一樣的判斷，html 貼來貼去，這邊也是 debug 很久的一個部分。

## 測試
最後寫測試就類似於按鍵精靈，其實 cypress 有很多功能，像是 `should` 看起來也很好用，但可能是打包的太好，method 太多，可能要用更久才會熟悉有哪些東西可以用。

但我個人最喜歡的是 cypress 的介面，一個個步驟可以 pin 起來檢查找出了很多小錯誤，而且可以利用 `context`, `it` 來對任務進行包裝也很直觀有哪些測試內容。
