```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
# 輸出結果
1
3
5
2
4

# 流程

## global EC 編譯
- 建立 global lexical environment 
- 建立 global execution context (EC)
- 設定 lexicalEnvironment, variableEnvironment
- 放入 Call Stack 

```javascript
golabalEC = {
  lexicalEnvironment: {
    environmentRecord: {
      ...(預設的基礎屬性)
    },
    outer: null,
  },
  variableEnvironment: {
    outer: null,
  }
  this: undefined //非 strict 模式為 globalObject
}
```

## global EC 執行
- `console.log(1)` 放入 call stack  
- 執行 `console.log(1)` log `1` pop 掉 `console.log(1)`
- `setTimeout(() => {
  console.log(2)
}, 0)` 放入 call stack 
- 執行 `setTimeout` 將編譯匿名函數交由 webAPI 計時 0 ms（web 以外環境不一定支援）

## 匿名函數 EC 編譯
- 建立匿名函數 lexical environment 
- 建立匿名函數 execution context (EC) 
- 設定匿名函數 lexicalEnvironment, variableEnvironment
- 放入 callback queue

```javascript
anonymousEC = {
  lexicalEnvironment: {
    environmentRecord: {
    },
    outer: null,
  },
  variableEnvironment: {
    environmentRecord: {
    },
    outer: null,
  }
  this: undefined //非 strict 模式為 globalObject
}
```

## 回到 global EC 
- `console.log(3)` 放入 call stack  
- 執行 `console.log(3)` log `3` pop 掉 `console.log(3)`
- `setTimeout(() => {
  console.log(4)
}, 0)` 放入 call stack 
- 執行 `setTimeout` 將 `setTimeout` 交由 webAPI 計時 0 ms（web 以外環境不一定支援）

## 匿名函數 EC 編譯
同上

## 回到 global EC 
- `console.log(5)` 放入 call stack  
- 執行 `console.log(5)` log `5` pop 掉 `console.log(5)`
- event loop 檢查 call stack 沒有其他內容
- event loop 執行 callback queue 內容（先進先出）
- 執行 `console.log(2)` log `2` pop 掉 `console.log(2)`
- 執行 `console.log(4)` log `4` pop 掉 `console.log(4)`
- 結束 global 執行， pop 掉

