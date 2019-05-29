# 六到十週心得與解題心得

# 學習內容
## Week 6
切版，就是一個熟能生巧過程，過程中我習慣開著 `border` 調整位置後，再來微調一些 style， medium 作業真的是磨死我了 XDDD 就連挑戰題的 hackernews 都沒那麼爆炸。我只記得那幾天我真的通宵在切版，超怕自己明天再回來切就忘記昨天在哪裡了 XDDD 這週也遇到了 chrome bug 也是一個很新奇的體驗。

- 學習筆記
  - [CSS Position 從 Box model 到 Flex box](https://ishin4554.github.io/2019/05/01/develope/css_position/)
  - [SEO 入門](https://ishin4554.github.io/2019/05/01/develope/intro-seo/)
  - [HTML 基礎](https://ishin4554.github.io/2019/05/20/develope/html_basic/)
  - [Browser 渲染原理](https://ishin4554.github.io/2019/05/28/develope/intro-browser/)

## Week 7 

第七週開始所有事情都變得好玩許多，我可以操作畫面上的元素、可以做一些小遊戲、甚至完整重現一個應用的前台，尤其 google 表單如果要寫真的也是喪心病狂：「判斷一次？ nonono~ 這樣太可惜了，當然要每一次離開都要判斷！」當時完成的時候心想：「尼瑪，只是多這個一個小功能也那麼複雜嗎？」

過程中我最最最最最感謝老師的一段架構：「介面、事件與資料」，這真的是打爆工具人的任督二脈，過去碰到什麼問題就抓一個 method 來套，見樹不見林，從這三個角度來看，無論切功能還是學新的內建方法，都有一個脈絡可循。

第六週第七週其實是我最熟悉的兩個單元，因為以前常常要切版跟做出 prototype 來 demo ，所以也額外挑戰了很多細節來挑戰自己。

其實反而第一週到第四週是我最不熟的階段，不會 javascript 原生語法只會 jQuery 的狀態，要不是老師在報名時的 codewar 作業跟課程開始前瘋狂寫題目。從這個角度來看這個安排真的很棒，無論是白紙、還是有偏差（？）的人其實在初期都有切入點跟養成期。

- 學習筆記
  - [js 基礎 - try and catch & hoisting](https://ishin4554.github.io/2019/05/06/develope/js_basics/#try-amp-catch)
  - [Javascript DOM 處理](https://ishin4554.github.io/2019/05/03/develope/js_DOM/)

- 作業心得
  - week7/hw1/README.md
  - week7/hw2/README.md
  - week7/hw3/README.md

## Week 8

第八週不但好玩而且有成就感，因為很多有名的應用就是從可以抓資料開始，要是抓得多一點選得好一點，也許你就是下一個 trivago 也不一定啊 XDDD 所以 twitch api 作業完成的時候真是：「呼～暢快淋漓。」

而這兩週也收穫了很多老師在程式碼架構上給的建議，讓我意識到自己好像太沈浸在新功能裡面，應該要更專注優化程式碼的架構，所以決定了一定要好好重構程式碼，中間也參加了第二次的實體聚會，當時也有得到一些建議。

不過「像是閱讀文章」一樣的感覺，看老師 live code 真的就是：「嗚喔，猛爆了，這就是文章的感覺吧！」，例如：同樣是計算機，為什麼就會想用 append 不是刷新？諸如此類的細節，要我自己寫還真的沒有什麼思路。

後來期間一直都有在嘗試重構這件事情，但不是很順利，直到有一週的讀書會，同學分享了他讀了 javascript design pattern 實踐的書，我才想到：「看書！大大同學說過，就算寫程式也要多看書！」於是就找了一些 `clean code` 相關的書來看，說真的也是看不大懂，但在表徵上的理解比較了解重構的方向。

重構一開始也不是很好玩，要看懂自己以前在寫什麼而且重寫一次不免無聊，不過慢慢的看到自己雕琢出更好的程式碼，到超級挑戰題可以比較無痛的加入原本的專案，領略了「文章感」的風采，難怪書裡面提到：

> 重構是在思考明天可以為你做什麼。

- 學習筆記
  - [測試驅動開發](https://ishin4554.github.io/2019/05/28/develope/intro-test/)
  - [Refactoring 的壞味道](https://ishin4554.github.io/2019/05/22/develope/intro-refactoring/)
  - [Callback Hell： 論 Promise/Fetch/Async 與 Await](https://ishin4554.github.io/2019/05/28/develope/js_promise/)
  - [canvas 入門](https://ishin4554.github.io/2019/05/28/develope/js_canvas_basic/)

- 作業心得
  - week8/hw1/README.md
  - week8/hw2/README.md
  - week8/hw3/README.md

## Week 9

第九、十一、十二週真可以說是魔鬼賽程，其實拆成三週已經很友善了，但大概前幾週真的太快樂，一個落差學習動力也比較下降，整整一週才完成第九週作業，不過真的完成的時候，也是覺得：「wow 我跨出自己的舒適圈了。」php, sql 後端的操作環境，與前端非常不同，在適應上花了整整一週的時間。

而這週也正是學到只可意會不可言傳的 OOP。我敢打賭，要沒有特地重構我不可能只靠看的就知道 OOP 怎麼用 XDDD，突然發現寫程式就是這樣，有很多很玄，很前衛的想法，只可意會不能言傳只有更多的實踐，才能了解他的真諦。這種刻意練習的過程學到非常多，推薦大家都試試看。

- 學習筆記
  - [php 基礎](https://ishin4554.github.io/2019/05/14/develope/php_basic/)
  - [物件導向程式入門](https://ishin4554.github.io/2019/05/15/develope/intro-OOP/)
  - [資料庫基礎](https://ishin4554.github.io/2019/05/15/develope/intro-database/)

# Side Project 

再講 side project 之前，先講為什麼是 side project 不是超級挑戰題 ? 

有一些超級挑戰題是額外延伸的內容，這種挑戰我覺得對於作業的一體性很可惜，但進階題或部分的挑戰題基本上是延伸原本的作業加新功能的我就覺得很讚，這樣也可以把作業去擴充成比較完整的作品，所以最後再給自己的死線之前，選擇的是寫 side project，跟完成 twitch 的超級挑戰題。

而會有這段，就是想要一直創造東西！初衷既然如此，那也計畫自己過程中開發一個自己會去用的東西XD 所以就拿上一次複習時寫的 shell script 時間紀錄程式再進化，讓他變成線上版的工具好了！

> Mind and Hand 

其實兩次複習這三週間，滿踏實的感受到自己的進步，也越來越靠近自己的哲學觀，上一次沒有比較對象，現在開始有網站了，可以跟自己以前在計畫開始前湊數寫的網站跟後來再寫一次的比較、也可以自己拿上一次複習開發的小東西來修改調整。

同時很多概念，Hoisting, Bubbling 等等一度我也覺得：「有需要了解那麼多嗎？」但自己在課外實作的時候、讀書會的時候看大大們會討論到，又會覺得還好有學，真的學習永遠都不嫌多啊，只怕時間不夠跟自欺欺人。

補充：以前在 twitch api key 上沒有遇到 api key 上傳的問題，這一次把 google api key 上傳直接收到 email 的警告，於是趕緊撤除 api key 跟試著處理 commit 問題。

**補充**

- 學習筆記
  - [D3 入門](https://ishin4554.github.io/2019/04/03/develope/js_d3_basic/)

- 開發心得
  - week10/SideProject/README.md

# 總回顧

學習投入上，從計畫到打這篇心得的現在已經過了 43 天，平均每天 5.63 小時的投入，總時數 242 小時，平均每週 39.4 小時，跟當初承諾的 40 小時已經相當接近，但每天專注時數平均還是在 8.12 小時不甚滿意，有一陣子不夠努力也是真的，而在待辦的程式議題上還有 22 個 todo 要研究，寫了幾個字我真的算不出來了......

![](img/2019-05-29-21-40-59.png)
*用自己的工具好開心啊！*

學習工具上也跟當初約略的不同，在使用 markdown 上也是究進了：
- 從 [Jekyll 跳槽到 Hexo](https://ishin4554.github.io/) 
- 善用 vscode extension todo highlight 在 code 跟 markdown 間做任務管理。

學習社群與互動上這次比較多問題，發現有 mentor 差很多，每次私訊問問題都會超認真解答、作業重寫還會超認真改的老師，這種即時 feedback 真的很有幫助，而且最印象深刻的還是 chrome bug 的時候，老師還分享為什麼判斷為 chrome bug 會怎麼查，覺得真是值了，這就是思路 R。

除此之外也有可以私訊討論心得的學長姐，給了很多修課上的建議，聚會上分享與聚會後餐會也真是開拓了我工作的眼界。另外參加的讀書會也從非常聽不懂，到略聽得懂但想不透，抱著沒吃過豬肉也要看過豬跑的心情還是汲汲營營的待在會上。

不過比較憂傷的是，第八還是第九週有一陣子比較認真的寫心得才發現，其實認真寫每日心得 -3, 1 範圍內好像大部分的同學也看不到 QQ 直接在群組裡面留言真的太害羞了，但透過留言板這種低調的互動還是滿喜歡的，要是能 @ 同學然後靜靜的討論彼此討論的內容就好了。

總之還是老師的老話一句：

> 解掉一個 bug，日後你解不開的 bug 就少了一個。

# 歡迎來到綜合能力測驗 攻略

小心下面有劇透：

1. GET METHOD : ?mode=start&norestriction="LIMIT%203"
2. 在 elements 裡取消 html class
3. 把 button 的 display 改為 none 之外的選項
4. 按按鈕會得到數字提示，但需要設置 `myMissingNumberToSetToMakeTheRequest`，在 console 裡進行隨便輸入一個值測試（number type 才會有反應）
5. 更新：在按下按鈕後會得一條提示，一開始就覺得既然是亂碼那必須可以解密，於是上網找雜湊或是 base64 的解碼器丟，結果都沒有結果，最後直接拿亂碼喂 google 才出現數字，不過在交完作業後看了下一章發現雜湊不能解密，所以修改一下攻略，當初找到的應該是人家對應表解出來的結果。
6. fm3nT0rPr0GRAm666