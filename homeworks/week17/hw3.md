```javascript
var a = 1
function fn(){
  console.log(a) 
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

# 輸出結果
undefined
5
6
20
1
10
100

# 流程

## Global 編譯
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
    environmentRecord: {
      globalObject: {
        fn: <pointer of fn>,
        a: undefined,
      },
      outer: null,
    }
  }
  this: undefined //非 strict 模式為 globalObject
}
```

## Global EC 執行

- a 賦值 1 
```javascript
      globalObject: {
        fn: <pointer of fn>,
        a: 1,
      },
```

## fn EC 編譯

- 建立 fn lexical environment 
- 建立 fn execution context (EC) 
- 設定 fn lexicalEnvironment, variableEnvironment
- 放入 call stack

```javascript
fnEC = {
  lexicalEnvironment: {
    outer: <globalObject>
  },
  variableEnvironment: {
    environmentRecord: {
      variableObject: {
        fn2: <pointer of fn2>,
        a: undefined,
      },
      outer: <globalObject>
    }
  }
  this: undefined //非 strict 模式為 globalObject
}
```

## fn EC 執行 
- `console.log(a)` 放入 call stack  
- 執行 `console.log(a)` log `undefined` pop 掉 `console.log(a)`
- a 賦值 5 

```javascript
      variableObject: {
        fn2: <pointer of fn2>,
        a: 5,
      },
```
- `console.log(a)` 放入 call stack  
- 執行 `console.log(a)` log `5` pop 掉 `console.log(a)`
- a + 1
```javascript
      variableObject: {
        fn2: <pointer of fn2>,
        a: 10,
      },
```

## fn2 編譯

- 建立 fn2 lexical environment 
- 建立 fn2 execution context (EC) 
- 設定 fn2 lexicalEnvironment, variableEnvironment
- 放入 call stack

```javascript
fn2EC = {
  lexicalEnvironment: {
    outer: <fnObject>
  },
  this: undefined //非 strict 模式為 globalObject
}
```

## fn2 執行
- `console.log(a)` 放入 call stack  
- 執行 `console.log(a)` fn2 沒有 a 的內容，往 outer object 尋找，log `6`，pop 掉 `console.log(a)`
- 由於 fn2 沒有變數 a 往 outer object 找，fn `a = 20`
- 賦值 `b = 100`，outer object 都沒有 b 
- 建立新變數 b 在 global globalObject 並賦值 100

```javascript
      globalObject: {
        fn: <pointer of fn>,
        a: 1,
        b: 100,
      },
```

- 結束 fn2 執行，pop 掉
- 結束 fn 執行， pop 掉

## 回到 global EC 
- `console.log(a)` 放入 call stack 
- 執行 `console.log(a)` log `1` pop 掉 `console.log(a)`
- a 賦值 10 
```javascript
      globalObject: {
        fn: <pointer of fn>,
        a: 10,
      },
```
- `console.log(a)` 放入 call stack 
- 執行 `console.log(a)` log `10` pop 掉 `console.log(a)`
- `console.log(b)` 放入 call stack 
- 執行 `console.log(a)` log `100` pop 掉 `console.log(b)`
- 結束 global 執行， pop 掉


