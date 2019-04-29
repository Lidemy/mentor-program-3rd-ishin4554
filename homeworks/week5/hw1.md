## 前四週心得與解題心得

下面內容大概依照 4.5 週的進度紀錄各週的學習心得小結、筆記連結整理與挑戰題的解題心得與看到有趣的 code 紀錄。

### Week1
第一週多是觀念題，還不算正式開始寫程式，這一週對於網路概論的疑惑比較多，但第四週補充了很多資訊，其餘待補完的觀念放在最後節。
- 這週花了一點時間打造自己的環境： `markdown` + `Jekyll` 跟 `VSCode` + `markdown enhanced`，並學會了 `latex` 的寫法，希望可以加速自己筆記的效率。
- 安裝 VSCode Extension: 複製貼上錯誤碼折騰太久，最後決定安裝然後直接一個個小燈泡點開看官方文件。

**Reference**

[[MTR] CLI/ Git/ Markdown Extension](https://ishin4554.github.io/2019/04/16/mtr190416.html)
[[MTR] Git/ 計算機概論/ 網路概論/ Markdown Wiki](https://ishin4554.github.io/mtr-w1-002/)

#### 挑戰題：Shell Script 

在面對這個新工具大概是依照這樣的步驟來了解跟學習：
1. 了解基本 `varaible`、`loop` 跟 `condition` 怎麼寫 
2. 了解比較少見的 `pipe` 這種指令怎麼在 Script 裡面呈現 
3. 了解怎麼輸入數字

掌握語法後，基本是第一個挑戰題就是一個 for loop 搭配 touch 指令。

但超級挑戰題比較複雜，原本解決問題的策略是：
1. `grep` 想要的 key 
2. `grep -w + regex` 抓出想要的字

於是開始研究 regex，希望可以避免選取到自我介紹中的符號文字。可因為 regex 的運作思路一直掌握不到，所以改為：
1. 用 `grep -E '(\w)+'`去掉所有符號
2. 用 `awk` 根據空白分隔，把 key 去掉

但這樣又有新問題， value 的內容去得太乾淨了， email 的符號都不見了。最後折衷：
1. `gre` 出該行
2. 用 `awk` 切出 value 

但如果自我介紹裡面有特殊符號可能會有錯誤。

#### Code Review

- `--silent` 不輸出東西
- for keyword in name bio location blog 應該是 `for item in array` 的簡略寫法
- 先輸出一個 txt 其實比較好處理
```sh
curl --silent https://api.github.com/users/$1 > profile.txt 

for keyword in name bio location blog
do
    grep -e $keyword profile.txt | awk -F ': "' '{print $2}' | awk -F '",' '{print $1}' 
done
```

- while loop condition `-ne` not equal
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

### Week2
開始基本的程式題目，這一階段會比較糾結在能不能寫得很漂亮，後來決定以能解決為主，總覺得思維上的事好像急也沒用，只能每一次都多想一點點，有一天可能洗澡的時候就想通了。

- 出現作業失誤：這週還沒有學到 Unit Test，`console.log()` 在 terminal 裡對答案對了很久還是漏看了細節，這讓學到 week3 時的我非常心有戚戚焉。
- 第一次的 Hardcore 演算法題目：感受到明顯的學習 Gap，尤其是 BFS 很直接的感覺到「每一句好像都聽得懂，可是要我重說卻說不出來」的難度。

**Reference**

[[MTR] JS 基礎](https://ishin4554.github.io/mtr-w1-003/)


#### 挑戰題：Binary Search & BFS 

**Binary Search** 

原本的解決思路是：

1. 設定 Arr 的中間
2. 跟中間比大小，如果比較大，就 slice 設定新的 half 

但這樣遇到一個問題，是 half 一直變小不會回傳原始的 index，所以改為現在的版本：

1. 設定 begin & end 並取中間 half
```javascript
  let end = numArr.length - 1;
  let begin = 0;
  let half = Math.floor(begin + end / 2);
```
2. 如果比較大就把 begin 提上去 half ，比較小就把 end 壓下來到 half 來壓縮空間，直到中間沒有空間壓縮，也就是 `begin <= end` 的時候結束。

```javascript
 while (begin <= end) {
    if (num !== numArr[half]) {
      if (num > numArr[half]) {
        begin = half + 1;
      } else {
        end = half - 1;
      }
      half = Math.floor((begin + end) / 2);
    } else {
      return half;
    }
  }
  return -1;

```
這樣就還是可以回傳原本的值了。

**BFS**

原本的思路:
1. 搜尋最近到下一行的路
2. 逐行掃描看下一行有沒有離自己最近的點可以走
3. 總和移動時的點

但其實這種思路遇到又繞回來的迷宮可能會出問題。所以透過老師給的關鍵字去看 BFS 跟 DFS 的演算法。

目前 BFS 知道怎麼搜尋，但不知道怎麼逆推出路徑數，關於搜尋的方法可以想像他是先把同一層的所有叉路看過，看過之後，在換下一層，用這種方式搜尋。

0. 把原本的 array 用 for loop 創建 obj 增加 visited 的 key 預設 false，原本也有想過要不要用兩個陣列，但想說練習一下 obj 
1. 先把起點存進 queue（queue 是一種資料結構，先存進去的資料先出去，用 js 來說就是 `.push()` 之後 `.shift()` 出去
2. 判斷 `queue` 有沒有東西，沒東西就結束（代表搜尋完畢）
3. 把最先進去的東西 `.shift()` 出來，判斷這東西的左右鄰居有沒有可以走的路
4. 有就 `.push()` 進 `queue` 把 visited 改為 `true`
5. 就這樣不停重複把地圖走完

雖然是可以找到，但不知道是不是最短、也不知道怎麼數步數。

#### Code Review

- 一行解參考
```javascript
function capitalize(str) {
  const result = str[0].toUpperCase() + str.slice(1);
  return result;
}
```

- 對耶可以直接把 str 放後面，不一定要 concat 放後面，這樣可以少寫一行
```javascript 
function join(str, concatStr) {
  let result = str[0];
  for (let i = 1; i < str.length; i += 1) {
    result = result + concatStr + str[i];
  } return result;
}
```

### Week3
開始再難一些些的程式題目，這一階段一樣會糾結寫得漂亮，雖然不一定能寫出漂亮的結果，但開始可以判斷有一些解法是在硬幹，有一些是試著效率的解決問題。

- 開始能夠掌握題目的時間感：有一些題目開始能評斷對於自己的難度在哪裡，像是：看到大數除法就可以瞬間判斷這是會大卡關魔王題，但大數乘法就在中 Boss 需要多花時間但還是可以完成的範圍，可以初步籠統的估計自己要多少時間完成。
- 比較了解自己的學習難點：發現自己在 Regex 跟演算法都很卡，可以調整一下這類型題目的學習策略，也許應該相像開課前想 Codewar 每天練習一點點來提升。

#### Code Review 

- 節省變數：如果 value 沒有很長可以節約使用
- 也可以用 fill 實作
```javascript 
result.push('*'.repeat(i))
Array.fill()
```

- 原本的解法是 if else, 一行解參考：善用三元
```javascript
return result += (大小寫判斷) ? .toUpperCase : .toLowerCase; 
```

- 可以拿第二週的 factor 作為額外的 funtion 提供 prime list
```javascript
function isPrime(n){
    if(n === 1) return true
    const factor = returnFactor(n)
    return factor.length === 2
}
```
v.s.
```javascript
function isPrime(n) {
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return n !== 1; 
}
```

- 可以拿上週的 reverse function 來用
```javascript
return str === reverse(str)
```
v.s.
```javascript
return str === str.split('').reverse().join('');
```
- 大數倒轉

嗚喔倒轉處理變得好簡潔 QQQQ
```javascript
const arrA=a.split('').reverse()
const arrB=b.split('').reverse()
const ans = ['']
const length = Math.max(arrA.length,arrB.length)

let carry = 0
for (let = 0; i< length; i += 1 ){
    ans[i] = Number(arrA[i] || 0) + Number(arrB[i] || 0)+carry
    carry = 0
    if(ams[i] >= 10){
        carry = 1;
        ans[i] -= 10;
    }
 }

if(carry){
    ans.push(1);
}

 return ans.reverse().join('')
```


**Referemce**

[[MTR] W3 HW Review](https://ishin4554.github.io/mtr-w2-009/)

[[MTR] Jekyll/ JS 基礎/ 演算法](https://ishin4554.github.io/2019/04/18/mtr-w1-004.html)

#### 挑戰題：大數乘法
這一題是第一次有在估時間的感覺，當時寫完大數加法之後馬上看大數乘法的題目，在紙上試做了一下之後，就確定應該是自己能夠解決的問題，而除法當時還沒細看。

後來實作大數乘法的時候，估了大概 3 小時左右的時間，拆解問題的方向跟大數加法一樣：
1. 先讓兩行 a, b string 當 array 乘開
2. 讓乘開後的每個 array 透過補零變得一樣長
    1. 後方補零
    2. 前方補零，因為乘法的 array 會因為位數而往前挪，所以前後都要補
3. 將每一個 Array 加總起來
4. 處理進位問題 
    1. 以 10 為單位把餘數留在原位數
    2. 原數除以 10 無條件捨去小數點留到下一位
    3. 超過就停止，回傳

裡面這次有試著用 forEach 簡化一小部分，但是大部分還是用 for loop 實作。其實一直有個直覺，3, 4 步應該要可以用 `.reduce()` 才對，但沒有實踐成功。

完成乘法之後用紙筆做了一下除法，發現有一點點預測的成分在，完全沒有思路，查了一些資料覺得是跟 BFS 一樣高等級的題目，決定放在 BFS 之後。

### Week4
這週開始有網站的感覺了，了解網際網路怎麼運作外，用 Request 來跟別人的 API 要資料


在寫 hw4 的時候，一開始其實沒有想什麼：
1. 但剛好呼叫 api 的規模是逐步增加的，所以沒有刻意回去重構，在 hw4 就嘗試好好的寫漂亮一點的程式碼：至少不要 if 那麼多個，可以用 `switch`，多注意一些 error 顯示的內容。
2. 原本寫了一版 error 顯示結果實測失敗，推估是回傳的內容判斷方向不對。
3. 後來 `console.log` 出來發現都是 `null` 就作罷。

另外一個寫文件的作業寫得很過癮：文件參考 slate 等等一些 api 樣板跟大的有名的 api 像是： twitter, google 等等的寫法，認真的寫了一版文件，覺得對文件的接受度大增。

**Reference**

[[MTR] HTTP/ TCP/ IP/ API](https://ishin4554.github.io/mtr-w3-010/)

#### 挑戰題：Call Back 
題目是要輸出前 200 個熱門實況，一開始有幾個疑惑：
1. 弄清楚需求很重要：實況指得是 clips 還是 videos？，一開始就是錯把 clips 當成直播，寫完才發現還有 get top videos 的 api，該不會寫錯了吧？查了才發現真的寫錯了。

2. Call Back Problem: maximum 是 100 個但要回傳 200 個：發現 for loop 存在外面的變數的話，值會來不及回來。發現可能是 call back 問題，所以查了一下、了解是什麼之後，用了一個醜醜的方式在 function 裡面再呼叫一次。

### Week5
第五週複習週，整理上四週比較不熟悉的部分，重整與審視自己的學習規劃，然後參與活動。

#### HTTPGames
真的很喜歡這種關卡系的設計，太好玩了，甚至應該說這種 RPG 關卡很剋我啊 XDDD 通宵肝玩了十關，但因為是一種破遊戲的心情，code 寫超醜的啦 XDDD 可是很盡興，跟以前打遊戲熬夜破卡的心情一模一樣，超級停不下來。

- 一開始有一點卡關，因為有一些題目第一次閱讀上語意會不清楚：例如：第二關要找書，一開始想說是用肉眼確認嗎？所以就先用肉眼解進入下一關（後來才發現應該要用程式找比較合理），例如：base 64 範例跟實際轉換結果不同，有一度還以為是不是我的寫法錯了，卡關了一陣子，還好只是 form 忘記改成 headers

> 但我想說的是，其實沒關係啦，遊戲就是要這樣才好玩啊！寫得太清楚就無趣了！

- 有一些議題解決得很過癮，算是計劃中第一次在沒有課程輔助的情況下解決問題：像是中文解碼問題跟 base 64，由於不是在瀏覽器上，所以是用 Buffer 來轉換，中文解碼則看別人怎麼做換算實際寫一次。

- 中間如果可以弄懂 Callback 更好的寫法就好了：常常開了變數可是 request 的東西還沒回來QQ 後面幾關的 callback 寫得超醜。有一點不滿意，但 promise 等等感覺是很高階的東西，好像不應該在這階段處理。

- 好不容易最後一題的時候，居然要寫排列演算法:就好像以為苦盡甘來就要最後一關，結果最後一關是你最不擅長被剋的關卡。但解完滿痛快的，本來以為自己會不會只要是這種嚴謹的算法題目都會做不出來，幸好還解得出來 QQ 

之後再找一個週末解開 true end 把第十關之後解一解。

除了 HTTPGames 之外複習週主要像是總確認，確定一些學習基底的部分有沒有歪掉。

#### LidemyOJ 

OJ 的特色是不會回傳結果參考，所以要自行想 test case 來測試，有時候有部分分數沒有的時候最艱難，要想像自己的可能錯了什麼，尋找 edge case 有時候比改 code 還難。也有發生自己的 test 沒過但是 OJ 過了的狀況 XD 

### 學習相關
**目標**

聽完分享後覺得了解自己的核心目標很重要，這樣在規劃進度也比較了解該朝什麼方向努力，在確認了一次自己的目標在「實踐想法的開發能力」，類似 AI Pattern 前輩那樣的工作環境就很理想。總之就繼續維持現在的步調，希望可以跟上一期的前輩們一樣厲害，可以四個月開始 try & error ! 

**學習**

自評一些問題，這兩週的態度是「很多的好奇心，但沒有耐心」，大抵上有問題就會想要知道一下怎麼做，瘋狂的讀資料看資料滿開心的。

但是要是超過一定複雜度就會棄坑，像是：浮點數當時就查到了 IEEE754 約略知道邏輯，知道是把指數、正負數拆開後組成的 64 位元數，但沒有耐心看完怎麼運算，yarn 跟 npm 的比較也看到了 yarn 在 package-lock.json 修正了版本的問題，但沒有深入去瞭解 yarn 怎麼做到這件事。

說真的會擔心自己這樣是不是不對？要是作為工程師是不是應該要追根究柢，像是 BFS 其實是資工大一的題目，自己解不出來真的沒問題嗎？也會更根本的擔心，也許這樣的學習態度不大理想，稍稍的感到焦慮。

但去完實體聚會聽完分享，有比較掌握到工程師工作的多樣性，想著也許自己可以多花時間在專案上，看看是不是更有耐心、或做得更好，來比較是對於特定議題的喜好還是態度問題。

**時間**

時數的部分原本想要用 Timely 來計時，但因為要付費，最後只取 Timely 免費抓你電腦軟體使用紀錄的方式，每天結束前會 review 今天時間都做了什麼。

覺得 Timely 的優點有幾個：
1. 抓軟體時間最準，以前用過：時間塊、Toggl 覺得後記都會有點時差，而且看不到有時候工作到一半交叉使用 FB 這種的耍廢狀況，Timely 加上每天晚上的勾選可以精準的掌握時間使用狀況。
2. 選時間的介面體驗佳：Rescue Time 也是會抓時間的服務，但是不好審核，Timely 只要點起來就可以加總時數，這點滿方便的。

所以流程上就改為，晚上加總時數後登陸在 log.txt 搭配第二週用 Shell Script 練習寫的小工具，在 CLI 看工作時數:
```sh
➜  time ./reportTime.sh 190422
SUM   +++++++++++ 11:32

MTR   +++++++ 7:40
ISS   +++ 3:52
```

| WEEK     | ALL |  MTR  | 實際 
|:-------|:---------|:-----------|:------
| Week1 | 57:31 (8.1hr)| 37:54 (5.2hr) | W1C1 & W2HW
| Week2 | 55:56 (7.8hr) | 35:38 (5hr) | W1C2 & W2C1 & W3HW & W4HW

以目前時間使用狀況來說，接近承諾的 40 小時，但每天工作天工作時數希望再拉高 2 小時，維持工作日 10 小時的專注。

**文件**

- 筆記方面: 有嘗試過幾種資料整理的方式，一開始用 Git Book 到後來用 Jekyll 來放筆記比較快。
- Issue & PR: 稍微看了一些文章在講怎麼 Commit 跟發 PR 所以也盡量讓格式符合這些原則，例如：內容的更新、優化分清楚，或是 Commit Title 應該要是祈使句寫清楚這次做了什麼。
- 每日心得：直接用一份 markdown 統一紀錄。

**相關活動**

- 服科所資訊讀書會：大概了解到工程師會關注什麼議題，例如： yarn 跟 npm，從我的角度會覺得只要知道哪個我喜歡用、有沒有什麼負面效果就好，但純種工程師會深究底層的資料結構怎麼實踐才解決了原本 npm 版本混亂的問題。其他還有聽到的內容有：Chrome 渲染、Virtual Dom、Docker 部署、JS Stream 目前只能聽懂 3, 4 成。不過 Chrome 渲染還滿有幫助的，比較知道在寫效果的時候，哪些效果可以比較快出現在螢幕上。

- 第三期實體聚會：開啟了更多我對工程師的想像，我覺得這種多看看不同類型的前端工程師，對於自己釐清自己的定位很有幫助，希望可以找到靠近設計一點點的前端工程師。

- 前輩線上小聊： 開始 Code Review 這個想法是來自於第二期 A 學姊跟實體聚會的建議，所以要求自己至少把值得參考看完，了解其他解決方案。

**學習體驗**

最後想說的是，課程整體規劃真的很用心，小到 tag、作業與作業的關聯性跟順序安排，大到一個遊戲跟平台給大家練習，每一個細節都能感受到安排，是市面上我有用過的平台或課程們裡面最強的線上學習體驗。

---

### 概念筆記待辦

- 伺服器運作原理 e.g. 瀏覽器渲染
- 浮點數 IEEE 754 運算規則
- Git 真實運作邏輯
- 演算法實作 e.g. BFS, DFS, Sorting ... etc*
- ESLint Warning 原因
- Call Back & Promise 
- NPM vs Yarn package-lock.file 
- Test 規劃
- Regex
- Program & Process & Thread
- Big O 
- Basic Autorization
- Chinese Endcode & Decode 
- request 有時候 res, body, err 內容連動問題


### 題目實作待辦

- w2 超級挑戰題
- w3 超級挑戰題
- lidemy OJ 
- HTTPGames 11 