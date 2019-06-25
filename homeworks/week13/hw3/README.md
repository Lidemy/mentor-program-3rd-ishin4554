# 第四版 AJAX Refactoring 
前三版基本上都是基於 php 回傳 html 的方式來進行，整體檔案數少了很多，但檔案內變得比較混亂，所以這次有多一些 comment 來整理，尤其 javascript 的 html 生成那邊超級混亂，沒有 bootstrap 輔助可能會崩潰 TT

## Restiful API Design 
### CRUD 
經過 TODO list 的洗禮，這邊 CRUD 在 javascript 與 php 都有新的規劃，首先是命名上：讓 db 處理都保持 CRUD 的命名，而 javascript 則以 http method 來命名，幫助辨識。

接著是先規劃哪些 method 經過不同的 url path 會有什麼效果，跟 todolist 類似，但這邊基本上只有部分 restiful，有幾點考量，原本的確有一度很想要嘗試完全照著規範的邏輯走，但是因為這個不是一個對外開放的 API 所以只有在基本的 CRUD 上實踐。

/post
|path|method|result
|:---|:-----|:-----
|post/:id|PATCH|更改特定留言
|post/:id|DELETE|刪除特定留言
|post/:id|GET|取得所有子留言
|posts|POST|新增留言
|posts|GET|取得所有留言，page 設定回傳頁數
|post/:id/like|GET|新增/刪除like 

/user 
|path|method|result
|:---|:-----|:-----
|user/:id|GET|新增/刪除權限
|users|POST|登入與註冊

這邊 like 跟 user 分別嘗試了 toggle 的作法，看了一些文章，有嘗試過 toggle 單一 column value 但是，like 真的不適合不刪掉所以還是用 SELECT 的判斷處理，而 user permission toggle 就可以用單一的 sql 去做 IF 判斷來 toggle。

在 return JSON 也參考了一些設計將權限資訊、連結以及內容分開，並給一個 state 幫助判斷是否合乎權限，在寫心得的時候發現自己忘記 error handling 了，許願池 <!--TODO: -->

## SQL Query Redesign 
這次挑戰了 SQL 的極限，有沒有可能在 GET 資料的時候一次跑完，花了一點時間思考，以取得所有文章來說：
```sql
SELECT ishin4554_users.nickname, ishin4554_comments.*, 
COUNT(DISTINCT ishin4554_like_comment.id) AS likes,
MAX(IF(ishin4554_like_comment.user_id = ?, 1, 0)) AS is_liked
FROM ishin4554_comments
LEFT JOIN ishin4554_users ON ishin4554_comments.user_id=ishin4554_users.id
LEFT JOIN ishin4554_like_comment ON ishin4554_comments.id=ishin4554_like_comment.post_id
WHERE ishin4554_comments.parent_id=0 
AND ishin4554_comments.is_delete IS NULL 
GROUP BY ishin4554_comments.id
ORDER BY ishin4554_comments.time DESC
LIMIT ?, ?
```

以這個改造最久的案例來說：
- 用 COUNT 與 GROUP BY 來算所有 lieks 的總數並 LEFT JOIN 進 content table，這邊一開始忘記 DISTINCT 導致東西變成總量。
- 原本只用 IF 來抓是不是有 like 過這個留言，發現 IF 在 GROUP BY 下會取在前面的值，最後加上一個 MAX 取大值 1，這樣就可以確保不會選錯值。
- 用 LIMIT page, limit_length 來做 pagination。
- 這一套也能用來抓 child posts 用一個 WHERE paernet_id LEFT JOIN 就可以了。
- 還有其他可以縮減的，像是 session 的部分原本是用 insert, delete 去交錯使用，現在可以用一個 REPLACE INTO。

跟上一版的作法差別最大的是，這樣只要一個 sql 就可以取得所有資料，之前要用好幾個，反覆讀取資料庫才能慢慢湊齊所有資料，很有成就感 XDDDD 這個時間很值得。

## SESSION 
這次沒有用到 php session 因為所有操作都改用 javascript 來處理，所以一樣 php 這邊就是給一個 sessionID 讓 javascript 去設定 cookie。

而 Auth 的部分，則是每一次發送一個 Request 的時候會在 header 裡面塞 sessionID 跟會被操作的對象的擁有者，到後端的時候會對 sessionID 進行比對看是哪個 user 如果跟被操作對象的擁有者一致才會進行處理，否則 fail。