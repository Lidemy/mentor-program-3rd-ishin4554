## 什麼是 Ajax？
Ajax 是一種可以讓瀏覽器非同步處理資訊的技術，非同步指得是可以讓我們跑程式的時候呢，先跳過去某一行程式，不一定要等他回傳資料回來再執行下一行，而是先執行下一行，等到後續用別的方式把回傳的結果在拿出來用就行。

這樣的好處是，例如我們在使用 API 向其他 server 發 request 要資料的時候，就不用等到 response 傳回來再執行其他行程式，可以先跑其他行，等到 response 回來之後再用 callback function 來使用 response 的結果。

## 用 Ajax 與我們用表單送出資料的差別在哪？

表單送出資料，比較像是跟對方的 server 說我要用某方法，連到特定網域，然後他會回傳一個 response 回來給瀏覽器，而瀏覽器預設會去 render 這個 response，結果就會產生像是更新頁面的效果。

而用 Ajax 是用 javascript 來跟其他 server 做非同步資料交換的方法，這種方式可以用 javascript 來處理 response，不會讓 response 直接給瀏覽器去 render，這樣就可以在不換頁的情況下處理 response，達成動態顯示資訊的效果。

## JSONP 是什麼？
瀏覽器本身有設置一個同源政策，也就是說如果你透過瀏覽器去發 request 給不同源的網址，會因為同源政策而把 response 給擋下來。為什麼要有同源政策是因為安全性的考量，可以想像如果不同源可以互相存取，他可能就可以存取你暫存在瀏覽器的內容，藉此來惡意入侵你在其他網站上使用的服務。

但有時候我們還是會需要跨域來存取資料，所以就有人想出了一個辦法來繞過同源政策，因為我們有一些資源在日常瀏覽網頁還是會需要存取，所以像是 `<script>` `<img>` 這類的 tag 就不在同源政策管理之下，所以就有人利用 script 標籤來取得資料。

作法就是讓 reference 的 javascript 裡面跟 html 裡面 function 同步，在 reference 裡面呼叫一個夾帶資料的 function，這樣在 html 裡面宣告的 function 就可以取得資料了。

## 要如何存取跨網域的 API？
如果要存取跨網域的 API 要在 response 的 header 裡面要加上 Access-Contorl-Allow-Origin 這一條，並在裡面設定哪些來源允許存取，當你發 request 的時候瀏覽器會在我們發出的 request header 加上你的 origin，接著到時候 reponse 回來時，瀏覽器就可以從你的 origin 比對他 Access-Contorl-Allow-Origin 的設定，來決定要不要擋掉 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週我們並非透過瀏覽器來發出 request，同源政策是瀏覽器給予的限制，所以當我們透過不是瀏覽器的其他程式來發出 request 就不會有這個問題，第四週我們是透過 node.js 的 request module 來發出 reuqest 而非瀏覽器，所以就沒有同源限制了。

