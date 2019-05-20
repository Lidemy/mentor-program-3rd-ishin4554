## 資料庫架構

### comments

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| id | integer | 留言 id |
| user_id | integer | 使用者 id  
| content | TEXT | 留言內容 | 
| time | timestamp | 留言時間 current time |


### users 

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| id | integer | 使用者 id |
| username | VARCHAR（16）| 帳號 |
| password | VARCHAR（16） | 密碼 | 
| nickname | VARCHAR（16）| 暱稱 | 
| cookie_id | VARCHAR（8）| cookie 號碼 | 
| time | timestamp | 帳號創建時間 current time |


## 功能規劃

- 留言板前台
  - index.php
  - handle_add_post.php

- 註冊前台
  - register.php
  - handle_register.php
  - login.php
  - handle_login.php
  - handle_logout.php




