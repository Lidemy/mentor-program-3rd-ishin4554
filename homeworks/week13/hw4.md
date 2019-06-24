## Bootstrap 是什麼？
Bootstrap 是一個 library 它整合了網站的 UI 元件，像是：Navbar, List 等等的 css, js 讓我們可以透過只在 HTML 加減 CSS class 操作就能有高度視覺與體驗完整性的前端，是因應現代對於 UX, UI 的要求提高而有的集成 library，幫助工程師減少開發上調整 UX, UI 細節所需的時間。

## 請簡介網格系統以及與 RWD 的關係
網格系統是在設計平面上常用的一個版面規劃系統，後來隨著數位平台發展，也沿用到手機跟網站頁面上，以網站來說，通常是將桌面網頁切分成 12 個 column 然後讓元件貼著這 12 個網格去排版，其中，網格分為三個元素：分別是旁邊留白的 margin, 一條條 column 以及 column 之間的留白 gutter。透過調整這三個數字就可以去調整排版的疏密、來減少開發上排版的負擔、也方便在不同載體上進行縮放。
而這套系統之所以可以方便在不同載體上進行縮放，我們可以依據載體的寬度去取 12 的因數進行排版，例如：手機就可以改為 2 col 等等的方式，讓元件可以自動去調整版面。

後來因應網格系統的流行，css 也有了 grid 的支援，但切分的方式並非 margin, column, gutter，而是直接畫格子的感覺，先對 grid container 設定每一個 column 與 row 的寬度，接著再把內容的對角對應到線的交叉點，就是該內容在的位置。


## 請找出任何一個與 Bootstrap 類似的 library
Bulma 是一個相比 Bootstrap 更輕量化的一個 Library 而且比 Bootstrap 更容易上手，使用方法基本類似，如果想要快速使用不需要改太多的內容 Bulma 是很好的選擇，但是如果需要微調或是更多元件來使用，擁有比較成熟社群的 Bootstrap 可能會更好、而且也會有更多擴充的選擇。

## jQuery 是什麼？
jQuery 是一個打包我們開發前端的時候會有很多常用的功能的瑞士刀型 library，舉例來說：我們可能常常要 document.querySelector 特定 element，jQuery 就幫我們用一個 $('') 打包起來，除此之外，在過去還有很多瀏覽器不支援新語法的時代，jQuery 也幫我們做了轉換。但由於隨著 ECMAScript 的演進有越來越多語法糖、加上瀏覽器的支援也越來越多、以及隨著網站複雜性越高需要更快的 loading 速度，讓 jQuery 有一點退燒的趨勢。 

## jQuery 與 vanilla JS 的關係是什麼？
vanilla JS 就是原生 javascript 語法，而 jQuery 就是基於原生 javascript 語法所建立的一套 library。但無論如何我們都會用到原生語法在開發網站上，jQuery 只是輔助一些功能上我們可以不用寫的那麼冗長，讓程式碼更簡潔的一套工具包，底層他會用 js 產生 jQuery 物件讓我們用 jQuery 提供的 method 來進行操作，但與 jQuery 物件無關的部分還是用原生 js 去撰寫。