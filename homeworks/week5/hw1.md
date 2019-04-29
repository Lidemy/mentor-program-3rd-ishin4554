## 前四週心得與解題心得

### W1
第一週多是觀念題，還不算正式開始寫程式，對於網路概論的疑惑比較多，待補完的觀念放在最後節。
但這週也同時更深入的研究一下之後會跟著自己好一段時間的 markdown 跟 VSCode，學會了 latex 的寫法，跟幫 VSCode 裝該裝的 extension。

筆記如下：
[[MTR] CLI/ Git/ Markdown Extension](https://ishin4554.github.io/2019/04/16/mtr190416.html)
[[MTR] Git/ 計算機概論/ 網路概論/ Markdown Wiki](https://ishin4554.github.io/mtr-w1-002/)


#### 挑戰題：Shell Script 

在面對這個新工具大概是依照這樣的步驟來了解跟學習，參考這篇筆記：
1. 了解基本 varaible、loop 跟 condition 怎麼寫 
2. 了解比較少見的 pipe 這種指令怎麼在 Script 裡面呈現 
3. 了解怎麼輸入數字
掌握語法，基本是第一個挑戰題就是一個 for loop 搭配 touch 指令。

超級挑戰題比較複雜，原本解決問題的策略是：
1. grep 想要的 key 
2. grep -w + regex 抓出想要的字

於是開始研究 regex 可因為 regex 的運作思路一直掌握不到（以為已經瞭解了，結果輸入預期應該要 A 卻又是 B 結果，一直抓不到規律）
所以改為：
1. 用 grep -E '(\w)+'去掉所有符號
2. 用 awk 根據空白分隔，把 key 去掉
但這樣又有新問題， value 的內容去得太乾淨了， email 的符號都不見了。

最後折衷：
1. grep 出該行
2. 用 awk 切出 value 

#### Code Review

- --silent 不輸出東西
- for keyword in name bio location blog 應該是 for item in array 的簡略寫法
- 先輸出一個 txt 其實比較好處理
```sh
curl --silent https://api.github.com/users/$1 > profile.txt 

for keyword in name bio location blog
do
    grep -e $keyword profile.txt | awk -F ': "' '{print $2}' | awk -F '",' '{print $1}' 
done
```

while loop condition -ne not equal
```sh
#!/bin/bash

# assume $1 > 1
n=$1

while [ $n -ne 0 ]
do
    touch "$n.js"
    n=$(($n-1))
done
echo "檔案建立完成";
```

### W2
開始基本的寫程式題目，這一階段會比較糾結在能不能寫得很漂亮，後來決定就先以能解決為主。
這邊第一次碰到演算法的題目跟作業有誤，這邊開始養成作業再確認的習慣。

筆記如下：
[[MTR] JS 基礎](https://ishin4554.github.io/mtr-w1-003/)


#### 挑戰題：Binary Search & BFS 

**Binary Search** 
原本的解決思路是
1. 設定 Arr 的中間
2. 跟中間比大小，如果比較大，就 slice 設定新的 half 
但這樣遇到一個問題，是 half 一直變小不會回傳原始的 index，所以改為現在的版本：
1. 設定 begin & end 
2. 

**BFS**
- 原本的思路:
1. 逐行掃描看有沒有可以

正確的方向
現在的了解

#### Code Review

一行解參考
```javascript
function capitalize(str) {
  const result = str[0].toUpperCase() + str.slice(1);
  return result;
}
```

對耶可以直接把 str 放後面，不一定要 concat 放後面，這樣可以少寫一行
```javascript 
function join(str, concatStr) {
  let result = str[0];
  for (let i = 1; i < str.length; i += 1) {
    result = result + concatStr + str[i];
  } return result;
}
```

### W3
 
解題心得參考 week3 hw6
[[MTR] W3 HW Review](https://ishin4554.github.io/mtr-w2-009/)

筆記如下：
[[MTR] Jekyll/ JS 基礎/ 演算法](https://ishin4554.github.io/2019/04/18/mtr-w1-004.html)

#### 挑戰題：大數乘法
#### Code Review
```javascript

```

### W4
這週的方向是把 request 的操作變成一種本能反應跟好好的研究 API 文件怎麼寫，一開始寫的時候：
1. 一開始就是一個個 request 
2. 剛好呼叫 api 的規模是逐步增加的，所以沒有刻意回去重構，在 hw4 就嘗試好好的寫漂亮一點的程式碼：至少不要 if 那麼多個，可以用 sqitch，多注意一些 error 顯示的內容。
3. 原本寫了一版 error 顯示結果實測失敗，推估是回傳的內容判斷方向不對。
4. 後來發現都是 null 就作罷，留一個有成功的。

另外一個寫文件的作業寫得很過癮：文件參考 slate 等等一些 api 樣板跟大的有名的 api 像是： twitter, google 等等的寫法，認真的寫了一版文件，覺得對文件的接受度大增。

筆記如下：
[[MTR] HTTP/ TCP/ IP/ API](https://ishin4554.github.io/mtr-w3-010/)

#### 挑戰題：Call Back 
看到原本第一題有幾個疑惑：
1. 實況指得是 clips 還是 videos，這種感覺可能就跟今天分享的學姊說金融業的名詞不是很確定是一樣的感覺，所以一開始自己是寫錯的 call 錯 API，後來再查確認後才發現實況應該是 videos。
2. maximum 是 100 個但要回傳 200 個，發現值來不及回來發現可能是 call back 問題，所以查了一下怎麼解決，由於還沒有無限 call back 所以就從簡處理（其實更深的現在也看不太懂）


### W5
複習週主要重新定義好自己的文件規範、確認初衷、確認時數、參與程式相關的活動跟 code review。

1. 文件規範：主要是統一 issue, pr 跟每日心得的規範，開模板檔案 template.md, 優化 reportTime.sh 的功能，有 + 號在 CLI 視覺化 XDD，整理過去的筆記。

做了這樣的小東西：
```sh
➜  time ./reportTime.sh 190422
SUM   +++++++++++ 11:32

MTR   +++++++ 7:40
ISS   +++ 3:52
```

2. 確認初衷：聽完分享後覺得了解自己的核心目標很重要，這樣在規劃進度也比較了解該朝什麼方向努力，在確認了一次自己的目標在「實踐想法的開發能力」，類似 AI Pattern 前輩那樣的工作環境就很理想。
3. 確認時數：

| WEEK     | ALL |  MTR  | 實際 
|:-------|:---------|:-----------|:------
| Week1 | 57:31 (8.1hr)| 37:54 (5.2hr) | W1C1 & W2HW
| Week2 | 55:56 (7.8hr) | 35:38 (5hr) | W1C2 & W2C1 & W3HW & W4HW

目前接近承諾的 40 小時，但每天工作天工作時數希望再拉高 4 小時，維持工作日 12 小時的產出，平衡一下另外一個支線的進度。

4. 參與活動：
- 所上的資訊讀書會：被拉去參加讀書會，了解到純種工程師會關注什麼議題，例如： yarn 跟 npm，從我的角度會覺得只要知道哪個我喜歡用、有沒有什麼負面效果就好，但純種工程師會深究底層的資料結構怎麼實踐才解決了原本 npm 版本混亂的問題。其他還有聽到的內容有：Chrome 渲染、Virtual Dom、Docker 部署、JS Stream 目前只能聽懂 3, 4 成。
- 實體聚會：參加第一場實體聚會開啟了更多我對工程師的想像，我覺得這種多看看不同類型的前端工程師，對於自己釐清自己的定位很有幫助，

5. code review ： 這個想法是來自於第二期 A 學姊跟實體聚會的建議，所以要求自己至少把值得一看看完，多嘗試一些解決方法。

#### HTTPGame
真的很喜歡這種關卡系的設計，不，應該不能說喜歡，應該說這種 RPG 關卡很剋我啊 XDDD 通宵肝完了十關，第十關因為有關乎演算法，中間休息了一下再戰成功。
但因為是一種破遊戲的心情，code 寫超醜的啦XDDD 可是很盡興，跟以前打遊戲熬夜破卡的心情一模一樣。

有一些題目第一次閱讀上語意會不清楚：
例如：第二關要找書，一開始想說是用肉眼確認嗎？所以就先用肉眼解進入下一關
例如：base 64 範例跟實際轉換結果不同，有一度還以為是不是我的寫法錯了，卡關了一陣子，還好只是 form 忘記改成 headers
但我想說的是，其實沒關係啦，遊戲就是要這樣才好玩啊！

有一些議題解決得很過癮：
中文解碼問題跟 base 64，由於不是在瀏覽器上，所以是用 Buffer 來轉換，中文解碼則直接參考別人的做法。
最後的演算法其實也很開心，可能是這個演算法在自己的能力上限高出一點點的地方，挺好的。

中間如果可以弄懂 Callback 更好的寫法就好了：
常常開了變數可是 request 的東西還沒回來QQ 後面幾關的 callback 寫得超醜。

好不容易最後一題的時候，居然要排列演算法:
就好像以為苦盡甘來結果最後一關是你最不擅長被剋的關卡。

完成第十關之後看到還有 true end 的後續關卡覺得心滿意足，下次複習週來繼續挑戰。

### 概念待辦
- 伺服器運作原理 e.g. 瀏覽器 
- 浮點數 IEEE 754 運算規則
- Git 真實運作邏輯
- **演算法實作 e.g. BFS, DFS, Sorting ... etc** 
- ESLint 每一個 Warning 背後的原因
- Call Back & Promise 
- NPM vs Yarn package-lock.file 
- Test 規劃
- **Regex** 
- Program & Process & Thread
- Big O 
- Basic Autorization
- Chinese Endcode & Decode 

### 挑戰待辦
- w2 超級挑戰題
- w3 超級挑戰題
- lidemy OJ
- HTTPGames 11 之後