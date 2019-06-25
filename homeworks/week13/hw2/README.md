# 規劃
這邊的規劃是參考自上上學期以學習任務管理的平台所寫的研討會論文題目，當時的工程師不是自己，希望這次可以自己實做看看，並改動一些功能。

目標：幫助自己分析自己的任務執行與預估狀況。
動機：做任何責任制的工作（？）評估自己要花多少時間是一個重要的能力，但有沒有可能除了透過主觀感覺之外，來觀察自己評估與執行的落差？

## User Story 
### Task 
- [x] Owner 可以新增明天要完成的任務名稱
- [x] Owner 可以修改任務名稱
- [ ] Owner 可以修改任務逾期的時間
- [x] Owner 可以刪除任務 
- [ ] Owner 可以編輯自己的自我介紹、換照片連結以及放上自己的 github 連結
- [ ] Owner 可以看到四種狀態任務的量
- [x] 可以註冊帳號後創立自己的 table 
- [x] 可以一般登入也能利用 Session 登入 
- [x] 可以看到所有清單

**Task State** 
|From State|Input|To State
|:---------|:----|:-------
|waiting(white)|click</br>overtime|success</br>warning
|success(green)|click|defalut
|warning(red)|click|delay
|delay(yellow)|click|warning

## 資料庫

**Table: ishin4554_todo_users**
|欄位名稱|欄位型態|說明|
|:--|:---|:---|
|id|INT(11)|Primary
|account|VARCHAR(16)|帳號
|nickname|VARCHAR(16)|名稱
|password|VARCHAR(64)|hash 密碼
|intro|LONGTEXT|自我介紹
|avatar_url|LONGTEXT|頭像連結
|github_url|LONGTEXT|github 連結

**Table: ishin4554_todo_certificate**
|欄位名稱|欄位型態|說明|
|:--|:---|:---|
|id|VARCHAR(16)|sessionID
|user_id|VARCHAR(16)|帳號

**Table: ishin4554_todo_tasks**
|欄位名稱|欄位型態|說明|
|:--|:---|:---|
|id|INT(11)|Primary
|name|VARCHAR(16)|任務名稱
|user_id|INT(11)|清單名稱
|date|DATE|預定完成時間
|finish_date|DATE|完成時間
|is_delete|BOOLEAN|刪除狀態

# 第一版 

上面很多功能還在夢想QQ 但這次也是想要測試一下自己想像的跟執行上的落差到底有多大（超級大！）

## Bootstrap & Jquery 
這兩個 library 以前都有用過所以上手還算快，除了會忘記這邊回傳的 jquery 的物件會出現獵奇的錯誤之外，沒有太大的問題，但初步的感覺是自己好像沒有用得簡練，程式碼還是很亂，可能還需要多練習多了解有沒有更好用的 method 讓程式碼變得漂亮一點。但 bootstrap 真的很省心，雖然不是有風格的特好看，但基本體驗也做得很好，想想很多公司基本上內部也會把設計元件模組化，心裏突然浮現：「設計師好難找工作」的想法。

## Fetch & Promise 
這次純用 Fetch 來處理，開始把 POST 用 json 傳資料，中間有遇到 php json encode, decode 的問題，途中比較了 jqeruey ajax 的用法，並感謝老師解答了 `php file://input` 的問題才發現，jqeury ajax 真的幫我們打包了很多細節。

許願 ˊˇˋ 下次改版用 Async Await 來加深對這兩個語法的理解。 <!--TODO: -->

## Auth & Injection 
資安就是永無止盡的耐心之路，但想破腦袋其實也不知道哪些是可能被擊破的部分，最好的辦法還是**所有的資訊都做處理**，首先，所有的 sql 都用 `bind_param`、所有回傳的資訊都用 `htmlspecialchars`，但上一次留言板有一個部分做得不夠好的是在權限判斷上太混亂了，之前留言板抓了藏在網站裡面的 user_id 現在想想，那個如果自己發現改了還是可以偷資料 RRRR，應該要抓 session 取比對才是。所以這一次決定每一個 fetch 都要帶著 auth 的 header 如果 user_id 跟 auth 不同則不對資料庫做任何動作。

但時間上有點不夠，所以沒有做 CSRF 的防範，拿網站埋的 session 與 user session 做雙重比對，一樣放在許願。 <!--TODO: -->

## Status Code 
接下來是 API 的部分，一開始先處理 status code 讓所有錯誤訊息有對應的訊息碼，但是......狀態太多了，最後就針對 login, register 才有寫這部分的判斷。題外話，在決定要用什麼 status code 的時候發現網路上大家對於輸入錯密碼啦，帳號有用過啦要用幾號都有諸多討論，還滿有趣的。

## Restiful API 
既然都 Restiful 在 status code 上了，當然 api 網址也要（？）這邊研究了一整天的 `.htaccess`，本來就對 regex 很害怕 (求助老師可以出 regex 特輯 QQQQQ) 在處理系統問題上最糾結，一開始找錯了設定檔，處理權限問題好久，後來才發現設定檔找錯了QQ 
.htaccess 的 debug 尤其麻煩，不過有一篇文章教了滿多小技巧的：[Apache Rewrite with Htaccess 理解與技巧](https://medium.com/@awonwon/htaccess-with-rewrite-3dba066aff11)

途中其實也有看過一些做法是純用 php 做 path 的字串處理來進行判斷，但 `.htaccess` 比較一勞永逸。而網址設定好之後，就開始刪除 php 檔案，把所有 php 寫成一個 `handle_request` php 再根據是什麼 method 做不同的處理。

## SPA 
SPA 上怎麼做 listener 怎麼更動畫面的邏輯很困難，一來是要就地呈現 input 像是: 按了 edit 就會在該處留下 input 但這時後按到別的 list item 或是 focus 到別的東西會不會就有 bug？ 許許多多的細節有點來不及 debug，或是 create/ update task 應該要直接 append 新的結果還是整個 ul 更新，最後是選擇整個 ul 更新，最後是選擇整個 ul 更新。

二來是很多資訊可能必須綁在 html data-* attribute 上，但綁太多又有不明的擔憂（？）總覺得以前看過的網站不會綁那麼多資料在 html 上，所以還在思考這邊該怎麼辦才好，放進許願池 <!--TODO: -->