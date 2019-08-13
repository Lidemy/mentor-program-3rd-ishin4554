```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
# 輸出結果
i: 1
i: 2
i: 3
i: 4
i: 5
5
5
5
5
5

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
    globalObject: {
      i: undefined
    }
    outer: null,
  }
  this: undefined //非 strict 模式為 globalObject
}
```
## global EC 執行
- i 賦值 1
```javascript
    globalObject: {
      i: 1
    }
```
- 遇到 for loop 判斷 {} 建立新的 lexical environment 
```javascript
lexicalEnvironment: {
    environmentRecord: {
      ...(預設的基礎屬性)
    },
    outer: golabalEC.lexicalEnvironment,
  },
```
- 由於 i 小於 5 `console.log('i: ' + i)` 放入 call stack
- 執行 `console.log('i: ' + i)` log `i: 1` pop 掉 `console.log('i: ' + i)`
- `setTimeout(() => {
    console.log(i)
  }, i * 1000)` 放入 call stack 
- 執行 `setTimeout` 將編譯匿名函數交由 webAPI 計時 0 ms（web 以外環境不一定支援） 後編譯放入 callback queue 
- i + 1
```javascript
    globalObject: {
      i: 2
    }
```

## loop 同上，直到 i 大於 5 
- event loop 檢查 call stack 沒有其他內容
- event loop 執行 callback queue 內容（先進先出）
- 執行 `console.log(i)` log `5` pop 掉 `console.log(i)` 五次
- 結束 global 執行， pop 掉
