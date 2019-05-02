## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- `<svg>`: 用來畫 svg 元素的 tag，裡面可以包住系列的繪圖元素像是: `<path>`,`<circle>` 等等，有別於 canvas svg 的元素可以是一個個 node 被操作，有一些常見的 atrribute，像是:`width`,`height` 還有像是調整位置的 `viewBox` 等可以使用。
- `<canvas>`: javascript 用來繪製元素的畫布 node，可以透過 javascript 在裡面繪製各種圖形，但有別於 svg canvas 算是一個獨立的 node，沒辦法一個個被操作。
- `<video>`: 用來放影片的 tag，其實嚴格來說並不是 html 在播影片，他只是透過這個 tag 去觸發 java 跟 css 來協助播放影片的 semantic tag。

## 請問什麼是盒模型（box modal）
是 html 元素的空間定位模型，會把每一個元素分成這幾塊：
1. content: 內容的大小，分為 width, height 作為長寬 
2. padding: 內容到邊框的距離
3. border: 邊框
4. margin: 邊框之外到其他元素的距離

其中，border 的寬度原本是會影響到外面的空間位置，但透過 box-sizing 可以讓 border 算進 padding 空間裡面，就不會影響到外面的排版。 

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- inline: 所有東西算在同一行，但沒辦法調整寬度。
- block: 所有東西算撐滿一層，但無論寬度怎麼變都都會佔滿一層。
- inline-block: 一塊一塊疊在同一行，但又可以調整寬度。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static: 不調整，會根據原本的元素特質自動排版下來。
- relative: 可以依照上一個相鄰元素的位置來定位。
- absolute: 可以依照可以回溯的上一個 relative 來定位，但不會影響到其他元素定位流。
- fixed: 固定在畫面上的特定位置，不會因為滾動而影響位置。