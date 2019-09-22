## React Router 背後的原理你猜是怎麼實作的？
由於有 Hash 的網址，猜是利用 Hash 本身就不換頁的原理，抓到網址改變的 Event 對 Hash 後面的字串進行判斷後渲染，並把抓到的字串存進 History 的 Stack 裡面，判斷之後將該包含的 component 渲染出來。

針對沒有 Hash 版本的網址，有點猜不到，所以查了資料發現，history 是本來就有的，但以前的 history 沒有 history.pushState 或者 history.replaceState 這兩個 API 來做到不刷新的頁面的功能。而且 history 的改變沒有直接對應的 Event。所以 React-Router 幫我們做的事去偵測有沒有點擊 a element、更改路徑及點擊前進後退鈕來偵測，偵測這三方面的行為來偵測 history 的改變，藉此做到沒有 Hash 也可以有網址的切換。

## SDK 與 API 的差別是什麼？
SDK 全名是 Software Development Kit，裡面會針對你的開發目的，包含一系列的資料庫、元件等等所有開發需要的工具，而 API 只是特定服務的接口。可以想像成 SDK 是工具箱裡面有各種工具，而 API 則是工具的操作按鈕。所以兩者的關係來說，SDK 裡面一定會有 API，但不是所有 API 們加起來就是 SDK。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？
同源的 cookie 會帶上，不同源的要改變 header 的 withCredentials 後端也要允許不同源的 cookie，但我自己喜歡的做法是利用 document cookie 取 cookie 值放入 body 裡面，資料統一放在一起比較好管理，不會有的是透過 cookie 有的是在 body。

## 什麼是 MVC？
MVC 是一種程式架構，為什麼會有 MVC 是為了讓程式處理的工作能切割清楚，好處就是方便分工跟管理。於是切割的方式就是分成：Model、View、Controller。

- Model：處理資料
- View：處理顯示
- Controller：作為 model 跟 view 之間的橋樑，根據 view 接收到的內容進行判斷之後，轉給 model。

原則上，精髓應該要是 model 一變就要能主動通知 view 要改變，但當今天前端要從後端抓資料，不可能說後端一改變前端在沒有任何 request 的情況下知道後端資料改變。所以針對 web application 提出模式並非傳統的 MVC 而是 Model2 的模式。兩者最大的差別在，今天是不是要多一個回傳給 view 的動作。