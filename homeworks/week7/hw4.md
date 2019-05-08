## 什麼是 DOM？
DOM 是針對像是 HTML 這種類型的文件提供的一種模型，他的模式是跟著 tag 的層級以樹的方式來結構化物件，我們可以透過 DOM 提供的 API 來一層層爬梳、操作這些物件。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
當你今天點擊一個物件的時候，事件的傳遞順序是跟著 tree 的結構從最上層的根部一路往下找找找找到你點擊的那個物件，在一路沿著原本的路徑回傳回來。
往下找的過程就叫做捕獲（Capture)，你點的物件叫做目標（Target)，最後回傳回來的過程叫做冒泡 (Bubbling)。

## 什麼是 event delegation，為什麼我們需要它？
Event Delegation 是指我們把感應事件的工作交給別的節點，怎麼做呢？我們可以透過上面的事件傳遞機制來做，有時候我們有大量的物件需要感應事件，如果每一個都要幫他加上 Listener 很浪費資源，更好的作法是我們在點到這些物件的路徑上放上 Listener 就可以了。舉例來說：一個 `<ul>` 元素下如果每一個 `<li>` 都要感應事件，我們可以在 `<ul>` 上放 Listener，這樣當我們點擊 `<li>` 的時候因為 Capturing 跟 Bubbling 階段會經過 `<ul>` 觸發的訊號就可以被帶回去。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
event.preventDefault() 指得是阻止物件的預設行為，event.stopPropagation() 則是阻止捕獲冒泡的傳遞。前者是一但他被觸發了，就會發動的功能，像是：`<button>` 的 submit 跟 `<a>` 的連去連結，而後者則是阻止雷同於上面第三題簡答題的過程，像是：原本被 `<ul>` 包住的 `<li>` 理應點擊 `<li>` 的話也會觸發 `<ul>` 的 Event Listener 但透過 stopPropagation() 就可以停止這種傳遞。所以我們可以理解成，其實這兩件事是平行關系，就算我們 preventDefault() 也不會停止傳遞。