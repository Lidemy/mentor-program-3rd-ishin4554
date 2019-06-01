# 第一版過程心得
這次真的是 debug 大集，紀錄一下一路上解下來的 bug ......

## Prototype
- hash_password 密碼長度：一開始使用 hash 函數的時候沒有注意到設置的密碼長度不夠長，看密碼驗證一直沒有通過，卻沒有錯誤訊息搞了好一陣子，最後在先看雜湊跟加密的文章中，發現雜湊動輒幾十個數字欄位可能不夠的問題。

## 第一版
初初版相對來說，非常快就完成了，但程式碼非常的～亂，但改完 before & after 之中，其實也不確定哪種管理方式比較好，template 一多，檔案一亂變數有時候會忘記設置過，但是如果都寫在同一份檔案裡，非常的長也不好閱讀，還在拿捏版面、功能全部混在一起的時候可以怎麼整理比較好。

- template & source: 善用 `require` 跟 `include` 可以滿方便的新增頁面，而頁面細緻的不一樣目前適用路徑判斷 `_SERVER['SCRIPT_NAME']` 的方式來調整，過程中也嘗試將UI component 切得更細，同時因為初版寫完真的是太混亂了，本來想說連三週完成後再來重構的部分，改為這時候就重構、不過 php OO 的語法還不熟悉的狀況下，決定先切 function 再來變成物件導向。

- php OOP：切的時候就發現基本上分成 `user` 類資訊與 `post` 類資訊，額外還有一群 `session` 相關的內容。原本希望連 connection 都可以變成一個 object 裡面有基本的 CRUD 其他 class 只要繼承可能就可以運用多型達成各個種類的微小區別，但實作上發現，基本上 SQL query 都是要整個調整，似乎繼承 overide 不會比較容易，所以就乾脆物件只做 `user` 跟繼承 `user` 的 `session` 以及 `post` 這三個 class。過程中更熟悉 php OOP 的語法一些，也踩到超多次 `$this->variable`, `$this->$variable` 的錯誤。

下一次延伸這個作業再來看看怎麼從基本的 CRUD 去繼承。

- `ERR_CONNECTION_RESET`: local 端測試完之後，上傳到 ftp 實際測試時發現 update permission 出現了 `ERR_CONNECTION_RESET` 的畫面，這種 bug 真的很難修，沒有任何錯誤資訊、又得 deploy 才會有問題，過程中一路從原本的頁面一條條 comment 發現卡在 `value[] list`，由於原本在更新會員權限上是選擇利用勾選後，傳勾選後的清單到後端做處理，但經過不同的 input type 測試，可能是資訊量可能超額，所以修改為每按一個就刪一個的方式。

- sequal pro 連線 localhost： 這次開始使用 sequal pro，上週是用 phpmyadmin 但速度偏慢，sequal pro 在連線 localhost 上花了一點時間研究，需要 127.0.0.1 跟注意權限設置上主機有沒有允許本機登入。

整個 debug 下來，心底大概有個 SOP：
1. echo 看 sql query 是不是正確的？
2. 開資料庫管理系統看 sql 有沒有確實運作？
3. 看 sql 回傳的資料（記得 `fetch_assoc()`) 的真相，array 可以用 `print_r()`
4. 資料都沒有問題的話，是不是 html 顯示問題？

chrome 也要注意，comman + r 有時候可能 cached 殘存的關係沒有更新，勤快使用 command + shift + r 可以確保這件事情。