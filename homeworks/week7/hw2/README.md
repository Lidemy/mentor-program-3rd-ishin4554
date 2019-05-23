# 需求邏輯

基本上要仿作 google 表單一次。

## 核心邏輯
1. 每一欄位填寫後會判斷一次是否符合表單邏輯
2. 提交前會在判斷一次

## 其他部分
- 根據判斷的結果會變色顯示問題
- 在 console 顯示判斷的結果

# 第一版回顧
注意：第一版心得是在四周後以回憶的方式撰寫，盡可能還原但可能會與現實有一點點差別。

根據核心首先規劃核心功能的撰寫：
1. 表單的觸發：兩個時機點會觸發，仔細觀察後是「換一個欄位」的時候會觸發與送出前會再檢查一次。
2. 表單的判斷：判斷有沒有填寫、判斷是不是 email、判斷有沒有選取。

當初想是這樣想，但第一次寫基本上都是以生產線的方式按照操作流程寫下去，所以先切版，切版的時候就面臨了一個問題：**這麼多類似的欄位，有沒有可能用 bubbling 的方式來觸發？** 但後來發現 bubbling 的範圍一大，誤觸範圍也多，所以還是用 `forEach` 來給所有 input `addEventListener`。

## 觸發
第一種觸發是 focusout，但第二次觸發可以怎麼做？原則上當然希望只要在觸發一次這些 eventListener 就好，所以以 `event trigger by js` 去 google 得到可以利用 `dispatchEvent(event)` 的方式來觸發。

## 判斷
- email: 會判斷是不是符不符合 email 的格式，所以這邊以 `String.match()` 比對 return 的結果是不是 `null`，為了使用 match 複習了 [regex 的判斷式](筆記連結)，利用了狀態機的理解想像 regex 的判斷過程：
  1. 看看第一個字是不是 /w（任意字元）
  2. 因為有 + 所以 /w 要至少出現一次且表連續，直到別的字元，所以接下來幾個判斷是不是 /w
  3. 到某 n 個字是 @: 不是 /w 進到第二個判斷 @ 發現是 @
  4. 進到下一個字元又不是 @ 進到第三個判斷 /w 同 1, 2 步邏輯 
  ... 總之用 [黃色小鴨法](https://zh.wikipedia.org/zh-tw/%E5%B0%8F%E9%BB%84%E9%B8%AD%E8%B0%83%E8%AF%95%E6%B3%95) 了解了 regex
- 一般 text: 只要取 value 判斷是不是空值即可，這邊複習了 attribute 的 selector : `querySelector('[attr="value"]')`
- 選取: radio 因為要比對「所有選項中是不是都是空值」所以要用一個 forEach 來跑過所有 node 進行判斷

## console
- console 顯示結果：這邊為了預防預判結果不符預期就送出，利用 `e.preventDefault` 取消 `submit` 的 default 送出設定

# 第二版重構
注意：本版以 clean code 為目標進行重構

重構的時候對於不同的 input type 就要一套 eventListener 感到不方便，所以希望再嘗試一次**這麼多類似的欄位，有沒有可能用 bubbling 的方式來觸發？** 來重構，如果以這個方向去嘗試至少可以做到下面的架構：

1. 判斷
當時 bubbling 失敗的原因忘記了，但這次利用 bubbling 對 e.target 來判斷得到的 input type 進行 toggle text 發現是可行的，所以把原本要針對三種 input type 做 addEventListener 簡化成，一個 eventListener 再進行 input type 判斷。

2. 提示顯示: toggleText(), toggleEmail(), toggleRadio()
接著針對不同的判斷進行 toggle 內容，toggle 的過程也會判對 input 是不是需要 toggle，赫然發現原來 condition 也可以當成參數傳遞啊（？）大夢初醒般，把三坨判斷再簡化，將文字類的統一，radio 由於涉及 html 結構上的不同。最後又在回頭審視了 html 是不是真的要保持原本的結構，發現不必然，就把所以的問題結構統一，一個 toggle function 解決三個狀況。

3. final check
由於判斷的方式變成用一個 addEventListener 所以沒辦法使用原本的 dispatch，因為不再是呼喚所有的 listener，所以這邊改成 selectorAll(input) 將 node array forEach 給 checkNode 在進行一次判斷。而同時也修正了上次 object 用單獨賦值的方式，而是利用 object 另外一個語法 obj['key'] 的方式，把所有項目變成一個陣列來處理物件。

# 第三版 OOP 重構
注意：本版以物件導向為目標進行重構

# Code Review 