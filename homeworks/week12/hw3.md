## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 指得是利用埋入 SQL 特殊字元來讓我們的資料庫回傳錯誤的內容，防範的方法有幾種：
1. 利用 sql prepare 讓參數另外連結上去
2. 限制網站上的 database 讀寫權限

## 請說明 XSS 的攻擊原理以及防範方法
XSS 攻擊指得是透過埋入惡意的 javascript 來攻擊網站的手法，類似於 SQL Injection 的概念，不過埋的是 Javascript。

其中 XSS 又分成三種：
1. 儲存型: 儲存型是透過將 javascript 寫入 DB 之後在顯示出來，因為誰連進去都會遭受一樣的結果，所以是一種比較嚴重的類型。

2. 反射型: 在一些會直接用 GET 方法，或是輸入資料後會直接反映在頁面上的設計，利用這個方法寫入 Javascript 讓網站呈現不應該呈現的內容。

防範的方法分為前端跟後端：
1. 後端的部分可以利用 `htmlspecialchars` 來跳過特殊字元進行編碼，讓顯示的內容不要是會依據 html 來編譯。
2. 前端的部分可以改善撰寫時的習慣，例如：在一些顯示內容的地方改為 `innerText`

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF 攻擊是利用殘存在我們電腦裡的 cookie 在你不知情的時候進行身份認證發出 request。

解決的方法主要是後端：
1. 檢查連線的來源，確定 request 是從官方的網站發出。
2. 透過驗證碼的機制，來二度確認真的是本人。
3. 在網站的 form 裡面埋入 session 資訊，如果 form 裡面的 session 值是 server 有的，代表這是官方網站的內容，更甚者可以把這個 session 作為第二組 cookie 放在 client 端，利用瀏覽器規範的同源政策，來防堵攻擊。
