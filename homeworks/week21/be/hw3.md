## 什麼是 MVC？
MVC 是一種程式架構，為什麼會有 MVC 是為了讓程式處理的工作能切割清楚，好處就是方便分工跟管理。於是切割的方式就是分成：Model、View、Controller。

- Model：處理資料
- View：處理顯示
- Controller：作為 model 跟 view 之間的橋樑，根據 view 接收到的內容進行判斷之後，轉給 model。

原則上，精髓應該要是 model 一變就要能主動通知 view 要改變，但當今天前端要從後端抓資料，不可能說後端一改變前端在沒有任何 request 的情況下知道後端資料改變。所以針對 web application 提出模式並非傳統的 MVC 而是 Model2 的模式。兩者最大的差別在，今天是不是要多一個回傳給 view 的動作。

## 什麼是 ORM？
ORM 是一種把 database 轉換成 object 的技術，為什麼會有 ORM 是為了統一 database 的接口，好處容易理解，不用大家都要讀不同的 SQL Query。

## 使用 CodeIgniter 之後跟原本寫純 PHP 有什麼不一樣的地方嗎？你比較喜歡哪一個？
CodeIgniter 簡化了很多，最基本的就是前面提到的 ORM，關於 database 的操作都不用自己來，並且把過去要設定很久的 `.htaccess` 檔案等都統籌在 Config 裡面。如果更熟悉 Codeigniter 有的工具，我想應該會比較喜歡 Codeigniter。